import {ethers} from "ethers";
import React, {useEffect, useState} from "react";
import {Button, Modal, notification, Spin} from "antd";
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

export const BlockCurrentDetail = ({rewardMoney}) => {
    return (
        <>
            <div className={'col-12 row'}>
                <div className={'col-4'}>
                    <h2 className={'match-first-title'}>Match first 1</h2>
                    <h2 className={'match-reward'}>{rewardMoney*2/100} DLT</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                    <h2 className={'match-reward-each'}>20DLT each</h2>
                    <h2 className={'match-reward-count'}>20 Winners</h2>
                </div>
                <div className={'col-4'}>
                    <h2 className={'match-first-title'}>Match first 2</h2>
                    <h2 className={'match-reward'}>{rewardMoney*4/100} DLT</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                    <h2 className={'match-reward-each'}>20DLT each</h2>
                    <h2 className={'match-reward-count'}>20 Winners</h2>
                </div>
                <div className={'col-4'}>
                    <h2 className={'match-first-title'}>Match first 3</h2>
                    <h2 className={'match-reward'}>{rewardMoney*9/100} DLT</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                    <h2 className={'match-reward-each'}>20DLT each</h2>
                    <h2 className={'match-reward-count'}>20 Winners</h2>
                </div>
                <div className={'col-4'}>
                    <h2 className={'match-first-title'}>Match first 4</h2>
                    <h2 className={'match-reward'}>{rewardMoney*15/100} DLT</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                    <h2 className={'match-reward-each'}>20DLT each</h2>
                    <h2 className={'match-reward-count'}>20 Winners</h2>
                </div>
                <div className={'col-4'}>
                    <h2 className={'match-first-title'}>Match first 5</h2>
                    <h2 className={'match-reward'}>{rewardMoney*25/100} DLT</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                    <h2 className={'match-reward-each'}>20DLT each</h2>
                    <h2 className={'match-reward-count'}>20 Winners</h2>
                </div>
                <div className={'col-4'}>
                    <h2 className={'match-first-title'}>Match first 6</h2>
                    <h2 className={'match-reward'}>{rewardMoney*45/100} DLT</h2>
                    {/*<h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                    <h2 className={'match-reward-each'}>20DLT each</h2>
                    <h2 className={'match-reward-count'}>20 Winners</h2>
                </div>
            </div>
    </>
    )
}


export const BlockResult = () => {
    const nftAction = useNFTaction();
    const [currentDraw, setCurrentDraw] = useState(null);
    const [lastestDraw, setLastestDraw] = useState(null);
    const [lastestWinningNumber,setLastestWinningNumber] = useState(null)
    const [rewardMoney,setRewardMoney] = useState(0)
    const [selectedDate, setSelectedDate] = useState(null);
    const [totalPlayerCurrentId, setTotalPlayerCurrentId] = useState(null);

    useEffect(()=>{
        nftAction.getCurrentDraw()
            .then(res=>{
                const curId = res
                setLastestDraw(curId-1)
                setCurrentDraw(res-1)
                nftAction.returnTotalrewardId(curId-1)
                .then(res=>{
                    setRewardMoney(convertBigNumBer(res))
                    nftAction.returnTotalAddress(curId-1)
                    .then(res=>{
                        setTotalPlayerCurrentId(res.toString())
                    })
                })
                nftAction.returnNumberId(parseInt(res)-1)
                    .then(res=>{
                        let lsWinning = []
                        for (let i of res) {
                            lsWinning.push(i.toString())
                        }
                        setLastestWinningNumber(lsWinning)
                    })

            })
    },[])

    const fetchSelectedDrawResult = (value) => {
        nftAction.returnTotalrewardId(value)
        .then(res=>{
            setRewardMoney(convertBigNumBer(res))
            nftAction.returnTotalAddress(value)
            .then(res=>{
               setTotalPlayerCurrentId(res.toString())
            })
        })
        nftAction.returnNumberId(value)
            .then(res=>{
                let lsWinning = []
                for (let i of res) {
                    lsWinning.push(i.toString())
                }
                setLastestWinningNumber(lsWinning)
            })
        nftAction.returnDatetimeId(value)
            .then(res=>{
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                setSelectedDate(new Date(parseInt(res.toString())*1000).toLocaleDateString("en-US", options))
            })
    }

    const onInputRoundChange = (e) => {
        if (0 < parseInt(e.target.value) && parseInt(e.target.value) <= parseInt(lastestDraw)) {
            setCurrentDraw(e.target.value)
            fetchSelectedDrawResult(e.target.value)
        }
    }
    useEffect(()=>{
        fetchSelectedDrawResult(currentDraw)
    },[currentDraw])
    return (
        <>
            <div className="single-list">
                <div className="light-area">
                    <div className="light-area-top">
                        <div className="left">
                            <img src="assets/images/d1.png" alt=""/>
                                <h4>Round <input pattern="^[0-9]+$" inputMode="numeric" id="round-id" name="round-id"
                                                 scale="lg" className="input-number-inner" autoComplete={'off'} value={currentDraw} onChange={(e)=>onInputRoundChange(e)}/></h4>
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
                                {lastestWinningNumber && lastestWinningNumber.length > 0 ?
                                     <>
                                    {lastestWinningNumber.map((item, index) =>
                                        <span>{item}</span>
                                    )}
                                    </>
                                    :
                                    null
                                }

                            </div>
                        </div>
                    </div>
                    <BlockCurrentDetail rewardMoney={rewardMoney}/>
                </div>
                <div className="color-area">
                    <div className="top">
                        <span>Draw took place on</span>
                        <h6>{selectedDate}</h6>
                    </div>
                    <div className="top">
                        <span>Total players this round</span>
                        <h6>{totalPlayerCurrentId}</h6>
                    </div>
                    <div className="bottom">
                        <span>Est. Jackpot </span>
                        <h6><img src={'assets/images/logo-coin.png'}/> &nbsp; {rewardMoney}</h6>
                    </div>
                </div>
            </div>
        </>
    )
}


export const BlockResultYourTicket = () => {
    const nftAction = useNFTaction();
    const [currentDraw, setCurrentDraw] = useState(null);
    const [lastestDraw, setLastestDraw] = useState(null);
    const [lastestWinningNumber,setLastestWinningNumber] = useState(null)
    const [rewardMoney,setRewardMoney] = useState(0)
    const [selectedDate, setSelectedDate] = useState(null);
    const [totalPlayerCurrentId, setTotalPlayerCurrentId] = useState(null);

    useEffect(()=>{
        nftAction.getCurrentDraw()
            .then(res=>{
                const curId = res
                setLastestDraw(curId-1)
                setCurrentDraw(res-1)
                nftAction.returnTotalrewardId(curId-1)
                .then(res=>{
                    setRewardMoney(convertBigNumBer(res))
                    nftAction.returnTotalAddress(curId-1)
                    .then(res=>{
                        setTotalPlayerCurrentId(res.toString())
                    })
                })
                nftAction.returnNumberId(parseInt(res)-1)
                    .then(res=>{
                        let lsWinning = []
                        for (let i of res) {
                            lsWinning.push(i.toString())
                        }
                        setLastestWinningNumber(lsWinning)
                    })

            })
    },[])

    const fetchSelectedDrawResult = (value) => {
        nftAction.returnTotalrewardId(value)
        .then(res=>{
            setRewardMoney(convertBigNumBer(res))
            nftAction.returnTotalAddress(value)
            .then(res=>{
               setTotalPlayerCurrentId(res.toString())
            })
        })
        nftAction.returnNumberId(value)
            .then(res=>{
                let lsWinning = []
                for (let i of res) {
                    lsWinning.push(i.toString())
                }
                setLastestWinningNumber(lsWinning)
            })
        nftAction.returnDatetimeId(value)
            .then(res=>{
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                setSelectedDate(new Date(parseInt(res.toString())*1000).toLocaleDateString("en-US", options))
            })
    }

    const onInputRoundChange = (e) => {
        if (0 < parseInt(e.target.value) <= parseInt(lastestDraw)) {
            setCurrentDraw(e.target.value)
            fetchSelectedDrawResult(e.target.value)
        }

    }
    useEffect(()=>{
        fetchSelectedDrawResult(currentDraw)
    },[currentDraw])
    return (
        <>
            <div className="single-list">
                <div className="light-area">
                    <div className="light-area-top">
                        <div className="left">
                            <img src="assets/images/d1.png" alt=""/>
                                <h4>Round <input pattern="^[0-9]+$" inputMode="numeric" id="round-id" name="round-id"
                                                 scale="lg" className="input-number-inner" autoComplete={'off'} value={currentDraw} onChange={(e)=>onInputRoundChange(e)}/></h4>
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
                                {lastestWinningNumber && lastestWinningNumber.length > 0 ?
                                     <>
                                    {lastestWinningNumber.map((item, index) =>
                                        <span>{item}</span>
                                    )}
                                    </>
                                    :
                                    null
                                }

                            </div>
                        </div>
                    </div>
                    <BlockCurrentDetail rewardMoney={rewardMoney}/>
                </div>
                <div className="color-area">
                    <div className="top">
                        <span>Draw took place on</span>
                        <h6>{selectedDate}</h6>
                    </div>
                    <div className="top">
                        <span>Total players this round</span>
                        <h6>{totalPlayerCurrentId}</h6>
                    </div>
                    <div className="bottom">
                        <span>Est. Jackpot </span>
                        <h6><img src={'assets/images/logo-coin.png'}/> &nbsp; {rewardMoney}</h6>
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

export const ModalBuyTicket = ({visible,hideModal}) => {
    const wallet = useWallet();
    const {account} = useWallet();
    const {approve, isApprove} = useERC20Action();
    const [lsTicket,setLsTicket] = useState([getRandomTicket()])
    const [loading, setLoading] = useState(false)
    const buyTicketAction = useBuyTicketAction();
    const {nftContract} = useNFTaction();
    const [price, setPrice] = useState(100);
    const [isApproved, setIsApproved] = useState(false);

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
            if (e.target.value) {
            let currentValue = [...lsNumber]
            currentValue[index] = parseInt(e.target.value)
            setLsNumber(currentValue)
            newLsTicket[indexTicket] = currentValue
            setLsTicket(newLsTicket)}
        }
        return (
            <>
                <div className={lsTicket.length > 1 ? "col-lg-12 col-md-12" : "col-lg-12 col-md-12"}  key={'boxsingle' + indexTicket}>
                <div className="single-pick">
                    <div className="body-area">
                        <ul>
                            {lsNumber.map((item, index) =>
                                <div key={'abc'+index} style={{display:'inline-block'}}>
                                <li>
                                    <span><input className={'input-select-lot'} maxLength={'1'} pattern="[0-9]{1}" onChange={(e)=>onInputChange(e,index)} value={lsNumber[index]} min={0} max={9}/></span>
                                </li>

                                </div>
                            )}
                            <button className="custom-button1 ml-3" onClick={()=>setLsNumber(getRandomTicket())}><i className="fas fa-magic"></i></button>
                            {lsTicket.length > 1 ? <button className="custom-button2 ml-1" onClick={()=>callbackRemoveTicket(indexTicket)}><i className="fas fa-minus"></i></button> :null }
                            {lsTicket && lsTicket.length < 5 ?
                            <button className="custom-button2 custom-button-add-ticket ml-1" onClick={()=>addTicket()}><i className="fas fa-plus"></i></button> :null}
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
    const RemoveTicket = (index) => {
        const currentLsTicket = [...lsTicket]
        currentLsTicket.splice(index,1)
        setLsTicket(currentLsTicket)
    }
    const buyTicket = () => {
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
                    hideModal()
                })
                .catch(error => {
                        const message = handledErrorAction(error).message
                        openNotificationWithIcon('error','Error',message)
                        setLoading(false)
                        hideModal()
                    })
            })
            .catch(error => {
                const message = handledErrorAction(error).message
                openNotificationWithIcon('error','Error',message)
                setLoading(false)
                hideModal()
            })
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



    const approveFC = () => {
        approve().then(res => {
            res.wait().then(res=>{
                setIsApproved(true)
            })
        })
    }
    const handleCancel = () => {
        hideModal()
    }

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
                    <div className="col-lg-9">
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

        </Modal>
    )
}