import React, {useEffect, useState} from 'react';
import 'react-notifications/lib/notifications.css';
import {withRouter} from 'react-router';
import {Container} from "react-bootstrap";
import {Col, List, Modal, Row, Spin} from "antd";
import Slider from "react-slick";
import {useWallet} from "use-wallet";
import {useNFTaction} from "../hook/hookNFT";
import {ethers} from "ethers";
import {useBattleAction} from "../hook/hookBattle";
import {getCoopaEvolution, LoadingFC, lsCoopaMap, lsTribe, openNotificationWithIcon} from "../components/api/Api";
import {handleTxHash} from "../utils/handleTxHash";
import {useOpenBoxAction} from "../hook/hookOpenBox";
import {handledErrorAction} from "../utils/handleError";
import Countdown from 'react-countdown';

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
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
};

const BattleFight = ({imgCoopa, imgMonster, coopaClass, imgCoopaClassBg, monsterName}) => {
    return (
        <>
            <div className="banner-section bg bg_img fighting-section">
                <div className="battle-wrapper">
                    <div className="battle-content row">
                        <div className="battle-content__coopa col-md-12 col-lg-6">

                            <div className="hp">
                                <div className={'box-name-coopa'}
                                     style={{left: 0, backgroundImage: 'url(' + imgCoopaClassBg + ')'}}>
                                    <div className={'box-name-coopa-text'}>
                                        <a>{coopaClass}</a>
                                    </div>
                                </div>
                                <div className="hp-border">
                                    <div className="hp-progress coopa"></div>
                                </div>

                            </div>
                            <div className="coopa card-coopa fight-monster card">
                                <div className="card-coopa__gif" id="Hydrein">
                                    <div className="dame-monster"></div>
                                    <img alt="coopa-card"
                                         src={imgCoopa}/>
                                </div>
                            </div>
                        </div>
                        <div className="vs-gif d-flex justify-content-center align-items-center"><img alt="vs-gif"
                                                                                                      src="/assets/img/battle/VS.gif"/></div>
                      <div className="animation-vs-gif d-flex justify-content-center align-items-center"><img alt="vs-gif"
                                                                                                      src="/assets/img/battle/GIF_vs.gif"/>
                        </div>
                        <div className="battle-content__monster col-md-12 col-lg-6">
                            <div className="hp">
                                <div className={'box-name-coopa box-name-monster'}
                                     style={{right: 20, backgroundImage: 'url(assets/img/place-monster.png)'}}>
                                    <div className={'box-name-coopa-text box-name-monster-text'}>
                                        <a>{monsterName}</a>
                                    </div>
                                </div>
                                <div className="hp-border">
                                    <div className="hp-progress monster"></div>
                                </div>

                            </div>
                            <div className="monster card-monster fight-monster card" style={{background: 'none'}}>
                                <div className="card-monster__img">
                                    <div className="dame-coopa dame-coopa__hydrein"></div>
                                    <img alt="coopa-card"
                                         src={imgMonster}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const MyCFA = ({data, setSelectedCoopa, openSeedInventory}) => {
    const wallet = useWallet();
    const [currentItem,setCurrentItem] = useState(null)
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,swipeToSlide: true,
        nextArrow:<img src={'/assets/img/icon/next.png'}/>,
        prevArrow:<img src={'/assets/img/icon/prev.png'} />,
        responsive: [
        {
          breakpoint: 1220,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
        <Container>
            <div style={{width:'90%',margin:'0 auto'}}>
            <Slider {...settings}>
                {data.map((item, index) => (
                    <div>
                        <div className="card-coopa market card align-items-center">
                            <div className="card-body" style={{minHeight: '140px'}}>
                                <div className="card-header" style={{backgroundImage: 'url(' + item.headerBg + ')'}}>
                                    <div className={'header-content'}>
                                        <a>
                                            {item.class}</a>
                                    </div>
                                </div>
                                <div className="card-coopa__img" id="Skyler"
                                     style={{backgroundImage: 'url(' + "assets/img/tribe/" + item.tribe + ".png" + ')'}}>
                                    <img alt="tribe"
                                         src={"assets/img/plant/" + item.shortName + "_idle.gif"}/>
                                </div>
                                <table className="coopa-statis">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div className="coopa-statis__title">ID: &nbsp;<span
                                                className="coopa-statis__value">{item.id}</span></div>
                                        </td>
                                        <td>
                                            <div className="coopa-statis__title">Rare: &nbsp;<span
                                                className="coopa-statis__value">{item.rare}</span></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="coopa-statis__title">Level: &nbsp;<span
                                                className="coopa-statis__value">{item.level}/<span
                                                className="small">{item.exp}exp</span></span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="coopa-statis__title">Tribe: &nbsp;<span
                                                className="coopa-statis__value">{item.tribe}</span></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="coopa-statis__title">Turn: &nbsp;<span
                                                className="coopa-statis__value">{item.turn}</span></div>
                                        </td>
                                        <td>
                                            <div className="coopa-statis__title">BonusTurn: &nbsp;<span
                                                className="coopa-statis__value">{item.bonusTurn}</span></div>
                                        </td>
                                        {/*<td>*/}
                                        {/*    <div className="coopa-statis__title">Level: &nbsp;<span*/}
                                        {/*        className="coopa-statis__value">{item.level}/<span*/}
                                        {/*        className="small">{item.exp}exp</span></span>*/}
                                        {/*    </div>*/}
                                        {/*</td>*/}
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <div className="coopa-statis__title">lastFighting: &nbsp;<span
                                                // className="coopa-statis__value">{setInterval(function(){new Date(item.lastFighting*1000)},1000)}</span></div>
                                                className="coopa-statis__value">{item.lastFighting !== "0" ? new Date(item.lastFighting*1000).toLocaleString("en-US") : ""}</span></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <div className="coopa-statis__title">Countdown: &nbsp;<span
                                                // className="coopa-statis__value">{setInterval(function(){new Date(item.lastFighting*1000)},1000)}</span></div>
                                                className="coopa-statis__value countdown-text"><Countdown renderer={renderer} daysInHours={false} date={Date.now() + item.countdown*1000} /></span></div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                {/*<div className="coopa-price">*/}
                                {/*    <div className="coopa-statis__title">Last Fighting ago: &nbsp;<span*/}
                                {/*        className="coopa-statis__value"><span>06h:36m:20s</span></span></div>*/}
                                {/*</div>*/}
                                {/*<div className="owner-address">Owner: <span>{item.owner}</span></div>*/}
                                {/*<div className="coopa-price">*/}
                                {/*    <div className="coopa-price__coin"><img src="../../assets/img/cpa-coin.png"*/}
                                {/*                                           alt="cpa-coin.png"/></div>*/}
                                {/*    <div className="coopa-price__value">*/}
                                {/*        <div style={{display: 'inline-flex', alignItems: 'center'}}><span>{item.price}</span></div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className="card-footer">
                                    {wallet.account ?
                                        <>
                                            {item.rare === "0" ?
                                                <button type="button" className="btn btn-primary btn-block"
                                                        onClick={() => openSeedInventory(item.id)}>Open</button>
                                                :
                                                (
                                                    <>
                                                        <button type="button" className={"btn btn-primary btn-block " + (currentItem === item.id ? "btn-selected" : "")}
                                                                onClick={() => {
                                                                    setCurrentItem(item.id)
                                                                    setSelectedCoopa(item.name,
                                                                        item.id,
                                                                        "assets/img/plant/" + item.shortName + "_attack.gif", item.class,
                                                                        item.headerBg)}}>{currentItem === item.id ? "Selected this COOPA": "Use this COOPA"}
                                                        </button>
                                                    </>
                                                )}
                                        </>
                                        :
                                        <button type="button" className="btn btn-danger btn-block"
                                                onClick={() => wallet.connect('injected')}>Connect</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>))}
            </Slider>
            </div>
        </Container>
    )
}

const Monster = ({data, callFighting,selectedCoopaId}) => {
    const wallet = useWallet();

    return (
        <Container className="d-flex align-content-center align-items-center row">
            <div className="justify-content-center row col-sm-12">
                <List
                    grid={{gutter: 16, xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 3,xl:4,xxl:4}}
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item>
                            <div className="card-monster card">
                                <div className="card-monster__img"><img alt="card-monster"
                                                                        src={item.imgIdle}/>
                                </div>
                                <div className="card-header">{item.name}</div>
                                <div className="card-body">
                                    <table className="monster-statis">
                                        <tr>
                                            <td><span className="monster-statis__title">Level:</span></td>
                                            <td><span className="monster-statis__value">{index + 1}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span className="monster-statis__title">Win Rate:</span></td>
                                            <td><span className="monster-statis__value">{item.win_rate}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span className="monster-statis__title">Reward Estimated:</span>
                                            </td>
                                            <td><span
                                                className="monster-statis__value">{item.reward_estimated}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span className="monster-statis__title">EXP Estimated:</span>
                                            </td>
                                            <td><span
                                                className="monster-statis__value">{item.exp_estimated}</span>
                                            </td>
                                        </tr>
                                    </table>
                                    <div className="mt-3">
                                        {wallet.account ?
                                            <>
                                                {selectedCoopaId ?
                                                <button type="button" className="btn btn-warning btn-block"
                                                        onClick={() => callFighting(index + 1, item.imgAttack, item.name)}>Fight
                                                </button> :  null }
                                            </>
                                            :
                                            <button type="button" className="btn btn-danger btn-block"
                                                    onClick={() => wallet.connect('injected')}>Connect</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </Container>
    )
}

const FightMonster = () => {
    const [selectedCoopa, setSelectedCoopa] = useState(null);
    const [selectedCoopaId, setSelectedCoopaId] = useState(null);
    const wallet = useWallet()
    const account = wallet.account
    const nftAction = useNFTaction()
    const {getTurn, battle,
        ownerPendingReward, battleContract,getCoopaCooldown,
        claimToken,lastBattleTime,getLastClaim} = useBattleAction()
    const [countCoopa, setCountCoopa] = useState(null)
    const [lsCoopa, setLsCoopa] = useState([])
    const [monsterData, setMonsterData] = useState([])
    const [isFighting, setIsFighting] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [pendingReward, setPendingReward] = useState(0)
    const [imgCoopa, setImgCoopa] = useState(null)
    const [imgMonster, setImgMonster] = useState(null)
    const [coopaClass, setCoopaClass] = useState(null)
    const [imgCoopaClassBg, setImgCoopaClassBg] = useState(null)
    const [monsterName, setMonsterName] = useState(null)
    const [resultFight, setResultFight] = useState({})
    const [lastClaim, setLastClaim] = useState(null)
    const [nextClaim, setNextClaim] = useState(null)
    const openBoxAction = useOpenBoxAction()

    useEffect(() => {
        getMonster()
        if (account) {
            setLoading(true)
            getLastClaim(account)
                .then(res=>{
                    if (ethers.BigNumber.from(res) > new Date()) {
                        setNextClaim(new Date(ethers.BigNumber.from(res).toString()*1000 + 86400000))
                        setLastClaim(new Date(ethers.BigNumber.from(res).toString()*1000).toLocaleString())}
                })
            ownerPendingReward(account)
                .then(res => setPendingReward(ethers.BigNumber.from(res).toString()))
            fetchData()

        }
    }, [account, countCoopa])

    const openSeedInventory = (tokenId) => {
        setLoading(true)
        openBoxAction.openSeed(tokenId)
            .then(res => {
                res.wait().then(function (receipt) {
                    openNotificationWithIcon('success','Success','Transaction Success')
                    fetchData()
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

    const fetchData = () => {
        nftAction.getCountCoopaOfAddress(account)
            .then(res => {
                setCountCoopa(ethers.BigNumber.from(res).toString())
                getLsCoopa(ethers.BigNumber.from(res).toString())

            })
    }

    const getAsync = (i) => {
        return new Promise((resolve) => {
            let objCoopa = {}
            nftAction.getTokenOfOwnerByIndex(account, i)
                .then(res => {
                    objCoopa.id = ethers.BigNumber.from(res).toString()
                    nftAction.getCoopa(ethers.BigNumber.from(res).toString())
                        .then(res1 => {
                            objCoopa.exp = ethers.BigNumber.from(res1.exp).toString()
                            objCoopa.rare = ethers.BigNumber.from(res1.rare).toString()
                            objCoopa.tribe = lsTribe[ethers.BigNumber.from(res1.tribe)]
                            objCoopa.class = lsCoopaMap[ethers.BigNumber.from(res1.class)].name
                            let shortName = ethers.BigNumber.from(res1.class)
                            nftAction.getCoopaLevel(objCoopa.id)
                                .then(res2 => {
                                    objCoopa.level = ethers.BigNumber.from(res2).toString()
                                    objCoopa.headerBg = 'assets/img/evolution-' + getCoopaEvolution(objCoopa.level, objCoopa.rare) + '.png'
                                    objCoopa.shortName = lsCoopaMap[shortName].shortName + getCoopaEvolution(objCoopa.level, objCoopa.rare)
                                    getTurn(objCoopa.id)
                                        .then(res2 => {
                                            objCoopa.turn = ethers.BigNumber.from(res2[0]).toString()
                                            objCoopa.bonusTurn = ethers.BigNumber.from(res2[1]).toString()
                                            lastBattleTime(objCoopa.id)
                                                .then(resBattle => {
                                                    objCoopa.lastFighting = ethers.BigNumber.from(resBattle).toString()
                                                    getCoopaCooldown(objCoopa.id)
                                                        .then(resCooldown=>{
                                                            objCoopa.countdown = ethers.BigNumber.from(resCooldown.toString()).toString()
                                                            resolve(objCoopa)
                                                        })
                                                    })

                                                })
                                        })
                                })
                        })

                .catch(err => {
                    console.log(err);
                })
        })

    }


    const getLsCoopa = (countCoopa) => {
        const promises = [];
        for (let i = 0; i < countCoopa; i++) {
            promises.push(getAsync(i));
        }
        Promise.all(promises).then(res => {
            setLsCoopa(res)
            setLoading(false)
        });
    }

    const setCooppa = (value, id, url, coppaClass, headerBg) => {
        setSelectedCoopa(value + "_" + id)
        setSelectedCoopaId(id)
        setImgCoopa(url)
        setImgCoopaClassBg(headerBg)
        setCoopaClass(coppaClass)
    }

    const lsMonster = [
        {
            name: 'Beemo',
            imgIdle: '/assets/img/monster/Beemo_idle.gif',
            imgAttack: '/assets/img/monster/Beemo_attack.gif'
        },
        {
            name: 'Buggo',
            imgIdle: '/assets/img/monster/Buggo_idle.gif',
            imgAttack: '/assets/img/monster/Buggo_attack.gif'
        },
        {
            name: 'Gruby',
            imgIdle: '/assets/img/monster/Gruby_idle.gif',
            imgAttack: '/assets/img/monster/Gruby_attack.gif'
        },
        {
            name: 'Maybuggo',
            imgIdle: '/assets/img/monster/Maybuggo_idle.gif',
            imgAttack: '/assets/img/monster/Maybuggo_attack.gif'
        },
        {
            name: 'Scorpium',
            imgIdle: '/assets/img/monster/Scorpium_idle.gif',
            imgAttack: '/assets/img/monster/Scorpium_attack.gif'
        },
    ]
    const getMonster = () => {
        const ranNums = shuffle([0, 1, 2, 3, 4]);
        const lsMonsterTemp = []
        for (let i = 1; i < 5; i++) {
            lsMonsterTemp.push(lsMonster[ranNums.next().value])
        }
        setMonsterData(lsMonsterTemp)
    }
    const ActionFighting = (coppyLvl, img_url, monsterName) => {
        // setLoading(true)
        setImgMonster(img_url)
        setIsFighting(true)
        setMonsterName(monsterName)
        battle(selectedCoopaId, coppyLvl)
            .then(res => {
                res.wait().then(res => {
                    setLoading(false)
                    const result = handleTxHash(res, account, battleContract)
                    setResultFight(result)
                    setIsFighting(false)
                    setShowModal(true)
                    ownerPendingReward(account)
                        .then(res => setPendingReward(ethers.BigNumber.from(res).toString()))
                    fetchData()
                    // const data = res.events[res.events.length-1]
                })
                    .catch(error => {
                        const message = handledErrorAction(error).message
                        openNotificationWithIcon('error','Error',message)
                        setIsFighting(false)
                    })
            })
            .catch(error => {
                const message = handledErrorAction(error).message
                openNotificationWithIcon('error','Error',message)
                setIsFighting(false)
            })
    }

    const claimRewardFC = () => {
        claimToken()
            .then(res => {
                res.wait().then(res => {
                    ownerPendingReward(account)
                        .then(res => setPendingReward(ethers.BigNumber.from(res).toString()))
                })
            })
            .catch(error => {
                const message = handledErrorAction(error).message
                openNotificationWithIcon('error','Error',message)



            })
    }
    return (
        <div className="main d-block">
                <div className="banner-section bg bg_img fightmonster-section">
                    <div className="text-center col-md-12 col-lg-12">
                        <div className="starter-pack-title fightmonster-custom-title">
                            <h2 style={{textAlign: 'center'}}>Fight Monster</h2>
                            {/*<h4 style={{textTransform: 'none'}}>{lastClaim ? "Lastest Claimed at " + lastClaim : "You have never claimed"}</h4>*/}
                            <h4 style={{textTransform: 'none'}} className={'countdown-text countdown-next-claim'}>
                                {pendingReward > 0 ?
                                    <>

                                {nextClaim ? (<>Next claim after :  <Countdown renderer={renderer} daysInHours={false} date={nextClaim}/></> ):
                            <button className={'col-sm-2 btn btn-claim'} onClick={() => claimRewardFC()}>Claim Reward</button>
                            }
                                    </>
                                    : null }
                            </h4>
                            <h3 style={{textTransform: 'none'}}>Pending reward : {pendingReward}</h3>
                        </div>
                    </div>
                    <>
                        <Spin spinning={loading} indicator={LoadingFC}>
                            <div style={{height: '600px'}}>
                                <MyCFA data={lsCoopa.filter(item=>item.rare !== '0')} openSeedInventory={(id) => openSeedInventory(id)}
                                       setSelectedCoopa={(value, id, img_url, coopaClass, imgCoopaClassBg) => setCooppa(value, id, img_url, coopaClass, imgCoopaClassBg)}/>
                            </div>
                        </Spin>
                        {selectedCoopa ?
                            <h3 className={'fightmonster-selected'}>{'Selected Coopa ID: '} {selectedCoopaId}</h3> : null}

                        <h1 className={'fightmonster-title'}>
                            <h1 className={'fightmonster-title'}>Choose a Monster</h1>
                            <button className={'btn btn-block btn-primary btn-reload-monster'}
                                    onClick={() => getMonster()}>Reload Monster
                            </button>
                        </h1>
                        <Spin spinning={isFighting} indicator={LoadingFC}>
                        <Monster data={monsterData}
                                 callFighting={(coppyLvl, img_url, monsterName) => ActionFighting(coppyLvl, img_url, monsterName)} selectedCoopaId={selectedCoopaId}/>
                     </Spin>
                    </>
                </div>

            <Modal centered className={'modal-inventory'} width={400} header={false} footer={false} visible={showModal}
                   onCancel={() => setShowModal(false)}>
                <Row>
                    <Col sm={24} className={'modal-fighting-result'}>
                        <div className={'title'}>Result</div>
                        <h1>You {resultFight.battleResult ? "Win" : "Lose"} the fight</h1>
                        <h2>You got {resultFight.expReward } EXP</h2>
                        {resultFight.battleResult ? <h2>You got {resultFight.reward } reward</h2> : null}
                    </Col>

                </Row>
            </Modal>
        </div>
    );
}

export default withRouter(FightMonster);