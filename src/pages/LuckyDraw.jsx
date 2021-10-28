import React,{useState,useEffect} from 'react';
import Countdown from 'react-countdown';
import {ReactComponent as More} from '../assets/images/More.svg';
import { Row, Col,Modal } from 'antd';
import { useLKaction } from '../hook/hookLK';
import { useLKnftAction } from '../hook/hookLKNFT';
import { useERC20Action } from '../hook/hookErc20';
import {ModalBuyTicket} from '../components/Component';
import { convertBigNumBer, getBalance } from '../components/api/Api';
import useWallet from 'use-wallet';
import Background from '../assets/images/Background'



const Luckydraw = () => {
    const [visible,setVisible] = useState(false);
    const [showResult,setShowResult] = useState(false);
    const [wave,setWave] = useState(null);
    const [price,setPrice] = useState(null);
    const [input,setInput] = useState(null);
    const [isApprove,setIsApprove] = useState(false);
    const [reward,setReward] = useState(null);
    const [balance,setBalance] = useState(null);
    const [totalPlayer,setTotalPlayer] = useState(null);
    const [totalTicket,setTotalTicket] = useState(null);
    const [finalResult,setFinalResult] = useState(null);
    const [myTickets, setMyTickets] = useState([]);
    const [lastTime,setLastTime] = useState(null);
    const [requireTime,setRequireTime] = useState(null);
    const luckyDrawAction = useLKaction;
    const luckyNFTAction = useLKnftAction;
    const erc20Action = useERC20Action;
    const {balanceOf,approveLK,isApproveLK} = erc20Action();
    const {getPriceTicket,getTotalPlayers,getTotalTickets,buyTicket,getMyTicket,getLastTime,getRequireTime} = luckyDrawAction();
    const {getWave,getReward,getResult} = luckyNFTAction();
    const wallet = useWallet();

    const hideModal = () =>{
        setVisible(false);
    };

    const fetchNewUserTicket = () => {
        window.location.reload()
    };
    useEffect(()=>{
        getWave().then((res)=>{
                setWave(res.toString());
                if(wallet.account){
                    getMyTicket(res.toString()).then(res => {setMyTickets(res)} );
                }
                getResult(Number(res.toString())).then(res=> {setFinalResult(res[4].toString());console.log(res);});
            });
        getReward().then((res)=>{setReward((res.toString()/(10e17)).toFixed(0))});
        balanceOf(wallet.account).then((res)=>setBalance((res.toString()/(10e17)).toFixed(0)));
        getTotalPlayers().then(res=> {setTotalPlayer(res.toString())});
        getTotalTickets().then(res=> setTotalTicket(res.toString()));
        getPriceTicket().then((res)=> setPrice((res.toString()/(10e17)).toFixed(0)));
        getLastTime().then(res=>setLastTime(Number(res.toString()) *1000));
        getRequireTime().then(res=> setRequireTime(Number(res.toString()) * 6000000));
    },[wallet.account]);
    useEffect(()=>{
        isApproveLK().then((res)=> {setIsApprove(res)}).catch((e)=>console.log(e));
    },[isApprove,wallet.account]);
    const getMyTicketList = (myTickets) =>{
        const result = [];
        const list =  myTickets[0].flatMap((i,index)=>(i == wallet.account ? index : []));
        const first = myTickets[1].flatMap((i,index)=>{
            for(let j of list){
                if(j === index){
                    return i.toString();
                }
            }
            return [];
        })
        const last = myTickets[2].flatMap((i,index)=>{
            for(let j of list){
                if(j === index){
                    return i.toString();
                }
            }
            return [];
        })
        for(let i = 0 ; i < first.length ; i++){
            for(let j = Number(first[i]) ; j <= Number(last[i]); j++){
                result.push(j);
            }
        }
        return result;
    }
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
          setShowResult(true);
          return <span>00:00:00</span>;
        } else {
          // Render a countdown
           return <span>{hours.toString().padStart(2,'0')}:{minutes.toString().padStart(2,'0')}:{seconds.toString().padStart(2,'0')}</span>;
        }
      };

    const approveFC = () =>{
        approveLK().then(res=>{
            res.wait().then(setIsApprove);
        })
    }
    const buyTickets = (input) =>{
        buyTicket(input).then(res=> {
            console.log(res);
            res.wait().then(res=>{
                setVisible(false);
                getMyTicket(wave).then(res => {setMyTickets(res)});
                getTotalPlayers().then(res=> setTotalPlayer(res.length));
                getTotalTickets().then(res=> setTotalTicket(res.toString()));
                getReward().then((res)=>{setReward((res.toString()/(10e17)).toFixed(0))});
            })
           
        })
    }
    useEffect(() => {
        const container = document.querySelector(".banner-luckydraw");
        const header = document.querySelector(".top-header");
        container.style.height = `${window.innerHeight - 64}px`;
    }, []);
    return (
        <section className='wrap-page'>
                <Row gutter={16} className='banner-luckydraw'>
                    <Col xl={18} style={{paddingLeft:"0"}}>
                        <div className='waiting'>
                                <div className='waiting-header'>
                                    <div className='left'>
                                        <div className='txt wrap-wave mr-5'>Wave: <span >{wave !== null && wave.padStart(2,'0')}</span></div>
                                        <div className='txt wrap-time'>Time: {lastTime && requireTime && <Countdown renderer={renderer} 
                                            date={lastTime + requireTime}></Countdown>}
                                        </div>
                                    </div>
                                    <div className='right'>
                                        <div className='txt wrap-balance'>Balance: <span >{balance !== null && balance} BILLY</span></div>
                                    </div>
                                </div>
                              { !showResult && <div className='waiting-content'>
                                    <p className='reward-title'>REWARD OF LUCKY DRAW:</p>
                                    <p className='reward'>{reward !== null && reward} <small>BILLY</small></p>
                                    <p className='note'>Power up for chance to win in this electrifying <br /> instant game!</p>
                                    <button className='buy'>More information <More></More></button>
                                </div>}
                              { showResult && <div className='waiting-content result'>
                                    <p className='congratulation'>CONGRATULATION!!</p>
                                    <Background num1={Number(finalResult[0])} num2={Number(finalResult[1])} num3={Number(finalResult[2])} num4={Number(finalResult[3])}>
                                    </Background>
                                    <div className='id-ticket'>
                                        <div className='avt'>
                                        </div>
                                        <div className='id'>
                                            <p>BILLY DE NFT</p>
                                            <p className='txt'>ID ticket: <span>1269</span></p>
                                        </div>
                                    </div>
                                    <p>The WINNER of this wave</p>
                                </div>}
                        </div>
                    </Col >
                    <Col style={{paddingRight:"0"}} xl={6}  className='wrap-information'>
                        <Row gutter={16} className='information'>
                            <Col xl={12} style={{height:"28%"}}>
                                <div className='total-player'>
                                    <p className='txt'>Total player:</p>
                                    <span >{totalPlayer !== null && totalPlayer} <br /> Players</span>
                                </div>
                            </Col>
                            <Col xl={12} style={{height:"28%",paddingRight:"0"}}>
                                <div className='total-ticket'>
                                    <p className='txt'>Total ticket:</p>
                                    <span >{totalTicket !== null && totalTicket} <br /> Tickets</span>
                                </div>
                            </Col>
                            <Col xl={24} style={{height:"68%",paddingRight:"0", marginTop:"4%"}}>
                                <div className='my-ticket'>
                                    <div className='header'>
                                        <p className='txt'>My Tickets:</p>
                                        <span className='mt-0'>{myTickets.length ===0 ? "00" : myTickets.length.toString().padStart(2,"0")}</span>
                                    </div>
                                    <div className='content'>
                                        <div className='list-ticket'>
                                            <ul>
                                                {
                                                    myTickets.length !==0 && getMyTicketList(myTickets).map((i)=>{
                                                        return (
                                                            <li>
                                                                <div className='ball'>{i.toString().padStart(4,'0')[0]}</div>
                                                                <div className='ball'>{i.toString().padStart(4,'0')[1]}</div>
                                                                <div className='ball'>{i.toString().padStart(4,'0')[2]}</div>
                                                                <div className='ball'>{i.toString().padStart(4,'0')[3]}</div>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        <div className='buy-ticket'>
                                            <button onClick={()=> setVisible(true)}>Buy ticket</button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            <Modal
            title="Buy ticket"
            centered
            closable
            className='modal-lucky'
            visible={visible}
            onCancel={() => setVisible(false)}
            cancelButtonProps ={{ style:{ display: 'none' }} }
            okButtonProps ={{ style:{ display: 'none' }} }
            >
                <div className='input-number'>
                    <p>Number of tickets:</p>
                    <input onChange={(event)=> 
                      {  
                        if(event.target.value < 100000 ){
                            setInput(event.target.value)
                        }   
                    }
                    } value={input} type="text" />
                </div>
                <div className='detail-ticket'>
                    <p>Bill totals</p>
                    <div className='total'>
                        <p>Total ticket</p>
                        <span>{(input === null || input ==="" || isNaN(input)) ? 0 : input}</span>
                    </div>
                    <div className='price'>
                        <p>Prices <br /> <span>{input === null || input ==="" || isNaN(input) ? 0 : input} tickets x {price && price}$</span></p>
                        <span>{isNaN(input) ? 0 : input*price}$</span>
                    </div>
                    <hr />
                    <div className='total-price'>
                        <p>Total prices</p>
                        <span>{isNaN(input) ? 0 : input*price}$</span>
                    </div>
                    {isApprove && <button onClick={()=> buyTickets(input)}>Buy ticket</button>}
                    {!isApprove && <button onClick={()=> approveFC()}>Approve</button>}
                </div>
            </Modal>
        </section>
    );
};


export default Luckydraw;
