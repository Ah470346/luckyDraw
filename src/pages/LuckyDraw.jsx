import React,{useState,useEffect} from 'react';
import Countdown from 'react-countdown';
import {ReactComponent as Empty} from '../assets/images/EmptyTicket.svg';
import {ReactComponent as Next} from '../assets/images/Next.svg';
import {ReactComponent as Previous} from '../assets/images/Previous.svg';
import {ReactComponent as Reload} from '../assets/images/reload.svg';
import {ReactComponent as People} from '../assets/images/people.svg';
import {ReactComponent as Ticket} from '../assets/images/ticket.svg';
import { Row, Col,Modal,Spin,Tooltip } from 'antd';
import { useLKaction } from '../hook/hookLK';
import { useLKnftAction } from '../hook/hookLKNFT';
import { useERC20Action } from '../hook/hookErc20';
import { useDispatch } from 'react-redux';
import { changeMoney } from '../redux/reloadMoney';
import {openNotificationWithIcon } from '../components/api/Api';
import useWallet from 'use-wallet';
import Background from '../assets/images/Background';
import Waiting from '../assets/images/waitting';
import { Transition } from 'react-transition-group';
import {handledErrorAction} from "../utils/handleError";



const Luckydraw = () => {
    const dispatch = useDispatch();
    //error do Gọi hàm từ file useKaiWallet
    //ConnectKaiWallet().test(res => console.log(res));

    //fix khởi tạo instance thành hàm của rect component
    //
    const setMoney = (money)=> dispatch(changeMoney(money));
    const [visible,setVisible] = useState(false);
    const [showResult,setShowResult] = useState(0);
    const [wave,setWave] = useState(null);
    const [avoid,setAvoid] = useState(false);
    const [price,setPrice] = useState(null);
    const [input,setInput] = useState(null);
    const [inputWave,setInputWave] = useState(null);
    const [spin,setSpin] = useState(false);
    const [spinClaim,setSpinClaim] = useState(false);
    const [spinWave,setSpinWave] = useState(false);
    const [claim,setClaim] = useState(null);
    const [lastWave,setLastWave] = useState(null);
    // check giữa last wave và sync wave để đồng bộ quá trình search wave
    const [syncWave,setSyncWave] = useState(null);
    const [isApprove,setIsApprove] = useState(false);
    const [reward,setReward] = useState(null);
    const [check,setCheck] = useState(false);
    const [effectReward,setEffectReward] = useState(null);
    const [effect,setEffect] = useState(false);
    const [historyResult,setHistoryResult] = useState({reward:null,totalTicket:null,totalPlayer:null,win:null});
    const [totalPlayer,setTotalPlayer] = useState(null);
    const [avoidXoSo,setAvoidXoSo] = useState(false);
    const [totalTicket,setTotalTicket] = useState(null);
    const [finalResult,setFinalResult] = useState(null);
    const [myTickets, setMyTickets] = useState([]);
    const [finalTicket,setFinalTicket] = useState([]);
    const [lastTime,setLastTime] = useState(null);
    const [currentTime,setCurrentTime] = useState(null);
    const [requireTime,setRequireTime] = useState(null);
    const [date,setDate] = useState(null);
    const luckyDrawAction = useLKaction;
    const luckyNFTAction = useLKnftAction;
    const erc20Action = useERC20Action;
    const {balanceOf,approveLK,isApproveLK} = erc20Action();
    const {getPriceTicket,getTotalPlayers,getTotalTickets,buyTicket,getMyTicket,getLastTime,getRequireTime,XoSo,getCurrentTime,claimReward,checkReward,getHistory} = luckyDrawAction();
    const {getWave,getReward,getResult} = luckyNFTAction();
    const wallet = useWallet();
    const duration = 600;

    const defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0,
        transform: `scale(0.5) translateY(0px)`
    }

    const transitionStyles = {
        entering: { opacity: 1 ,transform: `scale(0.3) translateY(0px)`},
        entered:  { opacity: 1,transform: `scale(1) translateY(40px)` },
        exiting:  { opacity: 0,transform: `scale(0.5) translateY(0px)` },
        exited:  { opacity: 0 ,transform: `scale(0.5) translateY(0px)`},
    };

    const defaultStyle1 = {
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0,
        transform: `scale(0.5) translateY(0px)`
    }

    const transitionStyles1 = {
        entering: { opacity: 1 ,transform: `scale(0.3) translateY(-0px)`},
        entered:  { opacity: 1,transform: `scale(1) translateY(-40px)` },
        exiting:  { opacity: 0,transform: `scale(0.5) translateY(0px)` },
        exited:  { opacity: 0 ,transform: `scale(0.5) translateY(0x)`},
    };

    const refresh = () =>{
        setLastTime(null);
        setRequireTime(null);
        setCurrentTime(null);
    }
    const fetch = (check,check2,check3) => {
        if(check3 !== "fresh"){
            getWave().then((res)=>{
                setWave(res.toString());
            });
        }
        if(check=== true){
            getWave().then((res)=>{
                if(wallet.account){
                    getMyTicket(res.toString()).then(res => {
                        if(res[0].length !== 0){
                            setMyTickets(res)
                        } else {
                            setMyTickets([]);
                        }
                    } );
                }
                getResult(Number(res.toString())).then(res=> {setFinalResult(res[4].toString().padStart(4,"0"))});
            });
            setLastWave(null);
            setSyncWave(null);
        }
        getReward().then((res)=>{setReward((res.toString()/(10e17)).toFixed(2))});
        getTotalPlayers().then(res=> {setTotalPlayer(res.toString());});
        getTotalTickets().then(res=> setTotalTicket(res.toString()));
        getPriceTicket().then((res)=> setPrice((res.toString()/(10e17)).toFixed(2)));
        if(check2 === true){
            setDate(Date.now());
            getLastTime().then(res=>{setLastTime(Number(res.toString()) *1000);});
            getRequireTime().then(res=> setRequireTime(Number(res.toString()) * 60000));
            getCurrentTime().then((res)=> setCurrentTime(Number(res.toString())*1000));
        }
    }
    useEffect(()=>{
        fetch(true,false);
    },[wallet.account]);
    useEffect(()=>{
        const id = setInterval(()=>{
            fetch(false,false,"fresh");
        },2000)
        if(totalTicket !== historyResult.totalTicket && totalPlayer !== historyResult.totalPlayer && inputWave == wave){
            console.log(totalTicket,totalPlayer,inputWave);
            setHistoryResult({totalTicket:null,totalPlayer:null,...historyResult});
        }
        return ()=>{clearInterval(id)};
    },[inputWave,totalPlayer]);
    useEffect(()=>{
        if(inputWave!== null){
            onFilter(inputWave);
        }
    },[inputWave]);
    useEffect(()=>{
        setDate(Date.now());
        getLastTime().then(res=>{setLastTime(Number(res.toString()) *1000);});
        getRequireTime().then(res=> setRequireTime(Number(res.toString()) * 60000));
        getCurrentTime().then((res)=> setCurrentTime(Number(res.toString())*1000));
    },[])
    useEffect(()=>{
        isApproveLK().then((res)=> {setIsApprove(res)}).catch((e)=>console.log(e));
    },[isApprove,wallet.account]);
    useEffect(()=>{
        if(myTickets.length !== 0 && lastWave != 0) {
            setFinalTicket(getMyTicketList(myTickets));
        }
    },[historyResult.history,myTickets,lastWave]);
    const getMyTicketList = (myTickets) =>{
        let result = [];
        const list =  myTickets[0].flatMap((i,index)=>(i == wallet.account ? index : []));
        if((list.length !== 0  && syncWave !== lastWave || (syncWave === null && lastWave === null))){
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
            if(historyResult.reward !== null){
                for(let i of result){
                    if(i == historyResult.reward){
                        setHistoryResult({win:true,...historyResult});
                        result = [i,...result];
                        break;
                    }
                }
            }
            let final = [...new Set(result)];
            setSyncWave(lastWave);
            setSpinWave(false);
            return  final;
        } else if(syncWave !== lastWave){
            setSyncWave(lastWave);
            setSpinWave(false);
            return [];
        } else {
            return [];
        }
        
    }
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            if(totalPlayer != 0 && avoidXoSo === false){
                setShowResult(1);
            } 
            else {
                setShowResult(2);
            }
          return <span>00:00:00</span>;
        } else {
          // Render a countdown
           return <span>{hours.toString().padStart(2,'0')}:{minutes.toString().padStart(2,'0')}:{seconds.toString().padStart(2,'0')}</span>;
        }
      };

    const approveFC = () =>{
        setSpin(true);
        approveLK().then(res=>{
            res.wait().then(res=> {
                setIsApprove(res);setSpin(false);
                openNotificationWithIcon("success","Info","Approve success!");
            }).catch(err => {openNotificationWithIcon("warning","Warning",handledErrorAction(err).message);setSpin(false)});;
        }).catch(err => {openNotificationWithIcon("warning","Warning",handledErrorAction(err).message);setSpin(false)});
    }
    const buyTickets = (input) =>{
        if(input === "" || input === null){
            openNotificationWithIcon("error","Error","Please enter the number of tickets!");
        } else if(input == 0) {
            openNotificationWithIcon("error","Error","The number is not correct!");
        } else if((Number(input) + Number(totalTicket)) > 9999){
            openNotificationWithIcon("error","Error","The number of tickets exceeds the specified number!");
        }
        else {
            setSpin(true);
            buyTicket(input).then(res=> {
                res.wait().then(res=>{
                    setVisible(false);
                    setHistoryResult({history:null,win:null,totalTicket:null,totalPlayer:null});
                    balanceOf(wallet.account).then((res)=>setMoney((res.toString()/(10e17)).toFixed(0)));
                    fetch(true,false);
                    setSpin(false);
                    setInput("");
                    openNotificationWithIcon("success","Info","Buy tickets success!");
                }).catch((er)=>{
                    openNotificationWithIcon("warning","Warning",handledErrorAction(er).message);
                    setSpin(false);
                })
            }).catch((error)=>{
                openNotificationWithIcon("warning","Warning",handledErrorAction(error).message);
                setSpin(false);
            })
        }
    }
    const onNextWave = (inputWave) =>{
        if(inputWave !== null && inputWave !== "" && Number(inputWave) < Number(wave)){
            setSpinWave(true);
            if(Number(inputWave) === Number(wave-1)){
                setInputWave(wave);
                getMyTicket(wave).then(res => {
                    if(res[0].length !== 0){
                        setMyTickets(res);
                        setHistoryResult({history:null,win:null,totalTicket:null,totalPlayer:null});
                    } else {
                        setMyTickets([]);
                        setHistoryResult({history:null,win:null,totalTicket:null,totalPlayer:null});
                        setSpinWave(false);
                    }
                    setLastWave(Number(inputWave));
                });
            } else{
                setInputWave(inputWave ?  Number(inputWave) + 1 : Number(wave) +1);
                getResult(inputWave ?  Number(inputWave) + 1 : Number(wave) +1).then(res=> {
                    setHistoryResult({reward:res[4].toString(),totalPlayer:res[2].toString(),totalTicket:res[1].toString()});
                    getHistory(Number(inputWave) == 0 ? wave + 1 :  Number(inputWave)+1).then((res)=>{
                        if(res[0].length !== 0){
                            setMyTickets(res);
                        } else {
                            setSpinWave(false);
                        }
                        setLastWave(Number(inputWave));
                    });
                });   
            }
           
        }
    }

    const onPreviousWave = (inputWave) =>{
        if((inputWave === null && Number(wave) > 1) || (Number(inputWave) > 1 && inputWave !== "")){
            setSpinWave(true);
            setInputWave(inputWave ?  Number(inputWave) - 1 : Number(wave) -1);
                getResult(inputWave ?  Number(inputWave) - 1 : Number(wave) -1).then(res=> {
                    setHistoryResult({reward:res[4].toString(),totalPlayer:res[2].toString(),totalTicket:res[1].toString()});
                    getHistory(Number(inputWave) == 0 ? wave - 1 :  Number(inputWave)-1).then((res)=>{
                        if(res[0].length !== 0){
                            setMyTickets(res);
                        } else {
                            setSpinWave(false);
                        }
                        setLastWave(Number(inputWave));
                    });
                });   
        }
    }
    const onReload = (inputWave) =>{
        if(inputWave !== null && Number(inputWave) !== Number(wave) && inputWave !== ""){
            setSpinWave(true);
            setInputWave(wave);
                getMyTicket(wave).then(res => {
                    if(res[0].length !== 0){
                        setMyTickets(res);
                        setHistoryResult({history:null,win:null,totalTicket:null,totalPlayer:null});
                    } else {
                        setMyTickets([]);
                        setHistoryResult({history:null,win:null,totalTicket:null,totalPlayer:null});
                        setSpinWave(false);
                    }
                    setLastWave(Number(inputWave));
                } );
        }
    }
    const onFilter = (inputWave) =>{
        console.log(wave);
        console.log(inputWave);
        if(inputWave === ""){
            setLastWave(0);
            setSyncWave(0);
            setSpinWave(true); 
        } else if(Number(inputWave) === Number(wave) && Number(inputWave) !== lastWave){
            console.log('hello');
            setSpinWave(true);
            getMyTicket(wave).then(res => {
                if(res[0].length !== 0){
                    setMyTickets(res);
                    setHistoryResult({history:null,win:null,totalTicket:null,totalPlayer:null});
                } else {
                    setMyTickets([]);
                    setHistoryResult({history:null,win:null,totalTicket:null,totalPlayer:null});
                    setSpinWave(false);
                }
                setLastWave(Number(inputWave));
            } );
        } else if(Number(inputWave) !== lastWave) {
            console.log('2');
            setSpinWave(true);
            getResult(Number(inputWave)).then(res=> {
                setHistoryResult({reward:res[4].toString(),totalPlayer:res[2].toString(),totalTicket:res[1].toString()});
                getHistory(Number(inputWave)).then((res)=>{
                    if(res[0].length !== 0){
                        setMyTickets(res);
                    } else {
                        setSpinWave(false);
                    }
                    setLastWave(Number(inputWave));
                });
            });   
        }

    }
    // Date.now() + (requireTime - (currentTime - lastTime))
  
    return (
        <section className='wrap-page'>
                <Row gutter={16} className='banner-luckydraw'>
                    <Col span={24} xl={{span:18}} style={{paddingLeft:"0"}}>
                        <div className='waiting'>
                                <div className='waiting-header'>
                                    <div className='left'>
                                        <div className='txt wrap-wave mr-5'>Wave: <span >{wave !== null && wave.toString().padStart(2,'0')}</span></div>
                                        <div className='txt wrap-time'>Time: { showResult === 0 && lastTime && requireTime && currentTime && date && <Countdown renderer={renderer} 
                                            date={date + (requireTime - (currentTime - lastTime)) - 10000}></Countdown>}
                                            {showResult !== 0 && <span>00:00:00</span>}
                                        </div>
                                    </div>
                                    {/* <button onClick={()=> {
                                        if(totalPlayer == 0){
                                            XoSo().then(res=> {console.log(res)});
                                        } else{
                                            XoSo().then(res => console.log(res))};
                                        }
                                        }>Xo So</button> */}
                                    <div className='right'>
                                        <Tooltip title="Total players of current wave">
                                            <div className='total-player-current txt'>
                                                <People></People>
                                                <span >{totalPlayer && totalPlayer}</span>
                                            </div>
                                        </Tooltip>
                                        <Tooltip title="Total tickets of current wave">
                                            <div className='total-ticket-current txt'>
                                                <Ticket></Ticket>
                                                <span >{totalTicket && totalTicket}</span>
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>
                              { showResult === 0 && <div className='waiting-content'>
                                    <p className='reward-title'>REWARD OF LUCKY DRAW</p>
                                    <p className='reward'>{reward !== null ? reward.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0} $</p>
                                    <p className='note'>Power up for chance to win in this electrifying <br /> instant game!</p>
                                    <button  onClick={()=> {setVisible(true)}} className='buy'>Buy Ticket</button>
                                </div>}
                              { showResult === 1 && finalResult && <div className='waiting-content result reset'>
                                    <Transition in={effect} timeout={duration}>
                                        {state => (
                                        <div className='congratulation' style={{
                                            ...defaultStyle,
                                            ...transitionStyles[state]
                                        }}>
                                            CONGRATULATION!!
                                        </div>
                                        )}
                                    </Transition>
                                    <Background setWave={setWave} setInputWave={setInputWave} refresh={refresh} setAvoidXoSo={setAvoidXoSo} setEffect={setEffect} setEffectReward={setEffectReward} wave={wave} setShowResult={setShowResult}  fetch={fetch}>
                                    </Background>
                                    <Transition in={effect} timeout={duration}>
                                       {state => (<div className='id-ticket' style={{
                                                ...defaultStyle1,
                                                ...transitionStyles1[state]
                                            }}>
                                            <div className='avt'>
                                            </div>
                                            <div className='id'>
                                                <p>BILLY DE NFT</p>
                                                <p className='txt'>ID ticket: <span>{effectReward}</span></p>
                                            </div>
                                        </div>)}
                                    </Transition>
                                    <p className='end'>The WINNER of this wave</p>
                                </div>}
                            { showResult === 2 && <Waiting refresh={refresh} setShowResult={setShowResult}  fetch={fetch} lastTime={lastTime}></Waiting>}
                        </div>
                    </Col >
                    <Col style={{paddingRight:"0"}} span={24} xl={{span:6}}  className='wrap-information'>
                        <Row gutter={16} className='information'>
                            <Col className='col-search' style={{height:"33%"}} span={24} sm={{span:14,offset:5}} md={{span:12,offset:6}} lg={{span:8,offset:0}} xl={{span:24}} >
                                <div className='history'>
                                    <div className='header-search'>
                                        <div  className='input'>
                                            <p className='txt'>Wave:</p>
                                            <input onChange={(event)=> {
                                                if (isNaN(event.target.value) === false) {
                                                    if (event.nativeEvent.inputType === "deleteContentBackward" || Number(event.target.value) <= parseInt(wave) && Number(event.target.value) > 0) {
                                                        setInputWave(event.target.value);
                                                    }
                                                }
                                            }} autoComplete='off' id="inputWave" type="text" value={inputWave !== null ? inputWave : wave}/>
                                        </div>
                                        <div className='direction'>
                                            <Previous onClick={()=>onPreviousWave(inputWave)} style={inputWave == 1 || inputWave==="" ? {opacity:"0.2",cursor:"no-drop"} : {opacity:"1",cursor:"pointer"}}></Previous>
                                            <Next onClick={() => onNextWave(inputWave)} style={inputWave == wave || inputWave == null || inputWave===""? {opacity:"0.2",cursor:"no-drop"} : {opacity:"1",cursor:"pointer"}}></Next>
                                            <Reload onClick={() => onReload(inputWave)} style={inputWave == wave  || inputWave == null || inputWave==="" ? {opacity:"0.2",cursor:"no-drop"} : {opacity:"1",cursor:"pointer"}}></Reload>
                                        </div>
                                    </div>
                                    <Spin spinning={spinWave}>
                                        {spinWave !== true && <div className='body-search'>
                                            <div className='winning'>
                                                <p>Winning Number</p>
                                            {historyResult.reward  ?  <div className='ball-win'>
                                                    <div className='ball'>{historyResult.reward.toString().padStart(4,'0')[0]}</div>
                                                    <div className='ball'>{historyResult.reward.toString().padStart(4,'0')[1]}</div>
                                                    <div className='ball'>{historyResult.reward.toString().padStart(4,'0')[2]}</div>
                                                    <div className='ball'>{historyResult.reward.toString().padStart(4,'0')[3]}</div>
                                                </div>
                                                : <div className='ball-win'>
                                                <div className='ball'>?</div>
                                                <div className='ball'>?</div>
                                                <div className='ball'>?</div>
                                                <div className='ball'>?</div>
                                            </div>}
                                            </div>
                                            <div className='total-detail'>
                                                <Tooltip title="Total players of history wave">
                                                    <span >{historyResult.totalPlayer !== null ? historyResult.totalPlayer : (totalPlayer && totalPlayer)}  <People></People></span>
                                                </Tooltip>
                                                <Tooltip title="Total players of history wave">
                                                    <span >{historyResult.totalTicket !== null ? historyResult.totalTicket : (totalTicket && totalTicket)}  <Ticket></Ticket></span>
                                                </Tooltip>
                                            </div>  
                                        </div>}
                                    </Spin>
                                </div>
                            </Col>
                            <Col span={24} md={{span:24}} lg={{span:8,offset:0}}  xl={{span:24}} className='wrap-myTicket' style={{}}>
                                <div className='my-ticket'>
                                    <div className='header'>
                                        <p className='txt'>My Tickets:</p>
                                        <span className='mt-0'>{myTickets.length ===0 ? "00" : finalTicket.length.toString().padStart(2,"0")}</span>
                                    </div>
                                    <div className='content'>
                                        <div className='list-ticket'>
                                            <Spin spinning={spinWave}>
                                            {myTickets.length === 0 || finalTicket.length === 0 ?  <div className='empty'>
                                                <Empty></Empty>
                                                <p>You don’t have any ticket. <br /> Wanna try buy some?</p>
                                            </div> 
                                            : <ul><Row className='list'>
                                                {
                                                    spinWave!== true && myTickets.length !==0 && finalTicket.map((i,index)=>{
                                                        if(historyResult.history !== null){
                                                            if(index === 0 && historyResult.win === true){
                                                                return (
                                                                    <Col className='item'  span={24} sm={{span:12}} lg={{span:24}} >
                                                                        <li>
                                                                            <div className='ball red'>{i.toString().padStart(4,'0')[0]}</div>
                                                                            <div className='ball red'>{i.toString().padStart(4,'0')[1]}</div>
                                                                            <div className='ball red'>{i.toString().padStart(4,'0')[2]}</div>
                                                                            <div className='ball red'>{i.toString().padStart(4,'0')[3]}</div>
                                                                        </li>
                                                                    </Col>
                                                                )
                                                            } else {
                                                                return (
                                                                    <Col className='item' span={24} sm={{span:12}} lg={{span:24}}>
                                                                        <li>
                                                                            <div className='ball'>{i.toString().padStart(4,'0')[0]}</div>
                                                                            <div className='ball'>{i.toString().padStart(4,'0')[1]}</div>
                                                                            <div className='ball'>{i.toString().padStart(4,'0')[2]}</div>
                                                                            <div className='ball'>{i.toString().padStart(4,'0')[3]}</div>
                                                                        </li>
                                                                    </Col>
                                                                )
                                                            }         
                                                        }
                                                        return (
                                                            <Col className='item' span={24} sm={{span:12}} lg={{span:24}}>
                                                                <li>
                                                                    <div className='ball'>{i.toString().padStart(4,'0')[0]}</div>
                                                                    <div className='ball'>{i.toString().padStart(4,'0')[1]}</div>
                                                                    <div className='ball'>{i.toString().padStart(4,'0')[2]}</div>
                                                                    <div className='ball'>{i.toString().padStart(4,'0')[3]}</div>
                                                                </li>
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </Row></ul> }
                                            </Spin>
                                        </div>
                                        <div className='buy-ticket'>
                                            {!check ? <button onClick={()=>{checkReward(wallet.account).then((res)=> {
                                                if((res.toString()/(10e17)).toFixed(0) > 0){
                                                    setClaim((res.toString()/(10e17)).toFixed(2));
                                                    setCheck(true);
                                                } else {
                                                    openNotificationWithIcon('error','info',"you didn't win");
                                                }
                                                });}} >Check</button>:
                                                <Spin spinning={spinClaim}>
                                                <button className='claim' onClick={()=>{
                                                    setSpinClaim(true);
                                                    if(avoid === true){
                                                        openNotificationWithIcon('warning',"Warning","The system is in process, please wait!");
                                                        setSpinClaim(false);
                                                        
                                                    } else {
                                                        claimReward().then(res => {
                                                            setAvoid(true);
                                                            res.wait().then(res=>{
                                                                openNotificationWithIcon('success','info',"Claim reward success");
                                                                balanceOf(wallet.account).then((res)=>setMoney((res.toString()/(10e17)).toFixed(0)));
                                                                setCheck(false);
                                                                setSpinClaim(true);
                                                                setAvoid(false);
                                                            })
                                                        }).catch((err)=>{
                                                            setSpinClaim(false);
                                                        })
                                                    }
                                                }}>Claim {claim && claim.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}$</button> </Spin>
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
            maskClosable={false}
            visible={visible}
            onCancel={() => {
                if(spin !== true){
                    setInput("");
                    setVisible(false);
                } else {
                    openNotificationWithIcon("warning","Warning","Transition is being processing... !");
                }
            }}
            footer={false}
            >
                <div className='input-number'>
                    <p>Number of tickets:</p>
                    <input onChange={(event)=> 
                      {  
                        if(event.target.value < 11 && event.target.value > 0 || event.target.value === "" ){
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
                    <Spin spinning={spin}>
                        {isApprove && <button onClick={()=> buyTickets(input)}>Buy ticket</button>}
                        {!isApprove && <button onClick={()=> approveFC()}>Approve</button>}
                    </Spin>
                </div>
            </Modal>
        </section>
    );
};


export default Luckydraw;
