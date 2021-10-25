import React, {useEffect, useState} from 'react';
import 'react-notifications/lib/notifications.css';
import {withRouter} from 'react-router';
import {useWallet} from "use-wallet";
import {useBuyTicketAction} from "../hook/hookBuyTicket";
import {convertBigNumBer, LoadingFC, openNotificationWithIcon, sendEther} from "../components/api/Api";
import {useERC20Action} from "../hook/hookErc20";
import {Skeleton, Spin} from "antd";
import {Container} from "react-bootstrap";
import {handledErrorAction} from "../utils/handleError";
import {contractAddress} from "../utils/contract";
import Countdown from "react-countdown";
import { Form, Input, Button, Radio } from 'antd';
import {useNFTcontract} from "../hook/hookContract";
import {handleTxHash} from "../utils/handleTxHash";
import {useNFTaction} from "../hook/hookNFT";
import {BlockCurrentDetail, BlockResult, BlockResultYourTicket, ModalBuyTicket} from "../components/Component";
import {ethers} from "ethers";

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span></span>;
  } else {
    return <span>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>;
  }
};
function* shuffle(array) {

    var i = array.length;

    while (i--) {
        yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    }

}

function getRandomInt() {
  return Math.floor(Math.random() * 9);
}


const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const BoxDrawnLoto = ()=>{
    const [result1,setResult1] = useState(getRandomInt())
    const [result1True,setResult1True] = useState(false)
    const [result2True,setResult2True] = useState(false)
    const [result3True,setResult3True] = useState(false)
    const [result4True,setResult4True] = useState(false)
    const [result5True,setResult5True] = useState(false)
    const [result6True,setResult6True] = useState(false)
    const [result2,setResult2] = useState(getRandomInt())
    const [result3,setResult3] = useState(getRandomInt())
    const [result4,setResult4] = useState(getRandomInt())
    const [result5,setResult5] = useState(getRandomInt())
    const [result6,setResult6] = useState(getRandomInt())
    const [id1,setId1] = useState()
    const [id2,setId2] = useState()
    const [id3,setId3] = useState()
    const [id4,setId4] = useState()
    const [id5,setId5] = useState()
    const [id6,setId6] = useState()

    useEffect(()=>{
     const id11 = setInterval(() => {
        if (result1True === false) {
            setResult1(getRandomInt())
        }},100)
        setId1(id11);
     const id22 = setInterval(()=>{
          if (result2True === false) {
            setResult2(getRandomInt())
        }
     },100)
         setId2(id22);
      const id33 = setInterval(()=>{
          if (result3True === false) {
            setResult3(getRandomInt())
        }
     },100)
         setId3(id33);
   const id44 = setInterval(()=>{
          if (result4True === false) {
            setResult4(getRandomInt())
        }
     },100)
         setId4(id44);
    const id55 = setInterval(()=>{
          if (result5True === false) {
            setResult5(getRandomInt())
        }
     },100)
         setId5(id55);
     const id66 = setInterval(()=>{
          if (result6True === false) {
            setResult6(getRandomInt())
        }
     },100)
         setId6(id66);
    },[]);


    const setResult = () => {
        console.log("ok");
        setTimeout(()=>{
            setResult1(5)
        clearInterval(id1);
        },3000)
        setTimeout(()=>{
             setResult2(8)
        clearInterval(id2);
        },6000)
        setTimeout(()=>{
             setResult3(8)
        clearInterval(id3);
        },9000)
        setTimeout(()=>{
             setResult4(8)
        clearInterval(id4);
        },12000)
        setTimeout(()=>{
             setResult5(8)
        clearInterval(id5);
        },15000)
        setTimeout(()=>{
             setResult6(8)
        clearInterval(id6);
        },18000)

    }
    return (
        <div className="numbersdraw">
            <span>{result1}</span>
            <span>{result2}</span>
            <span>{result3}</span>
            <span>{result4}</span>
            <span>{result5}</span>
            <span>{result6}</span>
            <button onClick={()=>setResult()}>Test</button>
        </div>
    )
}


const Home = () => {
    const nftAction = useNFTaction();
    const buyTicketAction = useBuyTicketAction();
    const [amount, setAmount] = useState(1);
    const [nextDraw, setNextDraw] = useState(null);
    const [nextDrawPre, setNextDrawPre] = useState(null);
    const [yourReward, setYourReward] = useState(null);
    const [resetCountdown, setResetCountdown] = useState(false);
    const [isShowCountDownDraw, setIsShowCountDownDraw] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isShowModalBuyTicket, setIsShowModalBuyTicket] = useState(false);
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [currentRewardMoney,setCurrentRewardMoney] = useState(0)
    const [result,setResult] = useState([])
    const wallet = useWallet();
    const {account} = useWallet();
    useEffect(() => {
        nftAction.returnTotalReward()
        .then(res=>{
            setCurrentRewardMoney(convertBigNumBer(res))})
    }, [])
    const toggleDetail =()=>{
        const currentDetail = isShowDetail
        setIsShowDetail(!currentDetail)
    }

    // useEffect(()=>{
    //     const currentTime = new Date();
    //     const nextDate = new Date(new Date().setDate(currentTime.getDate()+1))
    //     if (currentTime.getHours() > 12) {
    //         setNextDraw(nextDate.setHours(12,0,0))
    //     }
    //     // if (currentTime.getHours() > 7) {
    //     //     setNextDraw(currentTime.setHours(19,0,0))
    //     // }
    //     else {
    //         setNextDraw(currentTime.setHours(12,0,0))
    //     }
    // },[]);

    useEffect(()=>{
        const currentTime = new Date();
        const nextDate = new Date(new Date().setDate(currentTime.getDate()))
        if (currentTime.getHours() > 12) {
            setNextDraw(nextDate.setHours(17,33,0))
            setNextDrawPre(nextDate.setHours(17,32,0))
        }
        // if (currentTime.getHours() > 7) {
        //     setNextDraw(currentTime.setHours(19,0,0))
        // }
        else {
            setNextDraw(currentTime.setHours(14,45,0))
            setNextDrawPre(nextDate.setHours(14,44,0))
        }
        setResetCountdown(false)
    },[resetCountdown]);


    const resetNextDraw = () =>{
        setResetCountdown(true)
    }

    const onCheckNow = () =>{
        buyTicketAction.checkReward(account)
            .then(res=>{
                console.log(res)
                console.log(convertBigNumBer(res.toString()))
                if (parseFloat(convertBigNumBer(res.toString())) > 0) {
                    setYourReward(parseFloat(convertBigNumBer(res.toString())))
                }
                else {
                    openNotificationWithIcon('error','Info','Good luck next time !!!')
                }
            })
    }

    const onClaimReward = () =>{
        buyTicketAction.claimReward()
            .then(res=>{
                console.log(res)
                openNotificationWithIcon('success','Info','Success')
                setYourReward(null)
            })
    }
    const fetchNewUserTicket = () => {
        window.location.reload()
    }

    const onCountDown = ()=>{
        console.log("reset")
        setIsShowCountDownDraw(true)
        console.log("done")
    }
    return (
        <>
        <section className="banner-section box-banner-section">
            <div className="container box-banner-section-inner">
                <div className="row">
                    <div className="col-12">
                        <p className="banner-subtitle">{!isShowCountDownDraw ? "Exclusive Lottery Mega Jackpot" : "The lucky number is"}</p>
                         {!isShowCountDownDraw ?
                             <>
                        <h1 className="banner-title">
                            ~ {currentRewardMoney} BILLY
                        </h1>
                         <p className="text">Power up for a chance to win in this electrifying instant game!</p>
                             </>

                              :
                                <BoxDrawnLoto /> }
                        {!isShowCountDownDraw ? <a href="#" className="custom-button2 btn-top btn-playing-now" onClick={()=>setIsShowModalBuyTicket(true)}>Start Playing Now</a> :null}
                    </div>
                </div>
            </div>
        </section>
    <section className="singlelottery">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    {/*<div className="steps" style={{display:'block'}}>*/}
                        {/*<div className="section-header">*/}
                        {/*<h2 className={'title ep'} style={{fontSize:'36px'}}>Get your tickets now!</h2></div>*/}
                        {/*<button className="custom-button2" onClick={()=>setIsBuying(true)}>Buy Tickets</button>*/}
                    {/*</div>*/}
                    <div className="time-wrapper">
                        <div className="time-counter">
                            <img src="assets/images/clock.png" alt=""/>
                                {/*<p className="time-countdown" data-countdown="01/01/2021"></p>*/}
                                <p className="time-countdown">
                                {nextDraw && resetCountdown === false ?
                                <>
                                    {!isShowCountDownDraw ?
                                        <>
                                    <Countdown date={nextDraw} renderer={renderer} onComplete={()=>resetNextDraw()}/> <span>until the countdown</span></>
                                        :
                                    <><Countdown date={nextDraw} renderer={renderer} onComplete={()=>resetNextDraw()}/> <span>until the draw</span></>}

                                </>:null}</p>


                        </div>
                        <div>
                            <p className="time-countdown" style={{display:'none'}}>
                                {nextDraw && resetCountdown === false ?
                                <>

                                    <Countdown date={nextDrawPre}  onComplete={()=>onCountDown()}/> <span>until the draw</span>
                                </>:null}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

                    <div className="lottery-result result-page">
                        <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="result-list">
                                    <div className="single-list">
                                        <div className="light-area">
                                            <div className="light-area-bottom">
                                                <div className={'col-lg-12'}>
                                                    <div className={'row'}>
                                                        <BlockCurrentDetail rewardMoney={currentRewardMoney} lsWinner={[]}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="light-area-top box-buy-ticket">
                                                <button className="custom-button2 btn-top" onClick={()=>setIsShowModalBuyTicket(true)}>Buy Ticket</button>
                                            </div>
                                        </div>
                                        <div className="color-area">
                                            <div className="top">
                                                <span>Next Draw</span>
                                                <h6>{nextDraw ? new Date(parseInt(nextDraw.toString())).toLocaleDateString("en-US", options) : null}</h6>
                                            </div>
                                            <div className="bottom">
                                                <span>Est. Jackpot </span>
                                                <h6><img src={'assets/images/logo-coin.png'}/>&nbsp; ~ {currentRewardMoney} BILLY</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

    <div className="lottery-result result-page pt-1">
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-9">
                    <div className="content">
                        <div className="section-header">
                            <h2 className="title">
                                Latest Lottery results
                            </h2>
                            <p className="text">
                                Check Your lotto online, find all the lotto winning numbers and see
                                if you won the latest lotto jackpots
                            </p>
                            <p></p>
                            <button className={'btn-top custom-button1'} style={{width:'100%',paddingTop:'10px',paddingBottom:'10px',fontSize:'25px'}} onClick={()=>onCheckNow()}>Check Now</button>
                            {yourReward ? <h1>You had win {yourReward} $, <button onClick={()=>onClaimReward()} className={'btn-top custom-button1 btn-claim-bil'}>Claim Now</button></h1> : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="result-box">
                        <h4 className="box-header text-uppercase">Lottery Winning Numbers</h4>
                        <div className="result-list">
                            <BlockResult />
                        </div>
                    </div>
                </div>
            </div>


            <div className="row mt-5 mb-5">
                <div className="col-lg-12">
                    <div className="result-box">
                        <h4 className="box-header">CHECK YOUR TICKET</h4>
                        <div className="result-list">
                            <BlockResultYourTicket/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    </section>
            <ModalBuyTicket visible={isShowModalBuyTicket} hideModal={()=>setIsShowModalBuyTicket(false)} fetchNewUserTicket={()=>fetchNewUserTicket()}/>
    </>
    );
};

export default withRouter(Home);