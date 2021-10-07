import React, {useEffect, useState} from 'react';
import 'react-notifications/lib/notifications.css';
import {withRouter} from 'react-router';
import {useWallet} from "use-wallet";
import {useOpenBoxAction} from "../hook/hookOpenBox";
import {convertBigNumBer, LoadingFC, openNotificationWithIcon} from "../components/api/Api";
import {useERC20Action} from "../hook/hookErc20";
import {Spin} from "antd";
import {Container} from "react-bootstrap";
import {handledErrorAction} from "../utils/handleError";
import {contractAddress} from "../utils/contract";
import Countdown from "react-countdown";
import { Form, Input, Button, Radio } from 'antd';

function* shuffle(array) {

    var i = array.length;

    while (i--) {
        yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    }

}

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span></span>;
  } else {
    return <span>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>;
  }
};

const getRandomTicket = () => {
    const ranNums = shuffle([0,1,2,3,4,5,6,7,8,9]);
    const lsTemp = []
    for (let i = 1; i < 7; i++) {
        lsTemp.push(ranNums.next().value)
    }
    return lsTemp
}




const Home = () => {
    const wallet = useWallet();
    const openBoxAction = useOpenBoxAction();
    const {approve, isApprove} = useERC20Action();
    const [isApproved, setIsApproved] = useState(false);
    const [price, setPrice] = useState(null);
    const [amount, setAmount] = useState(1);
    const [nextDraw, setNextDraw] = useState(null);
    const [loading, setLoading] = useState(false);
    const [lsTicket,setLsTicket] = useState([[1,2,3,4,5,6]])
    const {account} = useWallet();
    // useEffect(() => {
    //     openBoxAction.getSeedPrice()
    //         .then(res => {
    //             setPrice(convertBigNumBer(res))
    //         })
    //
    // }, [])
    // useEffect(()=>{
    //     setLsTicket(getRandomTicket())
    // },[])

    const BoxSingleTicket = ({callbackRemoveTicket,indexTicket,lsTicket}) => {
        const [lsNumber, setLsNumber] = useState(lsTicket[indexTicket])
        const newLsTicket = [...lsTicket]
        const onInputChange = (e,index) => {
            console.log(e.target.value)
            let currentValue = [...lsNumber]
            currentValue[index] = parseInt(e.target.value)
            setLsNumber(currentValue)
            newLsTicket[indexTicket] = currentValue
            setLsTicket(newLsTicket)
        }
        console.log(lsNumber)
        return (
            <>
            {lsNumber.map((item, index) =>
                <>
                <li>
                    <span><input onChange={(e)=>onInputChange(e,index)} value={lsNumber[index]} min={0} max={9}/></span>
                </li>

                </>
                    )}
                <li>
                    <button className="custom-button1" onClick={()=>setLsNumber(getRandomTicket())}><i className="fas fa-magic"></i>Quick
                        Pick</button>
                </li>
                <li>
                    <button className="custom-button2" onClick={()=>callbackRemoveTicket()}>Remove</button>
                </li>
            </>
        )
    }

    const BoxTicket = ({lsTicket,callbackRemoveTicket}) => {
        return (
            <>
            {lsTicket.map((item,index) =>
            <div className="col-lg-6 col-md-6 mt-1">
                <div className="single-pick">
                    <div className="header-area">
                        <h4 className="title">Pick 6 Numbers</h4>
                        <div className="buttons">
                            <a href="#" className="custom-button1"><i className="fas fa-magic"></i>Quick
                                Pick</a>
                            <a href="#" className="custom-button2"><i className="fas fa-trash-alt"></i>Clear
                                All</a>
                        </div>
                    </div>
                    <div className="body-area">
                        <ul>
                            <BoxSingleTicket lsTicket={lsTicket} callbackRemoveTicket={()=>callbackRemoveTicket()} indexTicket={index}/>
                        </ul>
                    </div>
                </div>
            </div>
            )}
        </>
        )
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
    useEffect(() => {
        if (account) {
            isApprove()
                .then(setIsApproved);
        }
    }, [account]);

    const addTicket = () => {
        const currentLsTicket = [...lsTicket]
        if (currentLsTicket.length < 6) {
            currentLsTicket.push(currentLsTicket[currentLsTicket.length - 1] + 1)
            setLsTicket(currentLsTicket)
        }
    }
    const approveFC = () => {
        approve().then(res => {
            res.wait().then(res=>{
                setIsApproved(true)
            })
        })
    }

    const openBoxFC = () => {
        setLoading(true)
        openBoxAction.buySeed(amount)
            .then(res => {
                res.wait().then(function(receipt) {
                    openNotificationWithIcon('success','Success','Transaction Success')
                    setLoading(false)
                })
                .catch(error => {
                        const message = handledErrorAction(error).message
                        openNotificationWithIcon('error','Error',message)
                        setLoading(false)
                    })
            })
            .catch(error => {
                        const message = handledErrorAction(error).message
                        openNotificationWithIcon('error','Error',message)
                        setLoading(false)
                    })
    }
    const RemoveTicket = (index) => {
        const currentLsTicket = [...lsTicket]
    }
    console.log("lsTicket",lsTicket)
    return (
        <>
        <section className="breadcrumb-area">
            <img className="lottory" src="assets/images/lottery-b-icon.png" alt=""/>
                <div className="container">
                    <div className="content">
                        <h2 className="title">
                            POWERBALL
                        </h2>
                        <ul className="breadcrumb-list extra-padding">
                            <li>
                                <a href="index.html">
                                    Home
                                </a>
                            </li>

                            <li>
                                <a href="#">Powerball</a>
                            </li>
                        </ul>
                    </div>
                </div>
        </section>
    <section className="singlelottery">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="steps">
                        <div className="left">
                            <h4>Only 3 easy steps</h4>
                        </div>
                        <div className="right">
                            <ul>
                                <li>
                                    <div className="box">
                                        <img src="assets/images/bt1.png" alt=""/>
                                            <p>1. Pick</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box">
                                        <img src="assets/images/bt2.png" alt=""/>
                                            <p>2. Play</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box">
                                        <img src="assets/images/bt3.png" alt=""/>
                                            <p>3. Win</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="time-wrapper">
                        <div className="time-counter">
                            <img src="assets/images/clock.png" alt=""/>
                                {/*<p className="time-countdown" data-countdown="01/01/2021"></p>*/}
                                <p className="time-countdown">
                            {nextDraw ?
                                <Countdown date={nextDraw} renderer={renderer}/> :null}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="pick-number-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="row justify-content-center">
                            <BoxTicket lsTicket={lsTicket} callbackRemoveTicket={(index)=>RemoveTicket(index)}/>
                        </div>
                        <div className="row">
                            {lsTicket && lsTicket.length < 5 ?
                                <>
                            <div className="col-lg-12 text-center">
                                <a className="add-ticket-btn" onClick={()=>addTicket()}><i className="fas fa-plus"></i> Add Tickets</a>
                            </div>
                                </> : null }
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="cart-summary">
                            <div className="top-area">
                                <h4 className="title">
                                    Cart Summary
                                </h4>
                                <p className="text">
                                    You've got 30% of chance to win. Shop more tickets to get more chance
                                </p>
                            </div>
                            <div className="middle-area">
                                <div className="tikit">
                                    <span className="left">Filled out Tickets</span>
                                    <span className="right">3</span>
                                </div>
                                <div className="price">
                                    <span className="left">Ticket Price
                                        <small>(8 tickets <i className="fas fa-times"></i> $4.99)</small>
                                    </span>
                                    <span className="right">$39.92</span>
                                </div>
                            </div>
                            <div className="bottom-area">
                                <div className="total-area">
                                    <span className="left">Total</span>
                                    <span className="right">$39.92</span>
                                </div>
                                <a href="#" className="custom-button2">Buy Tickets</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="frequent-number">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <div className="section-header">
                            <h2 className="title ep">
                                Most Frequent Number
                            </h2>
                            <p className="text">
                                Check Your lotto online, find all the lotto winning numbers and see
                                if you won the latest lotto jackpots
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="number-slider owl-carousel">
                            <div className="item">
                                <div className="single-number">
                                    <ul>
                                        <li>
                                            <span>1</span>
                                        </li>
                                        <li>
                                            <span>2</span>
                                        </li>
                                        <li>
                                            <span>3</span>
                                        </li>
                                        <li>
                                            <span>4</span>
                                        </li>
                                        <li>
                                            <span>5</span>
                                        </li>
                                        <li>
                                            <span>6</span>
                                        </li>
                                    </ul>
                                    <input type="text" placeholder="Try These Numbers"/>
                                </div>
                            </div>
                            <div className="item">
                                <div className="single-number">
                                    <ul>
                                        <li>
                                            <span>1</span>
                                        </li>
                                        <li>
                                            <span>2</span>
                                        </li>
                                        <li>
                                            <span>3</span>
                                        </li>
                                        <li>
                                            <span>4</span>
                                        </li>
                                        <li>
                                            <span>5</span>
                                        </li>
                                        <li>
                                            <span>6</span>
                                        </li>
                                    </ul>
                                    <input type="text" placeholder="Try These Numbers"/>
                                </div>
                            </div>
                            <div className="item">
                                <div className="single-number">
                                    <ul>
                                        <li>
                                            <span>1</span>
                                        </li>
                                        <li>
                                            <span>2</span>
                                        </li>
                                        <li>
                                            <span>3</span>
                                        </li>
                                        <li>
                                            <span>4</span>
                                        </li>
                                        <li>
                                            <span>5</span>
                                        </li>
                                        <li>
                                            <span>6</span>
                                        </li>
                                    </ul>
                                    <input type="text" placeholder="Try These Numbers"/>
                                </div>
                            </div>
                            <div className="item">
                                <div className="single-number">
                                    <ul>
                                        <li>
                                            <span>1</span>
                                        </li>
                                        <li>
                                            <span>2</span>
                                        </li>
                                        <li>
                                            <span>3</span>
                                        </li>
                                        <li>
                                            <span>4</span>
                                        </li>
                                        <li>
                                            <span>5</span>
                                        </li>
                                        <li>
                                            <span>6</span>
                                        </li>
                                    </ul>
                                    <input type="text" placeholder="Try These Numbers"/>
                                </div>
                            </div>
                            <div className="item">
                                <div className="single-number">
                                    <ul>
                                        <li>
                                            <span>1</span>
                                        </li>
                                        <li>
                                            <span>2</span>
                                        </li>
                                        <li>
                                            <span>3</span>
                                        </li>
                                        <li>
                                            <span>4</span>
                                        </li>
                                        <li>
                                            <span>5</span>
                                        </li>
                                        <li>
                                            <span>6</span>
                                        </li>
                                    </ul>
                                    <input type="text" placeholder="Try These Numbers"/>
                                </div>
                            </div>
                            <div className="item">
                                <div className="single-number">
                                    <ul>
                                        <li>
                                            <span>1</span>
                                        </li>
                                        <li>
                                            <span>2</span>
                                        </li>
                                        <li>
                                            <span>3</span>
                                        </li>
                                        <li>
                                            <span>4</span>
                                        </li>
                                        <li>
                                            <span>5</span>
                                        </li>
                                        <li>
                                            <span>6</span>
                                        </li>
                                    </ul>
                                    <input type="text" placeholder="Try These Numbers"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
    );
};

export default withRouter(Home);