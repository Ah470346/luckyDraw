import React, {useEffect, useState} from 'react';
import 'react-notifications/lib/notifications.css';
import {withRouter} from 'react-router';
import {useWallet} from "use-wallet";
import {useBuyTicketAction} from "../hook/hookBuyTicket";
import {convertBigNumBer} from "../components/api/Api";
import {useERC20Action} from "../hook/hookErc20";
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
    const nftAction = useNFTaction();
    const {approve, isApprove} = useERC20Action();
    const [isApproved, setIsApproved] = useState(false);
    const [nextDraw, setNextDraw] = useState(null);
    const [currentDraw, setCurrentDraw] = useState(null);
    const [maxDraw, setMaxDraw] = useState(null);
    const [selectedDraw, setSelectedDraw] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [totalPlayerCurrentId, setTotalPlayerCurrentId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [result,setResult] = useState([])
    const [winningNumber,setWiningNumber] = useState(['?','?','?','?','?','?'])
    const [rewardMoney,setRewardMoney] = useState(0)
    const [rewardMoneyForSelectedId,setRewardMoneyForSelectedId] = useState(0)
    const {account} = useWallet();
    // useEffect(() => {
    //     buyTicketAction.getTicketPrice()
    //         .then(res => {
    //             setPrice(convertBigNumBer(res))
    //         })
    //
    // }, [])
    const toggleDetail =()=>{
        const currentDetail = isShowDetail
        setIsShowDetail(!currentDetail)
    }

    useEffect(()=>{
        nftAction.getCurrentDraw()
            .then(res=>{
                const curId = res
                setCurrentDraw(res-1)
                setMaxDraw(res-1)
                nftAction.returnTotalrewardId(curId-1)
                .then(res=>{
                    setRewardMoney(convertBigNumBer(res))
                    nftAction.returnTotalAddress(curId-1)
                    .then(res=>{
                        console.log(res)
                        setTotalPlayerCurrentId(res.toString())
                    })
                })
                nftAction.returnNumberId(parseInt(res)-1)
                    .then(res=>{
                        console.log(res)
                        let lsWinning = []
                        for (let i of res) {
                            lsWinning.push(i.toString())
                        }
                        setWiningNumber(lsWinning)
                    })

            })
    },[])

    useEffect(()=>{
        nftAction.returnTotalrewardId(currentDraw)
            .then(res=>{
                setRewardMoney(convertBigNumBer(res))
                nftAction.returnTotalAddress(currentDraw)
                .then(res=>{
                    console.log(res)
                    setTotalPlayerCurrentId(res.toString())
                })
            })
            nftAction.returnNumberId(currentDraw)
                .then(res=>{
                    console.log(res)
                    let lsWinning = []
                    for (let i of res) {
                        lsWinning.push(i.toString())
                    }
                    setWiningNumber(lsWinning)
                })

    },[currentDraw])
    useEffect(()=>{
        nftAction.getCurrentResult(account,parseInt(selectedDraw))
            .then(res=>{
                let lsResult = []
                for (let i of res) {
                    let lsTemp = []
                    for (let j of i) {
                        lsTemp.push(j.toString())
                    }
                    lsResult.push(lsTemp)
                }
                setResult(lsResult)
            })
        nftAction.returnTotalrewardId(selectedDraw)
            .then(res => {
                console.log(res)
                setRewardMoneyForSelectedId(convertBigNumBer(res))
            })
        nftAction.returnDatetimeId(selectedDraw)
            .then(res=>{
                console.log(res.toString())
                setSelectedDate(new Date(parseInt(res.toString())*1000).toLocaleDateString())
            })
    },[selectedDraw,account])




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
                                <a href="/">
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
            <section className="results">
                {/*<div className="top-image">*/}
                {/*    <div className="container">*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-lg-12">*/}
                {/*                <div className="image">*/}
                {/*                    <img src="assets/images/result.jpg" alt=""/>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="check-number result-page">*/}
                {/*    <div className="container">*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-lg-4 col-md-6">*/}
                {/*                <div className="check-box">*/}
                {/*                    <h4 className="title">1. Select a Game</h4>*/}
                {/*                    <div className="form-area">*/}
                {/*                        <select>*/}
                {/*                            <option value="#">Power Ball</option>*/}
                {/*                            <option value="#">Megamillions</option>*/}
                {/*                            <option value="#">Euromillions</option>*/}
                {/*                        </select>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-4 col-md-6">*/}
                {/*                <div className="check-box">*/}
                {/*                    <h4 className="title">2. Pick a Date</h4>*/}
                {/*                    <div className="form-area">*/}
                {/*                        <input type="date"/>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-4 col-md-6">*/}
                {/*                <div className="check-box">*/}
                {/*                    <h4 className="title">3. Enter Your Number</h4>*/}
                {/*                    <div className="form-area input-round-wrapper">*/}
                {/*                        <input type="text" className="input-round"/>*/}
                {/*                            <input type="text" className="input-round"/>*/}
                {/*                                <input type="text" className="input-round"/>*/}
                {/*                                    <input type="text" className="input-round"/>*/}
                {/*                                        <input type="text" className="input-round"/>*/}
                {/*                                            <input type="text" className="input-round"/>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="lottery-result result-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="result-list">
                                    <div className="single-list" style={{borderBottom:'1px solid #e0e0e0'}}>
                                        <div className="light-area">
                                            <div className="light-area-top">
                                                <div className="left">
                                                    <img src="assets/images/d1.png" alt=""/>
                                                    <div className="col-lg-3 col-md-6">
                                                        <div className="form-area input-round-wrapper">
                                                            <input type="text" className="input-round" value={currentDraw} onChange={e=>setCurrentDraw(e.target.value)}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="right">
                                                    <span>Draw took place on</span>
                                                    <h6>Saturday April 20, 2020</h6>
                                                </div>
                                            </div>
                                            <div className="light-area-bottom">
                                                <div className="left">
                                                    {winningNumber.length  >0 ?
                                                        <>
                                                    <p>Winning Numbers:</p>
                                                    <div className="numbers">
                                                    {winningNumber.map((item,index)=>
                                                        <span>{item}</span>
                                                        )}
                                                    </div>
                                                    </>
                                                     :null
                                                    }
                                                </div>
                                                <div className="right">
                                                    <span>Est. Jackpot</span>
                                                    <h6><img src={'assets/images/logo-coin.png'}/> {rewardMoney}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="color-area">
                                            <div className="top">
                                                <span>Next Draw</span>
                                                <h6>Wed, Oct 28, 2020</h6>
                                            </div>
                                            <div className="bottom">
                                                <span>Est. Jackpot </span>
                                                <h6><img src={'assets/images/logo-coin.png'}/>116 M Win BTC</h6>
                                            </div>
                                        </div>
                                    </div>
                                    {isShowDetail ?
                                    <div className={'col-lg-12 box-details-inner'}>
                                        <div className={'row'} style={{padding:'10px'}}>
                                        <div className={'col-3 left-detail'}>
                                            <div>
                                               <span className={'prize-pot'}>Prize pot</span>
                                                <h6 className={'match-first-title totalPot'}>~ {rewardMoney} DLT</h6>
                                            </div>
                                            <div>
                                                <span className={'match-reward-sub'}>Total players this round : {totalPlayerCurrentId}</span>
                                            </div>
                                        </div>
                                        <div className={'col-9 right-detail row'}>
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
                                            {/*<div className={'col-3'}>*/}
                                            {/*    <h2 className={'match-first-title'}>Burn</h2>*/}
                                            {/*    <h2 className={'match-reward'}>219 DLT</h2>*/}
                                            {/*    <h2 className={'match-reward-sub'}>~ 1000$</h2>*/}
                                            {/*    <h2 className={'match-reward-each'}>20DLT each</h2>*/}
                                            {/*    <h2 className={'match-reward-count'}>20 Winners</h2>*/}
                                            {/*</div>*/}
                                        </div>
                                        </div>
                                    </div>
                                        :null}
                                    <div className="details-box">
                                        <div className="details">
                                            <button className="detail-btn"
                                                    aria-label="Hide or show expandable content" scale="md" onClick={()=>toggleDetail()}>

                                                {isShowDetail ?
                                                    <>
                                                    Hide
                                                    <svg viewBox="0 0 24 24" color="primary" width="20px"
                                                     xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM flwtrA">
                                                    <path
                                                        d="M8.11997 14.7101L12 10.8301L15.88 14.7101C16.27 15.1001 16.9 15.1001 17.29 14.7101C17.68 14.3201 17.68 13.6901 17.29 13.3001L12.7 8.7101C12.31 8.3201 11.68 8.3201 11.29 8.7101L6.69997 13.3001C6.30997 13.6901 6.30997 14.3201 6.69997 14.7101C7.08997 15.0901 7.72997 15.1001 8.11997 14.7101Z"></path>
                                                </svg>
                                                    </>:
                                                    <>
                                                    Detail
                                                <svg viewBox="0 0 24 24" color="primary" width="20px"
                                                     xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM flwtrA">
                                                    <path
                                                        d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path>
                                                </svg>
                                                    </>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="result-list mt-5">
                                    <h1>Your ticket</h1>
                                    <div className="single-list" style={{borderBottom:'1px solid #e0e0e0'}}>
                                        <div className="light-area">
                                            <div className="light-area-top">
                                                <div className="left">
                                                    <img src="assets/images/d2.png" alt=""/>
                                                    <div className="col-lg-3 col-md-6">
                                                        <div className="form-area input-round-wrapper">
                                                            <input type="text" className="input-round" value={selectedDraw} onChange={e=>setSelectedDraw(e.target.value)}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="right">
                                                    <span>Draw took place on</span>
                                                    <h6>{selectedDate}</h6>
                                                </div>
                                            </div>
                                            <div className="light-area-bottom">
                                                <div className="left">
                                                    {result.length  >0 ?
                                                        <>
                                                    <p>Your Numbers:</p>
                                                    {result.map((item,index)=>
                                                        <>
                                                        <div className="numbers mb-3"  style={{borderBottom:'solid 1px #777777'}}>
                                                            {item.map((itemTicket,indexTicket)=>
                                                                <span>{itemTicket}</span>
                                                                )}
                                                        </div>
                                                        </>)
                                                    }
                                                    </>
                                                     :null
                                                    }
                                                </div>
                                                <div className="right">
                                                    <span>Est. Jackpot</span>
                                                    <h6>{rewardMoneyForSelectedId} Win DLT</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="color-area">
                                            <div className="top">
                                                <span>Next Draw</span>
                                                <h6>Wed, Oct 28, 2020</h6>
                                            </div>
                                            <div className="bottom">
                                                <span>Est. Jackpot </span>
                                                <h6>$116 M Win BTC</h6>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </>
    )
};

export default withRouter(Home);