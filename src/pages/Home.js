import React, {useEffect, useState} from 'react';
import 'react-notifications/lib/notifications.css';
import {withRouter} from 'react-router';
import {useWallet} from "use-wallet";
import {useBuyTicketAction} from "../hook/hookBuyTicket";
import {convertBigNumBer, openNotificationWithIcon} from "../components/api/Api";
import Countdown from "react-countdown";
import {useNFTaction} from "../hook/hookNFT";
import {BlockCurrentDetail, BlockResult, BlockResultYourTicket, ModalBuyTicket} from "../components/Component";
import {useERC20Action} from "../hook/hookErc20";
import {useDispatch, useSelector} from "react-redux";
import {changeMoney} from "../redux/reloadMoney";
import {changeSumReward} from "../redux/reloadSumReward";

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span></span>;
  } else {
    return <span>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>;
  }
};

function getRandomInt() {
  return Math.floor(Math.random() * 9);
}


const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const BoxDrawnLoto = ({isStartDraw, setIsHaveWinner,setIsShowCountDownDraw,isShowCountDownDraw})=>{
    const nftAction = useNFTaction()
    const [result1,setResult1] = useState(getRandomInt())
    const [isDone,setIsDone] = useState(false)
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


    useEffect(async ()=>{
        if (isDone) {
           while (true) {
               const id = await nftAction.checkDrawNow();
               console.log(id)
               if (id===false) {
                   setIsShowCountDownDraw(false)
                   window.location.reload()
                   break
               }
           }
        }
    },[isDone])

    useEffect(async()=>{
        if (isStartDraw) {
            console.log("tessssssssssssssssss")
            while (true) {
            const id = await nftAction.checkDrawNow();
                console.log(id)
                if (id===true) {
                    nftAction.getCurrentDraw()
                        .then(res=>{
                            nftAction.returnNumberId(parseInt(res.toString())-1)
                                .then(res=>{
                                    let lsResult = []
                                    for (let i of res[0]) {
                                        lsResult.push(i.toString())
                                    }
                                    setResult(lsResult)
                                })
                        })
                    break
                }
            }
        }
    },[isStartDraw])




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


    const setResult = (values) => {
        console.log("ok");
        setTimeout(()=>{
            setResult1(values[0])
            setResult1True(true)
        clearInterval(id1);
        },3000)
        setTimeout(()=>{
             setResult2(values[1])
            setResult2True(true)
        clearInterval(id2);
        },6000)
        setTimeout(()=>{
             setResult3(values[2])
            setResult3True(true)
        clearInterval(id3);
        },9000)
        setTimeout(()=>{
             setResult4(values[3])
            setResult4True(true)
        clearInterval(id4);
        },12000)
        setTimeout(()=>{
             setResult5(values[4])
            setResult5True(true)
        clearInterval(id5);
        },15000)
        setTimeout(()=>{
             setResult6(values[5])
            setResult6True(true)
        clearInterval(id6);
        },18000)
        setTimeout(()=>{
            setIsHaveWinner()
        },18000)
        setTimeout(()=>{
            setIsDone(true)
        },20000)


    }
    return (
        <div className="numbersdraw">
            <span className={result1True ? 'bg-result-draw' : null}>{result1}</span>
            <span className={result2True ? 'bg-result-draw' : null}>{result2}</span>
            <span className={result3True ? 'bg-result-draw' : null}>{result3}</span>
            <span className={result4True ? 'bg-result-draw' : null}>{result4}</span>
            <span className={result5True ? 'bg-result-draw' : null}>{result5}</span>
            <span className={result6True ? 'bg-result-draw' : null}>{result6}</span>
        </div>
    )
}


const Home = () => {
    const nftAction = useNFTaction();
    const {balanceOf} = useERC20Action();
    const dispatch = useDispatch();
    const setBalanceCPA = (money) => dispatch(changeMoney(money));
    const currentRewardMoney = useSelector((state)=> state.sumReward);
    const setCurrentRewardMoney = (reward) => dispatch(changeSumReward(reward));
    const buyTicketAction = useBuyTicketAction();
    const [nextDraw, setNextDraw] = useState(null);
    const [nextDrawPre, setNextDrawPre] = useState(null);
    const [yourReward, setYourReward] = useState(null);
    const [resetCountdown, setResetCountdown] = useState(false);
    const [isShowCountDownDraw, setIsShowCountDownDraw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isReload, setIsReload] = useState(0);
    const [isHaveWinner, setIsHaveWinner] = useState(false);
    const [isStartDraw, setStartDraw] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isShowModalBuyTicket, setIsShowModalBuyTicket] = useState(false);

    const {account} = useWallet();
    useEffect(() => {
        nftAction.returnTotalReward()
        .then(res=>{
            setCurrentRewardMoney(convertBigNumBer(res))})
    }, [])


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
        // buyTicketAction.returnBlockTime()
        //     .then(res=>{
        //         console.log(res.toString())})
        buyTicketAction.returnBlockTime()
            .then(res=>{
            console.log(res.toString())
            const currentTime = new Date(res.toString()*1000);
                console.log(currentTime)
            const timeCheck = new Date(res.toString()*1000);
            const nextDate = new Date(new Date(res.toString()*1000).setDate(currentTime.getDate()+1))
            buyTicketAction.getTimeDraw()
                .then(res=>{
                    console.log(res[0].toString())
                    console.log(res[1].toString())
                    const time1 = new Date(timeCheck.setHours(res[0].toString(),0,0))
                    const time2 = new Date(timeCheck.setHours(res[1].toString(),0,0))
                    console.log(currentTime.getHours())
                    console.log(time1)
                    console.log(time2)
                    if (currentTime > time2) {
                        console.log("time 2")
                        setNextDraw(nextDate.setHours(res[0].toString(),0,0))
                        console.log(nextDate.setHours(res[0].toString()-1,59,0))
                        setNextDrawPre(nextDate.setHours(res[0].toString()-1,59,0))
                    }
                    else if (currentTime > time1)
                    {
                        setNextDraw(currentTime.setHours(res[1].toString(),0,0))
                        setNextDrawPre(currentTime.setHours(res[1].toString()-1,59,0))
                    }
                    else {
                        console.log("ok")
                        setNextDraw(currentTime.setHours(res[0].toString(),0,0))
                        setNextDrawPre(currentTime.setHours(res[0].toString()-1,59,0))
                    }
                     setResetCountdown(false)
                })

            // if (currentTime.getHours() > 7) {
            //     setNextDraw(currentTime.setHours(19,0,0))
            // }

            // setNextDraw(currentTime.getTime() + 10000)
            // setNextDrawPre(currentTime.getTime() + 9000)

            })

    },[resetCountdown]);


    const resetNextDraw = () =>{
        setResetCountdown(true)
    }

    const onCheckNow = () =>{
        buyTicketAction.checkReward(account)
            .then(res=>{
                console.log(res)
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
                res.wait().then(res=>{
                    openNotificationWithIcon('success','Info','Success')
                    setYourReward(null)
                    fetchNewUserTicket()
                })
            })
    }
    const fetchNewUserTicket = () => {
        balanceOf(account).then(res=>{
            setBalanceCPA((res.toString()/(10e17)).toFixed(0))
        })
            .catch(err=>{
                console.log(err)
            })
        nftAction.returnTotalReward()
        .then(res=>{
            setCurrentRewardMoney(convertBigNumBer(res))})

    }

    const onCountDown = ()=>{
        console.log("reset")
        setIsShowCountDownDraw(true)
        console.log("done")
    }
    const onStartDraw = () =>{
        console.log("start")
        nftAction.returnNumberId(1)
            .then(res=>{
                let lsWinning = []
                for (let i of res[0]) {
                    lsWinning.push(i.toString())
                }
            })
        setStartDraw(true)
        setIsDrawing(true)
    }

    const DrawnLoto = () => {
        buyTicketAction.drawnLoto()
            .then(res=> {
                console.log(res)
            })
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
                            ~ {currentRewardMoney.sumReward} $
                        </h1>
                         <p className="text">Power up for a chance to win in this electrifying instant game!</p>
                             </>

                              :
                                <BoxDrawnLoto isStartDraw={isStartDraw} setIsHaveWinner={()=>setIsHaveWinner(true)} setIsShowCountDownDraw={setIsShowCountDownDraw} isShowCountDownDraw={isShowCountDownDraw}/> }
                        {!isShowCountDownDraw ?
                            <a href="#" className="custom-button2 btn-top btn-playing-now" onClick={()=>setIsShowModalBuyTicket(true)}>Start Playing Now</a>
                            :
                            <>
                            <h1 className={'find-the-winner'}>{isDrawing && !isHaveWinner ? "Finding The Winner ..." : null}</h1>
                            <h1 className={'find-the-winner'}>{isHaveWinner ? "Congratulation Winner" : null}</h1>
                            </>
                        }
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
                    {!isDrawing ?
                    <div className="time-wrapper">
                        <div className="time-counter">
                            <img src="assets/images/clock.png" alt=""/>
                                <p className="time-countdown">
                                {nextDraw && resetCountdown === false ?
                                <>
                                    {!isShowCountDownDraw ?
                                        <>
                                    <Countdown date={nextDraw} renderer={renderer} onComplete={()=>resetNextDraw(true)}/> <span>until the Draw</span></>
                                        :
                                    <><Countdown date={nextDraw} renderer={renderer} onComplete={()=>onStartDraw()}/> <span>until the draw</span></>}

                                </>:null}</p>


                        </div>
                        <div>
                            <p className="time-countdown" style={{display:'none'}}>
                                {nextDrawPre && resetCountdown === false ?
                                <>

                                    <Countdown date={nextDrawPre}  onComplete={()=>onCountDown()}/> <span>until the draw</span>
                                </>:null}</p>
                        </div>
                    </div>
                        : null
                    }
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
                                                        <BlockCurrentDetail rewardMoney={currentRewardMoney.sumReward} lsWinner={[]}/>
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
                                                <h6><img src={'assets/images/logo-coin.png'}/>&nbsp; ~ {currentRewardMoney.sumReward} $</h6>
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
                            {/*<button onClick={()=>DrawnLoto()}>Xổ số</button>*/}
                            {/*<button onClick={()=>buyTicketAction.setTimeDraw([16,17])}>Change Time</button>*/}
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
                            {!!isReload ? <BlockResultYourTicket/> : <BlockResultYourTicket/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    </section>
            <ModalBuyTicket visible={isShowModalBuyTicket} hideModal={()=>setIsShowModalBuyTicket(false)} Reload={isReload} setReload={setIsReload} fetchNewUserTicket={()=>fetchNewUserTicket()}/>
    </>
    );
};

export default withRouter(Home);