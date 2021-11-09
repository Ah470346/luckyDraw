import {ethers} from "ethers";
import React, {useEffect, useState} from "react";
import {Button, Input, Modal, notification, Spin} from "antd";
import { Skeleton } from 'antd';
import CaretLeftOutlined from "@ant-design/icons/lib/icons/CaretLeftOutlined";
import CaretRightOutlined from "@ant-design/icons/lib/icons/CaretRightOutlined";
import {convertBigNumBer, openNotificationWithIcon} from "./api/Api";
import {useNFTaction} from "../hook/hookNFT";
import StepForwardOutlined from "@ant-design/icons/lib/icons/StepForwardOutlined";
import {handleTxHash} from "../utils/handleTxHash";
import {handledErrorAction} from "../utils/handleError";
import {useBuyTicketAction} from "../hook/hookBuyTicket";
import {useWallet} from "use-wallet";
import {useERC20Action} from "../hook/hookErc20";
import { Transition } from 'react-transition-group';


const checkerWinningNumber = (e) => {
    return e.every(v => v === "0")
}

export const BlockCurrentDetail = ({rewardMoney}) => {
    return (
        <>
            <div className={'col-12 row'}>
                <div className={'col-12 col-sm-6 col-lg-4 col-xl-4 mt-3 mb-3'}>
                    <div className={'box-detail-result-inner'}>
                    <h2 className={'match-first-title'}>Match first 1</h2>
                    <h2 className={'match-reward'}>{(rewardMoney*2/100).toFixed(3)} $</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                </div>
                </div>
                <div className={'col-12 col-sm-6 col-lg-4 col-xl-4 mt-3 mb-3'}>
                    <div className={'box-detail-result-inner'}>
                    <h2 className={'match-first-title'}>Match first 2</h2>
                    <h2 className={'match-reward'}>{(rewardMoney*4/100).toFixed(3)} $</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                </div>
                </div>
                <div className={'col-12 col-sm-6 col-lg-4 col-xl-4 mt-3 mb-3'}>
                    <div className={'box-detail-result-inner'}>
                    <h2 className={'match-first-title'}>Match first 3</h2>
                    <h2 className={'match-reward'}>{(rewardMoney*9/100).toFixed(3)} $</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                </div>
                </div>
                <div className={'col-12 col-sm-6 col-lg-4 col-xl-4 mt-3 mb-3'}>
                    <div className={'box-detail-result-inner'}>
                    <h2 className={'match-first-title'}>Match first 4</h2>
                    <h2 className={'match-reward'}>{(rewardMoney*15/100).toFixed(3)} $</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                </div>
                </div>
                <div className={'col-12 col-sm-6 col-lg-4 col-xl-4 mt-3 mb-3'}>
                    <div className={'box-detail-result-inner'}>
                    <h2 className={'match-first-title'}>Match first 5</h2>
                    <h2 className={'match-reward'}>{(rewardMoney*25/100).toFixed(3)} $</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                </div>
                </div>
                <div className={'col-12 col-sm-6 col-lg-4 col-xl-4 mt-3 mb-3'}>
                    <div className={'box-detail-result-inner'}>
                    <h2 className={'match-first-title'}>Match first 6</h2>
                    <h2 className={'match-reward'}>{(rewardMoney*45/100).toFixed(3)} $</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                </div>
                </div>
            </div>
    </>
    )
}



export const BlockDetail = ({rewardMoney,lsWinner}) => {
    return (
        <>
            <div className={'col-12 row box-detail-result'}>
                <div className={'col-12 col-sm-6 col-lg-4 col-xl-4 mt-3 mb-3'}>
                    <div className={'box-detail-result-inner'}>
                    <h2 className={'match-first-title'}>Match first 1</h2>
                    <h2 className={'match-reward'}>{(rewardMoney*2/100).toFixed(3)} $</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                    {lsWinner[0] !== '0' ?
                    <h2 className={'match-reward-each'}>{(rewardMoney*2/100/parseInt(lsWinner[0])).toFixed(3)} each</h2>:<br/> }
                    <h2 className={'match-reward-count'}>{lsWinner[0]} Winners</h2>
                    </div>
                </div>
                <div className={'col-12 col-sm-6 col-lg-4 col-xl-4 mt-3 mb-3'}>
                    <div className={'box-detail-result-inner'}>
                    <h2 className={'match-first-title'}>Match first 2</h2>
                    <h2 className={'match-reward'}>{(rewardMoney*4/100).toFixed(3)} $</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                    {lsWinner[1] !== '0' ?
                    <h2 className={'match-reward-each'}>{(rewardMoney*4/100/parseInt(lsWinner[1])).toFixed(3)} each</h2>:<br/> }
                    <h2 className={'match-reward-count'}>{lsWinner[1]} Winners</h2>
                </div>
                </div>
                <div className={'col-12 col-sm-6 col-lg-4 col-xl-4 mt-3 mb-3'}>
                    <div className={'box-detail-result-inner'}>
                    <h2 className={'match-first-title'}>Match first 3</h2>
                    <h2 className={'match-reward'}>{(rewardMoney*9/100).toFixed(3)} $</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                    {lsWinner[2] !== '0' ?
                    <h2 className={'match-reward-each'}>{(rewardMoney*9/100/parseInt(lsWinner[2])).toFixed(3)} each</h2>:<br/> }
                    <h2 className={'match-reward-count'}>{lsWinner[2]} Winners</h2>
                </div>
                </div>
                <div className={'col-12 col-sm-6 col-lg-4 col-xl-4 mt-3 mb-3'}>
                    <div className={'box-detail-result-inner'}>
                    <h2 className={'match-first-title'}>Match first 4</h2>
                    <h2 className={'match-reward'}>{(rewardMoney*15/100).toFixed(3)} $</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                    {lsWinner[3] !== '0' ?
                    <h2 className={'match-reward-each'}>{(rewardMoney*15/100/parseInt(lsWinner[3])).toFixed(3)} each</h2>:<br/> }
                    <h2 className={'match-reward-count'}>{lsWinner[3]} Winners</h2>
                </div>
                </div>
                <div className={'col-12 col-sm-6 col-lg-4 col-xl-4 mt-3 mb-3'}>
                    <div className={'box-detail-result-inner'}>
                    <h2 className={'match-first-title'}>Match first 5</h2>
                    <h2 className={'match-reward'}>{(rewardMoney*25/100).toFixed(3)} $</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                    {lsWinner[4] !== '0' ?
                    <h2 className={'match-reward-each'}>{(rewardMoney*25/100/parseInt(lsWinner[4])).toFixed(3)} each</h2>:<br/> }
                    <h2 className={'match-reward-count'}>{lsWinner[4]} Winners</h2>
                </div>
                </div>
                <div className={'col-12 col-sm-6 col-lg-4 col-xl-4 mt-3 mb-3'}>
                    <div className={'box-detail-result-inner'}>
                    <h2 className={'match-first-title'}>Match first 6</h2>
                    <h2 className={'match-reward'}>{(rewardMoney*45/100).toFixed(3)} $</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                    {lsWinner[5] !== '0' ?
                    <h2 className={'match-reward-each'}>{(rewardMoney*45/100/parseInt(lsWinner[5])).toFixed(3)} each</h2>:<br/> }
                    <h2 className={'match-reward-count'}>{lsWinner[5]} Winners</h2>
                </div>
                </div>
            </div>
    </>
    )
}


export const BlockResult = () => {
    const nftAction = useNFTaction();
    const buyTicketAction = useBuyTicketAction();
    const [currentDraw, setCurrentDraw] = useState(null);
    const [lastestDraw, setLastestDraw] = useState(null);
    const [lastestWinningNumber,setLastestWinningNumber] = useState(null)
    const [rewardMoney,setRewardMoney] = useState(0)
    const [lsWinner,setLsWinner] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [totalPlayerCurrentId, setTotalPlayerCurrentId] = useState(null);
    const wallet = useWallet()
    const account = wallet.account

    useEffect(()=>{
        if (account) {
            buyTicketAction.getCurrentDraw()
                .then(res => {
                    const curId = res
                    setLastestDraw(curId - 1)
                    setCurrentDraw(res - 1)
                    buyTicketAction.returnNumberId(parseInt(res) - 1)
                        .then(res => {
                            let lsWinning = []
                            for (let i of res[0]) {
                                lsWinning.push(i.toString())
                            }
                            setLastestWinningNumber(lsWinning)
                            setRewardMoney(convertBigNumBer(res[1]))
                            const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
                            setSelectedDate(new Date(parseInt(res[2].toString()) * 1000).toLocaleDateString("en-US", options))
                            let lsWinnerTemp = []
                            for (let i of res[4]) {
                                lsWinnerTemp.push(i.toString())
                            }
                            setLsWinner(lsWinnerTemp)

                        })
                    buyTicketAction.returnTotalAddress(curId - 1)
                        .then(res => {
                            setTotalPlayerCurrentId(res.toString())
                        })
                })
        }
    },[account])

    const fetchSelectedDrawResult = (value) => {
        buyTicketAction.returnNumberId(value)
            .then(res=>{
                let lsWinning = []
                for (let i of res[0]) {
                    lsWinning.push(i.toString())
                }
                setLastestWinningNumber(lsWinning)
                setRewardMoney(convertBigNumBer(res[1]))
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                setSelectedDate(new Date(parseInt(res[2].toString())*1000).toLocaleDateString("en-US", options))
                let lsWinnerTemp = []
                for (let i of res[4]) {
                    lsWinnerTemp.push(i.toString())
                }
                setLsWinner(lsWinnerTemp)

            })
        buyTicketAction.returnTotalAddress(value)
            .then(res=>{
                setTotalPlayerCurrentId(res.toString())
            })
    }

    const onInputRoundChange = (e) => {
        if (isNaN(e.target.value) === false) {
            if (e.nativeEvent.inputType === "deleteContentBackward" || parseInt(e.target.value) <= parseInt(lastestDraw)) {
                setCurrentDraw(e.target.value)
            }
        }
    }


    useEffect(()=>{
        if (account) {
            fetchSelectedDrawResult(currentDraw)
        }
    },[currentDraw,account])
    return (
        <>
            <div className="single-list">
                <div className="light-area">
                    <div className="light-area-top">
                        <div className="left">
                            <img src="assets/images/d1.png" alt=""/>
                                <h4>Round <input inputMode="numeric" onChange={(e)=>onInputRoundChange(e)} id="round-id" name="round-id"
                                                 scale="lg" className="input-number-inner" autoComplete={'off'} value={currentDraw} /></h4>
                        </div>
                        <div className="right">
                            {currentDraw > 1 ?
                            <span><CaretLeftOutlined style={{fontSize:'26px'}} onClick={()=>setCurrentDraw(currentDraw-1)}/></span> :
                            <span><CaretLeftOutlined style={{fontSize:'26px',color: '#777777'}}/></span>}
                            {currentDraw < lastestDraw ?
                                <>
                                <span><CaretRightOutlined style={{fontSize:'26px'}} onClick={()=>setCurrentDraw(currentDraw+1)} /></span>
                                <span><StepForwardOutlined style={{fontSize:'26px'}} onClick={()=>setCurrentDraw(lastestDraw)} /></span></>
                                :
                                <>
                                <span><CaretRightOutlined style={{fontSize:'26px',color: '#777777'}} /></span>
                                <span><StepForwardOutlined style={{fontSize:'26px',color: '#777777'}}/></span>
                                </>
                            }


                        </div>
                    </div>
                    <div className="light-area-bottom">
                        <div className="left row col-12">
                            <p className={'left col-5'}>Winning Numbers:</p>

                            <div className="numbers right col-7">
                                {lastestWinningNumber && lastestWinningNumber.length > 0 && !checkerWinningNumber(lastestWinningNumber) ?
                                     <>
                                    {lastestWinningNumber.map((item, index) =>
                                        <span key={'wininingnumber' + index}>{item}</span>
                                    )}
                                    </>
                                    :
                                    <Skeleton active paragraph={{ rows: 0 }}/>
                                }

                            </div>
                        </div>
                    </div>
                    {lsWinner.length > 0 ?
                    <BlockDetail rewardMoney={rewardMoney} lsWinner={lsWinner}/>:<Skeleton active paragraph={{ rows: 6 }}/>}
                </div>
                <div className="color-area">
                    <div className="top">
                        <span>Draw took place on</span>
                        <h6>{selectedDate}</h6>
                    </div>
                    <div className="bottom">
                        <span>Total players this round</span>
                        <h6>{totalPlayerCurrentId}</h6>
                        <span>Est. Jackpot </span>
                        <h6><img src={'assets/images/logo-coin.png'}/> &nbsp; ~ {rewardMoney}</h6>
                    </div>
                </div>
            </div>
        </>
    )
}


export const BlockResultYourTicket = ({Reload}) => {
    const nftAction = useNFTaction();
    const buyTicketAction = useBuyTicketAction();
    const [selectedDraw, setSelectedDraw] = useState(null);
    const [lastestDraw, setLastestDraw] = useState(null);
    const [lastestWinningNumber,setLastestWinningNumber] = useState(null)
    const [rewardMoney,setRewardMoney] = useState(0)
    const [selectedDate, setSelectedDate] = useState(null);
    const [totalPlayerCurrentId, setTotalPlayerCurrentId] = useState(null);
    const [loadingResult,setLoadingResult] = useState(false)
    const {account} = useWallet();
    const [result,setResult] = useState([])

    useEffect(()=>{
        if (account) {
            buyTicketAction.getHistoryList(account)
            .then(res=>{
                if (res[0].length > 0 && res[1].length > 0) {
                    const lastRound = res[0][res[0].length - 1].toString()
                    setLastestDraw(parseInt(lastRound))
                    setSelectedDraw(parseInt(lastRound))
                }
            })
        }
    },[account,Reload])

    useEffect(()=>{
        if (account) {
            buyTicketAction.getCurrentResult(account, parseInt(selectedDraw))
                .then(res => {
                    let lsResult = []
                    for (let i of res[0]) {
                        let lsTemp = []
                        for (let j of i) {
                            lsTemp.push(j.toString())
                        }
                        lsResult.push(lsTemp)
                    }
                    setResult(lsResult)
                })
        }
    },[selectedDraw,account,Reload])

    const BoxItemTicket = ({item,index,winningNumber})=>{
            const checkWinTicket = (item,winningNumber) => {
                let isWinner = false
                 if (!checkerWinningNumber(lastestWinningNumber)) {
                    if (item[0] === winningNumber[0]) {
                        isWinner = true
                    }
                    return isWinner
                }
                 else {return false}

            }
            const checkHightLight = (item,winningNumber) => {
                let lsCheck = []
                for (let i in item) {
                    if (item[i] === winningNumber[i] && lsCheck.indexOf(false) === -1) {
                        lsCheck.push(true)
                    }
                    else {
                        lsCheck.push(false)
                    }
                }
                return lsCheck
            }
        return (
             <div key={index + 'ticketnumber'} className={'col-lg-6 col-sm-12'}>
                    {item.map((itemTicket,indexTicket)=>
                    <span key={indexTicket + 'ticketnumber' + itemTicket} className={'mb-3'} style={checkWinTicket(item,winningNumber) && checkHightLight(item,winningNumber)[indexTicket] && winningNumber[indexTicket] === itemTicket ? {background:'#ff0000'} : null}>{itemTicket}</span>
                    )}
                </div>)
    }

    const fetchSelectedDrawResult = (value) => {
        buyTicketAction.returnNumberId(value)
            .then(res=>{
                let lsWinning = []
                for (let i of res[0]) {
                    lsWinning.push(i.toString())
                }
                setLastestWinningNumber(lsWinning)
                setRewardMoney(convertBigNumBer(res[1]))
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                setSelectedDate(new Date(parseInt(res[2].toString())*1000).toLocaleDateString("en-US", options))
            })
        buyTicketAction.returnTotalAddress(value)
            .then(res=>{
                setTotalPlayerCurrentId(res.toString())
            })
        buyTicketAction.getCurrentResult(account,parseInt(value))
            .then(res=>{
                let lsResult = []
                for (let i of res[0]) {
                    let lsTemp = []
                    for (let j of i) {
                        lsTemp.push(j.toString())
                    }
                    lsResult.push(lsTemp)
                }
                setResult(lsResult)
                setLoadingResult(false)
            })
    }

    // const onInputRoundChange = (e) => {
    //     if (e.charCode >= 48 && e.charCode <= 57) {
    //     if (0 < parseInt(e.key) && parseInt(e.key) <= parseInt(lastestDraw)) {
    //         setSelectedDraw(e.key)
    //         fetchSelectedDrawResult(e.key)
    //     }
    //
    // }

    const onInputRoundChange = (e) => {
        if (isNaN(e.target.value) === false) {
            if (e.nativeEvent.inputType === "deleteContentBackward" || parseInt(e.target.value) <= parseInt(lastestDraw)) {
                setSelectedDraw(e.target.value)
            }
        }
    }
    useEffect(()=>{
        if (account) {
            setLoadingResult(true)
            fetchSelectedDrawResult(selectedDraw)
        }
    },[selectedDraw,account])
    return (
        <>
            <div className="single-list">
                <div className="light-area">
                    <div className="light-area-top">
                        <div className="left">
                            <img src="assets/images/d1.png" alt=""/>
                                <h4>Round <input pattern="[0-9]{1}" inputMode="numeric" id="round-id" name="round-id" onChange={e=>onInputRoundChange(e)}
                                                 scale="lg" className="input-number-inner" autoComplete={'off'} value={selectedDraw||0}/></h4>
                        </div>
                        <div className="right">
                            {selectedDraw > 1 ?
                            <span><CaretLeftOutlined style={{fontSize:'26px'}} onClick={()=>setSelectedDraw(selectedDraw-1)}/></span> :
                            <span><CaretLeftOutlined style={{fontSize:'26px',color: '#777777'}}/></span>}
                            {selectedDraw < lastestDraw ?
                                <>
                                <span><CaretRightOutlined style={{fontSize:'26px'}} onClick={()=>setSelectedDraw(selectedDraw+1)} /></span>
                                <span><StepForwardOutlined style={{fontSize:'26px'}} onClick={()=>setSelectedDraw(lastestDraw)} /></span></>
                                :
                                <>
                                <span><CaretRightOutlined style={{fontSize:'26px',color: '#777777'}} /></span>
                                <span><StepForwardOutlined style={{fontSize:'26px',color: '#777777'}}/></span>
                                </>
                            }


                        </div>
                    </div>
                    {selectedDraw <= lastestDraw ?
                    <div className="light-area-bottom">

                        <div className="left row col-12">
                            <p className={'left col-5 col-sm-12'}>Winning Numbers</p>

                            <div className="numbers right col-7 col-sm-12">
                                {lastestWinningNumber && lastestWinningNumber.length > 0 && !checkerWinningNumber(lastestWinningNumber)?
                                     <>
                                    {lastestWinningNumber.map((item, index) =>
                                        <span key={index}>{item}</span>
                                    )}
                                    </>
                                    :
                                    null
                                }

                            </div>
                        </div>
                    </div>:null}
                    <div className="light-area-bottom">
                        <div className="left col-12 pr-0 pl-0">
                            <div className="numbers right row col-12">
                                {lastestWinningNumber && selectedDraw <= lastestDraw ?
                                <>
                                    {!loadingResult ?
                                    <>
                                        {result.length > 0 ?
                                            <>
                                    {result.map((item,index)=>

                                    <BoxItemTicket item={item} index={index} winningNumber={lastestWinningNumber} key={index+item}/>)

                                    }</> :
                                            <div style={{height:50}}></div>
                                        }

                                    </>
                                        :
                                        <Skeleton active />}
                                </>
                                :
                                    null

                                }
                            </div>
                        </div>
                    </div>

                </div>
                <div className="color-area">
                    <div className="top">
                        {selectedDraw < lastestDraw ?
                            <>
                        <span>Draw took place on</span>
                        <h6>{selectedDate}</h6></>:null }
                    </div>
                    <div className="bottom">
                        <span>Total your ticket this round</span>
                        <h6>{result.length}</h6>
                        {/*<span>Est. Jackpot </span>*/}
                        {/*<h6><img src={'assets/images/logo-coin.png'}/> &nbsp; {rewardMoney}</h6>*/}
                    </div>
                </div>
            </div>
        </>
    )
}




const getRandomTicket = () => {
    const ranNums = shuffle([0,1,2,3,4,5,6,7,8,9]);
    const lsTemp = []
    for (let i = 1; i < 7; i++) {
        lsTemp.push(ranNums.next().value)
    }
    return lsTemp
}
function* shuffle(array) {

    var i = array.length;

    while (i--) {
        yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    }

}

export const ModalBuyTicket = ({visible,hideModal,fetchNewUserTicket,setReload,Reload}) => {
    const {account} = useWallet();
    const {approve, isApprove} = useERC20Action();
    const [lsTicket,setLsTicket] = useState([getRandomTicket()])
    const [loading, setLoading] = useState(false);
    const [isLoadingGift, setLoadingGift] = useState(false);
    const [loadingApprove, setLoadingApprove] = useState(false);
    const buyTicketAction = useBuyTicketAction();
    const {nftContract} = useNFTaction();
    const [price, setPrice] = useState(100);
    const [isApproved, setIsApproved] = useState(false);
    const [isGift, setIsgift] = useState(false);
    const [addressTo, setAddressTo] = useState('');

    const addTicket = () => {
        const currentLsTicket = [...lsTicket]
        if (currentLsTicket.length < 6) {
            currentLsTicket.push(getRandomTicket())
            setLsTicket(currentLsTicket)
        }
    }
    const BoxSingleTicket = ({callbackRemoveTicket,indexTicket,lsTicket}) => {
        const [lsNumber, setLsNumber] = useState(lsTicket[indexTicket])
        const newLsTicket = [...lsTicket]
        const onInputChange = (e,index) => {
            if (e.charCode >= 48 && e.charCode <= 57) {
                let currentValue = [...lsNumber]
                currentValue[index] = e.charCode - 48
                setLsNumber(currentValue)
                newLsTicket[indexTicket] = currentValue
                setLsTicket(newLsTicket)
            }
            else {
                console.log("fail")
            }
        }
        const onQuickPick = () =>{
            const newLsNumber = getRandomTicket()
            setLsNumber(newLsNumber)
            const newLsTicket1 = [...lsTicket]
            newLsTicket1[indexTicket] = newLsNumber
            setLsTicket(newLsTicket1)
        }
        return (
            <>
                <div className={lsTicket.length > 1 ? "col-lg-12 col-md-12" : "col-lg-12 col-md-12"}  key={'boxsingle' + indexTicket}>
                <div className="single-pick">
                    <div className="body-area">
                        <ul style={{marginBottom:'0px'}}>
                            {lsNumber.map((item, index) =>
                                <div key={'abc'+index} style={{display:'inline-block'}}>
                                <li>
                                    <span><input className={'input-select-lot'} maxLength={'1'} pattern="[0-9]{1}" onKeyPress={e => onInputChange(e, index) } value={lsNumber[index]} min={0} max={9}/></span>
                                </li>

                                </div>
                            )}
                            <button className="custom-button1 ml-3" style={{fontSize:'30px'}} onClick={()=>onQuickPick()}><i className="fas fa-magic"></i></button>
                            {lsTicket.length > 1 ? <button className="custom-button2 ml-1" style={{fontSize:'30px'}} onClick={()=>callbackRemoveTicket(indexTicket)}><i className="fas fa-minus"></i></button> :null }
                            {lsTicket && lsTicket.length < 5 ?
                            <button className="custom-button2 custom-button-add-ticket ml-1" style={{fontSize:'30px'}} onClick={()=>addTicket()}><i className="fas fa-plus"></i></button> :null}
                        </ul>
                    </div>
                </div>
            </div>
            </>
        )
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
    const RemoveTicket = (index) => {
        const currentLsTicket = [...lsTicket]
        currentLsTicket.splice(index,1)
        setLsTicket(currentLsTicket)
    }
    const buyTicket = (address) => {
        if (isGift) {
            setLoadingGift(true)
        }
        else {
            setLoading(true)
        }
        buyTicketAction.buyTicket(lsTicket,address)
            .then(res => {
                console.log(res)
                res.wait().then(result => {
                    console.log(result)
                    let e = handleTxHash(result, account, nftContract)
                    console.log("result",e)
                    if (isGift) {
                        setLoadingGift(false)
                        setIsgift(false)
                    }
                    else {
                        setLoading(false)
                    }
                    setLsTicket([getRandomTicket()])
                    openNotificationWithIcon('success','Success','Transaction Success')
                    hideModal()
                    setReload(Reload+1)
                    setAddressTo('')
                    fetchNewUserTicket()
                })
                .catch(error => {
                        const message = handledErrorAction(error).message
                        openNotificationWithIcon('error','Error',message)
                        if (isGift) {
                        setLoadingGift(false)
                        setIsgift(false)
                        }
                        else {
                            setLoading(false)
                        }
                        hideModal()
                    })
            })
            .catch(error => {
                const message = handledErrorAction(error).message
                openNotificationWithIcon('error','Error',message)
                if (isGift) {
                    setLoadingGift(false)
                    setIsgift(false)
                }
                else {
                    setLoading(false)
                }
                hideModal()
            })
    }


    useEffect(()=>{
        buyTicketAction.getTicketPrice()
        .then(res => {
            setPrice(convertBigNumBer(res))
        })
    },[])
    useEffect(() => {
        if (account) {
            isApprove()
                .then(setIsApproved);
        }
    }, [account]);

    const onGift =()=>{

    }
    const approveFC = () => {
        setLoadingApprove(true)
        approve().then(res => {
            res.wait().then(res=>{
                setIsApproved(true)
                setLoadingApprove(false)
            })
            .catch(err => {
                const message = handledErrorAction(err).message
                openNotificationWithIcon('error','Error',message)
                setLoadingApprove(false)
            })
        })
            .catch(err => {
                const message = handledErrorAction(err).message
                openNotificationWithIcon('error','Error',message)
                setLoadingApprove(false)
            })
    }
    const handleCancel = () => {
        hideModal()
        setIsgift(false)
        setAddressTo('')
        setLsTicket([getRandomTicket()])
    }

    const duration = 300;

    const defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,
        visibility: 'hidden',
        opacity:0,
        height: '0px',
        marginTop:'10px'
    }

    const transitionStyles = {
        entering: {opacity:0, visibility: 'visible',height: '0px'},
        entered:  {opacity:1, visibility: 'visible',height: '50px' },
        // exiting:  { opacity: 0,transform: `scale(0)` },
        // exited:  { opacity: 0 ,transform: `scale(0)`},
    };

    return (
        <Modal
          visible={visible}
          title="Buy Ticket"
          width={1000}
          centered
          onCancel={handleCancel}
          footer={false}
        >
        <div className="pick-number-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="row justify-content-center">
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
                    <div className="col-lg-4">
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
                                <div style={{marginTop: '20px'}}>
                                    <Spin spinning={loading||loadingApprove}>
                                        <button className="custom-button2 btn-top" style={{width:'100%',height:'100%',marginTop:0}} onClick={()=>{if(isApproved){
                                            return buyTicket(account)
                                            }
                                            return approveFC()
                                        }}>{
                                            isApproved ?
                                                "Buy Tickets" :
                                                "Approve"
                                        }</button>
                                    </Spin>
                                    {isApproved &&
                                        <div style={{marginTop: '20px'}}>
                                            <Spin spinning={isLoadingGift} style={{marginTop: '20px'}}>
                                                {!isGift ?
                                                    <button className="custom-button2 btn-top"
                                                            style={{width: '100%', height: '100%', marginTop: 0}}
                                                            onClick={() => setIsgift(true)}>
                                                        Gift
                                                    </button>:
                                                    <button className="custom-button2 btn-top"
                                                            style={{width: '100%', height: '100%', marginTop: 0}}
                                                            onClick={() => buyTicket(addressTo)}>
                                                        Send
                                                    </button>
                                                }
                                            </Spin>
                                                <Transition in={isGift} timeout={duration}>
                                                    {state => (
                                                    <Input style={{
                                                        ...defaultStyle,
                                                        ...transitionStyles[state]
                                                    }} value={addressTo} type={"text"} onChange={(e)=>setAddressTo(e.target.value)}/>
                                                    )}
                                                </Transition>

                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </Modal>
    )
}