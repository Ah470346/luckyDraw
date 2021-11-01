import React,{useState,useEffect} from 'react';
import Countdown from 'react-countdown';
import {ReactComponent as More} from '../assets/images/More.svg';
import {ReactComponent as Empty} from '../assets/images/EmptyTicket.svg';
import { Row, Col,Modal,notification } from 'antd';
import { useLKaction } from '../hook/hookLK';
import { useLKnftAction } from '../hook/hookLKNFT';
import { useERC20Action } from '../hook/hookErc20';
import { useDispatch,useSelector } from 'react-redux';
import { changeMoney } from '../redux/reloadMoney';
import {ModalBuyTicket} from '../components/Component';
import { convertBigNumBer, getBalance, openNotificationWithIcon } from '../components/api/Api';
import useWallet from 'use-wallet';
import Background from '../assets/images/Background'



const Luckydraw = () => {
    const dispatch = useDispatch();
    const setMoney = (money)=> dispatch(changeMoney(money));
    const money = useSelector(state => state.money.money)
    const [visible,setVisible] = useState(false);
    const [showResult,setShowResult] = useState(false);
    const [wave,setWave] = useState(null);
    const [price,setPrice] = useState(null);
    const [input,setInput] = useState(null);
    const [isApprove,setIsApprove] = useState(false);
    const [reward,setReward] = useState(null);
    const [check,setCheck] = useState(false);
    const [effectReward,setEffectReward] = useState(null);
    const [historyResult,setHistoryResult] = useState({history:null,win:null});
    const [totalPlayer,setTotalPlayer] = useState(null);
    const [totalTicket,setTotalTicket] = useState(null);
    const [finalResult,setFinalResult] = useState(null);
    const [myTickets, setMyTickets] = useState([]);
    const [lastTime,setLastTime] = useState(null);
    const [currentTime,setCurrentTime] = useState(null);
    const [requireTime,setRequireTime] = useState(null);
    const [date,setDate] = useState(null);
    const [time,setTime] = useState(null);
    const luckyDrawAction = useLKaction;
    const luckyNFTAction = useLKnftAction;
    const erc20Action = useERC20Action;
    const {balanceOf,approveLK,isApproveLK} = erc20Action();
    const {getPriceTicket,getTotalPlayers,getTotalTickets,buyTicket,getMyTicket,getLastTime,getRequireTime,XoSo,getCurrentTime,claimReward,checkReward,resetTime,getHistory} = luckyDrawAction();
    const {getWave,getReward,getResult} = luckyNFTAction();
    const wallet = useWallet();


    const fetchNewUserTicket = () => {
        window.location.reload()
    };

    const fetch = (check,check2) => {
        if(check=== true){
            getWave().then((res)=>{
                setWave(res.toString());
                if(wallet.account){
                    getMyTicket(res.toString()).then(res => {setMyTickets(res) ;console.log(res);} );
                }
                getResult(Number(res.toString())-1).then(res=> {setFinalResult(res[4].toString().padStart(4,"0"))});
            });
        }
        getReward().then((res)=>{setReward((res.toString()/(10e17)).toFixed(0))});
        getTotalPlayers().then(res=> {setTotalPlayer(res.toString())});
        getTotalTickets().then(res=> setTotalTicket(res.toString()));
        getPriceTicket().then((res)=> setPrice((res.toString()/(10e17)).toFixed(0)));
        if(check2 === true){
            setDate(Date.now());
            getLastTime().then(res=>{setLastTime(Number(res.toString()) *1000);});
            getRequireTime().then(res=> setRequireTime(Number(res.toString()) * 60000));
            getCurrentTime().then((res)=> setCurrentTime(Number(res.toString())*1000));
        }

        getResult(39).then(res=> {setFinalResult(res[4].toString().padStart(4,"0"))});
    }
    useEffect(()=>{
        fetch(true,false);
    },[wallet.account]);
    useEffect(()=>{
        setDate(Date.now());
        getLastTime().then(res=>{setLastTime(Number(res.toString()) *1000);});
        getRequireTime().then(res=> setRequireTime(Number(res.toString()) * 60000));
        getCurrentTime().then((res)=> setCurrentTime(Number(res.toString())*1000));
    },[])
    useEffect(()=>{
        isApproveLK().then((res)=> {setIsApprove(res)}).catch((e)=>console.log(e));
    },[isApprove,wallet.account]);
    const getMyTicketList = (myTickets) =>{
        let result = [];
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
        console.log(historyResult.history);
        if(historyResult.history !== null){
            for(let i of result){
                if(i == historyResult.history){
                    setHistoryResult({win:true,...historyResult});
                    result = [i,...result];
                }
            }
        }
        let final = [...new Set(result)];
        return  final;
    }
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            if(totalPlayer != 0){
                setShowResult(true);
            }
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
            res.wait().then(res=>{
                setVisible(false);
                setHistoryResult({history:null,win:null});
                balanceOf(wallet.account).then((res)=>setMoney((res.toString()/(10e17)).toFixed(0)));
                fetch(true,false);
            })
           
        })
    }

    console.log(effectReward);

    const onNextWave = () =>{
        const inputWave = document.querySelector("#inputWave");
        if(isNaN(inputWave.value) ||Number(inputWave.value) < 1 || Number(inputWave.value) > wave){
            openNotificationWithIcon('error',"info","Don't have this Wave !")
        } else if(Number(inputWave.value) === wave){
            setHistoryResult({history:null,win:null});
        } else {
            console.log("hiha");
            getHistory(Number(inputWave.value)).then((res)=>setMyTickets(res));
            getResult(Number(inputWave.value)).then(res=> {setHistoryResult({history:res[4].toString(),...historyResult});console.log(res[4].toString())});
        }

    }
    // Date.now() + (requireTime - (currentTime - lastTime))
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
                                        <div className='txt wrap-time'>Time: {!showResult && lastTime && requireTime && currentTime &&  date && <Countdown renderer={renderer} 
                                            date={date + (requireTime - (currentTime - lastTime))}></Countdown>}
                                            {showResult && <span>00:00:00</span>}
                                        </div>
                                    </div>
                                    <button onClick={()=> {
                                        if(totalPlayer == 0){
                                            XoSo().then(res=> {console.log(res); fetch(true,true)});
                                        } else{
                                            XoSo().then(res => console.log(res))};
                                        }
                                        }>Xo So</button>
                                    <div className='right'>
                                        <div className='txt wrap-balance'>Balance: <span >{money ? money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","): 0} $</span></div>
                                    </div>
                                </div>
                              { !showResult && <div className='waiting-content'>
                                    <p className='reward-title'>REWARD OF LUCKY DRAW</p>
                                    <p className='reward'>{reward !== null ? reward : 0} $</p>
                                    <p className='note'>Power up for chance to win in this electrifying <br /> instant game!</p>
                                    <button  onClick={()=> {setVisible(true)}} className='buy'>Buy Ticket</button>
                                </div>}
                              { showResult && finalResult && <div className='waiting-content result'>
                                    <p className='congratulation'>CONGRATULATION!!</p>
                                    <Background setEffectReward={setEffectReward} wave={wave} setShowResult={setShowResult}  fetch={fetch}>
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
                                        <div className='history'>
                                            {/* <Reload onClick={()=>{
                                                 const inputWave = document.querySelector("#inputWave");
                                                setHistoryResult(null);
                                                getMyTicket(wave).then(res => {setMyTickets(res)} );
                                                inputWave.value = "";
                                                }} className='reload'></Reload> */}
                                            <input id="inputWave" type="text" defaultValue={wave && wave}/>
                                            <More onClick={onNextWave} className='next'></More>
                                        </div>
                                        <span className='mt-0'>{myTickets.length ===0 ? "00" : getMyTicketList(myTickets).length.toString().padStart(2,"0")}</span>
                                    </div>
                                    <div className='content'>
                                        <div className='list-ticket'>
                                            {myTickets.length !== 0 ?  <div className='empty'>
                                                <Empty></Empty>
                                                <p>You don’t have any ticket. <br /> Wanna try buy some?</p>
                                            </div> 
                                            :<ul>
                                                {
                                                    myTickets.length !==0 && getMyTicketList(myTickets).map((i,index)=>{
                                                        if(historyResult.history !== null){
                                                            if(index === 0 && historyResult.win === true){
                                                                return (
                                                                    <li>
                                                                        <div className='ball red'>{i.toString().padStart(4,'0')[0]}</div>
                                                                        <div className='ball red'>{i.toString().padStart(4,'0')[1]}</div>
                                                                        <div className='ball red'>{i.toString().padStart(4,'0')[2]}</div>
                                                                        <div className='ball red'>{i.toString().padStart(4,'0')[3]}</div>
                                                                    </li>
                                                                )
                                                            } else {
                                                                return (
                                                                    <li>
                                                                        <div className='ball'>{i.toString().padStart(4,'0')[0]}</div>
                                                                        <div className='ball'>{i.toString().padStart(4,'0')[1]}</div>
                                                                        <div className='ball'>{i.toString().padStart(4,'0')[2]}</div>
                                                                        <div className='ball'>{i.toString().padStart(4,'0')[3]}</div>
                                                                    </li>
                                                                )
                                                            }
                                                           
                                                        }
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
                                            </ul>}
                                        </div>
                                        <div className='buy-ticket'>
                                            {!check ? <button onClick={()=>{checkReward(wallet.account).then((res)=> {
                                                console.log(res);
                                                if((res.toString()/(10e17)).toFixed(0) > 0){
                                                    setCheck(true);
                                                } else {
                                                    openNotificationWithIcon('error','info',"you didn't win");
                                                }
                                                });}} >Check</button>:
                                                <button onClick={()=>{
                                                    claimReward().then(res => {
                                                        res.wait().then(res=>{
                                                            openNotificationWithIcon('success','info',"Claim reward success");
                                                            balanceOf(wallet.account).then((res)=>setMoney((res.toString()/(10e17)).toFixed(0)));
                                                            setCheck(false);
                                                        })
                                                    })
                                                }}>Claim</button>
                                                }
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
            onCancel={() => {setInput("");setVisible(false)}}
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
