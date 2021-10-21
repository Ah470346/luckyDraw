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



const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


const Home = () => {
    const nftAction = useNFTaction();
    const buyTicketAction = useBuyTicketAction();
    const [amount, setAmount] = useState(1);
    const [nextDraw, setNextDraw] = useState(null);
    const [yourReward, setYourReward] = useState(null);
    const [resetCountdown, setResetCountdown] = useState(false);
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

    useEffect(()=>{
        const currentTime = new Date();
        const nextDate = new Date(new Date().setDate(currentTime.getDate()+1))
        if (currentTime.getHours() > 12) {
            setNextDraw(nextDate.setHours(12,0,0))
        }
        // if (currentTime.getHours() > 7) {
        //     setNextDraw(currentTime.setHours(19,0,0))
        // }
        else {
            setNextDraw(currentTime.setHours(12,0,0))
        }
    },[]);

    useEffect(()=>{
        const currentTime = new Date();
        const nextDate = new Date(new Date().setDate(currentTime.getDate()+1))
        if (currentTime.getHours() > 12) {
            setNextDraw(nextDate.setHours(12,0,0))
        }
        // if (currentTime.getHours() > 7) {
        //     setNextDraw(currentTime.setHours(19,0,0))
        // }
        else {
            setNextDraw(currentTime.setHours(12,0,0))
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
    return (
        <>
        <section className="banner-section box-banner-section">
            <div className="container box-banner-section-inner">
                <div className="row">
                    <div className="col-12">
                        <p className="banner-subtitle">Exclusive Lottery Mega Jackpot</p>
                        <h1 className="banner-title">
                            ~ {currentRewardMoney} BILLY
                        </h1>
                        <p className="text">Power up for a chance to win in this electrifying instant game!</p>
                        <a href="#" className="custom-button2 btn-top btn-playing-now" onClick={()=>setIsShowModalBuyTicket(true)}>Start Playing Now</a>
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
                                    <Countdown date={nextDraw} renderer={renderer} onComplete={()=>resetNextDraw()}/> <span>until the draw</span>
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