import React, {useEffect, useState} from 'react';
import 'react-notifications/lib/notifications.css';
import {withRouter} from 'react-router';
import {useWallet} from "use-wallet";
import {useBuyTicketAction} from "../hook/hookBuyTicket";
import {convertBigNumBer, LoadingFC, openNotificationWithIcon} from "../components/api/Api";
import {useERC20Action} from "../hook/hookErc20";
import {Spin} from "antd";
import {Container} from "react-bootstrap";
import {handledErrorAction} from "../utils/handleError";
import {contractAddress} from "../utils/contract";
import Countdown from "react-countdown";
import { Form, Input, Button, Radio } from 'antd';
import {useNFTcontract} from "../hook/hookContract";
import {handleTxHash} from "../utils/handleTxHash";
import {useNFTaction} from "../hook/hookNFT";

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
    const buyTicketAction = useBuyTicketAction();
    const {approve, isApprove} = useERC20Action();
    const {nftContract} = useNFTaction();
    const [isApproved, setIsApproved] = useState(false);
    const [price, setPrice] = useState(100);
    const [amount, setAmount] = useState(1);
    const [nextDraw, setNextDraw] = useState(null);
    const [loading, setLoading] = useState(false);
    const [lsTicket,setLsTicket] = useState([getRandomTicket()])
    const {account} = useWallet();
    useEffect(() => {
        buyTicketAction.getTicketPrice()
            .then(res => {
                setPrice(convertBigNumBer(res))
            })

    }, [])
    // useEffect(()=>{
    //     setLsTicket(getRandomTicket())
    // },[])

    const BoxSingleTicket = ({callbackRemoveTicket,indexTicket,lsTicket}) => {
        const [lsNumber, setLsNumber] = useState(lsTicket[indexTicket])
        const newLsTicket = [...lsTicket]
        const onInputChange = (e,index) => {
            if (e.target.value) {
            let currentValue = [...lsNumber]
            currentValue[index] = parseInt(e.target.value)
            setLsNumber(currentValue)
            newLsTicket[indexTicket] = currentValue
            setLsTicket(newLsTicket)}
        }
        return (
            <>
                <div className={lsTicket.length > 1 ? "col-lg-6 col-md-6 mb-5" : "col-lg-12 col-md-12 mb-5"}  key={'boxsingle' + indexTicket}>
                <div className="single-pick">
                    <div className="header-area">
                        <h4 className="title">Pick 6 Numbers</h4>
                        <div className="buttons">
                            <button className="custom-button1" onClick={()=>setLsNumber(getRandomTicket())}><i className="fas fa-magic"></i>Quick
                            Pick</button>
                            {lsTicket.length > 1 ? <button className="custom-button2" onClick={()=>callbackRemoveTicket(indexTicket)}>Remove</button> :null }
                            {lsTicket && lsTicket.length < 5 ?
                            <button className="custom-button2 custom-button-add-ticket" onClick={()=>addTicket()}><i className="fas fa-plus"></i> Add Tickets</button> :null}
                        </div>
                    </div>
                    <div className="body-area">
                        <ul>
            {lsNumber.map((item, index) =>
                <div key={'abc'+index} style={{display:'inline-block'}}>
                <li>
                    <span><input className={'input-select-lot'} maxLength={'1'} pattern="[0-9]{1}" onChange={(e)=>onInputChange(e,index)} value={lsNumber[index]} min={0} max={9}/></span>
                </li>

                </div>
                    )}
                    </ul>
                    </div>
                </div>
            </div>
            </>
        )
    }
    const container = document.getElementsByClassName('input-select-lot');
      for (let i = 0;i < container.length; i++) {
          container[i].addEventListener('keyup',function (e) {
              if (['0','1','2','3','4','5','6','7','8','9'].includes(e.key)){
              this.value = e.key}
          })
      }
    const BoxTicket = ({lsTicket,callbackRemoveTicket}) => {
        return (
            <>
            {lsTicket.map((item,index) =>

                <BoxSingleTicket lsTicket={lsTicket} callbackRemoveTicket={(indexTicket)=>callbackRemoveTicket(indexTicket)} indexTicket={index} key={'box' + index}/>

            )}
        </>
        )
    }
      useEffect(()=> {
          const container = document.getElementsByClassName('input-select-lot');
          for (let i = 0;i < container.length; i++) {
              container[i].addEventListener('keyup',function (e) {
              if (['0','1','2','3','4','5','6','7','8','9'].includes(e.key)){
                this.value = e.key}
              })
          }
      },[lsTicket])
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
            currentLsTicket.push(getRandomTicket())
            setLsTicket(currentLsTicket)
        }
    }
    const buyTicket = () => {
        console.log(lsTicket)
        setLoading(true)
        buyTicketAction.buyTicket(lsTicket)
            .then(res => {
                console.log(res)
                res.wait().then(result => {
                    console.log(result)
                    let e = handleTxHash(result, account, nftContract)
                    console.log("result",e)
                    setLoading(false)
                    setLsTicket([['?','?','?','?','?','?']])
                    openNotificationWithIcon('success','Success','Transaction Success')
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

    const approveFC = () => {
        approve().then(res => {
            res.wait().then(res=>{
                setIsApproved(true)
            })
        })
    }

    const openBoxFC = () => {
        setLoading(true)
        buyTicketAction.buySeed(amount)
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
        currentLsTicket.splice(index,1)
        setLsTicket(currentLsTicket)
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
                        <div className="row justify-content-center" id={'test'}>
                            <BoxTicket lsTicket={lsTicket} callbackRemoveTicket={(index)=>RemoveTicket(index)}/>
                        </div>
                        {/*<div className="row">*/}
                        {/*    {lsTicket && lsTicket.length < 5 ?*/}
                        {/*        <>*/}
                        {/*    <div className="col-lg-12 text-center">*/}
                        {/*        <a className="add-ticket-btn" onClick={()=>addTicket()}><i className="fas fa-plus"></i> Add Tickets</a>*/}
                        {/*    </div>*/}
                        {/*        </> : null }*/}
                        {/*</div>*/}
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
                                    <span className="right">{lsTicket.length}</span>
                                </div>
                                <div className="price">
                                    <span className="left">Ticket Price
                                        <small>({lsTicket.length} tickets <i className="fas fa-times"></i> ${price})</small>
                                    </span>
                                    <span className="right">${lsTicket.length*price}</span>
                                </div>
                            </div>
                            <div className="bottom-area">
                                <div className="total-area">
                                    <span className="left">Total</span>
                                    <span className="right">${lsTicket.length*price}</span>
                                </div>
                                <button className="custom-button2" onClick={()=>{if(isApproved){
                                                        return buyTicket()
                                                    }
                                                    return approveFC()
                                                }}>{
                                                    isApproved ?
                                                        <Spin spinning={loading}>Buy Tickets</Spin> :
                                                        "Approve"
                                                }</button>
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