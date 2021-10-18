import {ethers} from "ethers";
import React from "react";
import {notification} from "antd";
import { Skeleton } from 'antd';

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


export const BlockResult = ({winningNumber}) => {



    return (
        <>
            <div className="single-list">
                <div className="light-area">
                    <div className="light-area-top">
                        <div className="left">
                            <img src="assets/images/d1.png" alt=""/>
                                <h4>Powerball</h4>
                        </div>
                        <div className="right">
                            <span>Draw took place on</span>
                            <h6>Saturday April 20, 2020</h6>
                        </div>
                    </div>
                    <div className="light-area-bottom">
                        <div className="left row col-12">
                            <p className={'left col-5'}>Winning Numbers:</p>

                            <div className="numbers right col-7">
                                {winningNumber && winningNumber.length > 0 ?
                                     <>
                                    {winningNumber.map((item, index) =>
                                        <span>{item}</span>
                                    )}
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
                        <span>Next Draw</span>
                        <h6>Wed, Oct 28, 2020</h6>
                    </div>
                    <div className="bottom">
                        <span>Est. Jackpot </span>
                        <h6>$116 M Win BTC</h6>
                    </div>
                </div>
            </div>
        </>
    )
}