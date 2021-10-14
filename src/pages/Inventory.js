import NftABi from "../abi/nft.json"
import React, {useEffect, useState} from 'react';
import 'react-notifications/lib/notifications.css';
import {withRouter} from 'react-router';
import {Container} from "react-bootstrap";
import {Button, Col, Input, List, Modal, Row, Spin, Tabs} from "antd";
import {useWallet} from "use-wallet";
import ShopOutlined from "@ant-design/icons/lib/icons/ShopOutlined";
import ShoppingCartOutlined from "@ant-design/icons/lib/icons/ShoppingCartOutlined";
import {useNFTaction} from "../hook/hookNFT";
import {ethers} from "ethers";
import {useOpenBoxAction} from "../hook/hookBuyTicket";
import {useMarketAction} from "../hook/hookMarket";
import {getCoopaEvolution, LoadingFC, lsCoopaMap, lsTribe, openNotificationWithIcon} from "../components/api/Api";
import {contractAddress} from "../utils/contract";
import {multiCall} from "../utils/multicall";
import {useProvider} from "../hook/hook";
import {handledErrorAction} from "../utils/handleError";

const itemRender = (current, type, originalElement) => {
  if (type === 'prev') {
    return <button style={{background:'#ff7600',color:'#ffffff',padding:'2px 10px',borderRadius:'10px'}}>Previous</button>;
  }
  if (type === 'next') {
    return <button style={{background:'#ff7600',color:'#ffffff',padding:'2px 10px',borderRadius:'10px'}}>Next</button>;
  }
  return originalElement;
}

const {TabPane} = Tabs;

const MarketplaceTab = ({data,callBackReload,toggleLoading}) =>{

    const [isModalVisibleSell, setIsModalVisibleSell] = useState(false)
    const [isModalVisibleGift, setIsModalVisibleGift] = useState(false)
    const [price, setPrice] = useState(null)
    const [currentTokenId, setCurrentTokenId] = useState(null)
    const [toAddress, setToAddress] = useState(null)
    const {approve, isApprove,transferFrom} = useNFTaction()
    const [isApproved, setIsApproved] = useState(false);
    const openBoxAction = useOpenBoxAction()
    const {placeOrder, cancelOrder} = useMarketAction()
    const [currentItem, setCurrentItem] = useState({})
    const wallet = useWallet();
    const account = wallet.account
    const sellCoopa = () => {
        toogleModalVisibleSell({})
        toggleLoading(true)
        placeOrder(currentTokenId,ethers.utils.parseEther(price))
        .then(res => {
            res.wait().then(function(receipt) {
                openNotificationWithIcon('success','Success','Transaction Success')
                callBackReload()
                toggleLoading(false)
            })
                .catch(error => {
                    const message = handledErrorAction(error).message
                    openNotificationWithIcon('error','Error',message)
                    toggleLoading(false)
                })
        })
        .catch(error => {
            const message = handledErrorAction(error).message
            openNotificationWithIcon('error','Error',message)
            toggleLoading(false)
        })
    }

    const runApprove = () => {
        approve().then(res =>{
            res.wait().then(res=>{
                setIsApproved(true)
            })
                .catch(error => {
                    const message = handledErrorAction(error).message
                    openNotificationWithIcon('error','Error',message)
                    toggleLoading(false)
                })
        })
         .catch(error => {
                const message = handledErrorAction(error).message
            openNotificationWithIcon('error','Error',message)
            toggleLoading(false)
        })
    }

    const giftCoopa = () => {
        toogleModalVisibleGift({})
        toggleLoading(true)
        transferFrom(account,toAddress, currentTokenId)
        .then(res => {
            res.wait().then(function(receipt) {
                openNotificationWithIcon('success','Success','Transaction Success')
                toggleLoading(false)
                callBackReload()
            })
        })
            .catch(error => {
                const message = handledErrorAction(error).message
                openNotificationWithIcon('error','Error',message)
                toggleLoading(false)
            })
    }

    const toogleModalVisibleSell = (item) => {
        const bool = isModalVisibleSell
        setIsModalVisibleSell(!bool)
        setCurrentTokenId(item.id)
        setCurrentItem(item)
    }

    const toogleModalVisibleGift = (item) => {
        const bool = isModalVisibleGift
        setIsModalVisibleGift(!bool)
        setCurrentTokenId(item.id)
        setCurrentItem(item)
    }
    const openSeedInventory = (tokenId) => {
        toggleLoading(true)
        openBoxAction.openSeed(tokenId)
            .then(res => {
                res.wait().then(function(receipt) {
                openNotificationWithIcon('success','Success','Transaction Success')
                callBackReload()
                toggleLoading(false)
                })
                .catch(error => {
                    const message = handledErrorAction(error).message
                    openNotificationWithIcon('error','Error',message)
                    toggleLoading(false)
                })
            })
            .catch(error => {
                    const message = handledErrorAction(error).message
                    openNotificationWithIcon('error','Error',message)
                    toggleLoading(false)
                })

    }
    useEffect(() => {
        if (account) {
            isApprove()
                .then(setIsApproved)
        }
    }, [account])

    const cancelOrderFC = (tokenId) =>{
        toggleLoading(true)
        cancelOrder(tokenId)
            .then(res=>{
                res.wait().then(function(receipt) {
                    openNotificationWithIcon('success','Success','Transaction Success')
                    callBackReload()
                    toggleLoading(false)
                })
                    .catch(error => {
                        const message = handledErrorAction(error).message
                        openNotificationWithIcon('error','Error',message)
                        toggleLoading(false)
                    })
            })
            .catch(error => {
                        const message = handledErrorAction(error).message
                        openNotificationWithIcon('error','Error',message)
                        toggleLoading(false)
                    })
    }
    return (
            <List
            grid={{
                    gutter: 16, xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,xl:4,xxl:4
                }}
            dataSource={data}
            pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                pageSize: 12,
                hideOnSinglePage:true,
                position: "bottom",
                itemRender:itemRender,
                simple:'simple'
                }}
            renderItem={item => (
              <List.Item>
                <div className="card-coopa market card">
                    <div className="card-body">
                        <div className="card-header" style={{backgroundImage:'url(' + item.headerBg + ')'}}>
                            <div className={'header-content'}>
                                <a>
                                {item.class}</a>
                            </div>
                        </div>

                        <div className="card-coopa__img" id="Skyler" style={{backgroundImage:'url('+ "assets/img/tribe/"+ item.tribe + ".png" +')'}}><img alt="tribe"
                                                                     src={"assets/img/plant/" + item.shortName +"_idle.gif"}/>
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
                                        className="coopa-statis__value">{item.level}/<span className="small">{item.exp}exp</span></span>
                                    </div>
                                </td>
                                <td>
                                    <div className="coopa-statis__title">Tribe: &nbsp;<span
                                        className="coopa-statis__value">{item.tribe}</span></div>
                                </td>
                            </tr>

                            </tbody>
                        </table>

                        <div className="card-footer">
                            <div className={'row col-12 margin-0'}>
                            {wallet.account ? (
                                <>
                                    {item.rare === "0" ?
                                        <button type="button" className="btn btn-claim" onClick={() => openSeedInventory(item.id)}>Open</button>
                                        :
                                        (
                                            <>
                                                {isApproved ?
                                                    (
                                                    <>
                                                    {item.onOrder ?
                                                        (<button type="button" className="btn btn-claim" onClick={() => cancelOrderFC(item.id)}>Cancel</button>) :
                                                        (
                                                            <>
                                                                <div className={'col-6 padding-0'}>
                                                                <button type="button" className="btn btn-claim" onClick={() => toogleModalVisibleSell(item)}>Sell</button>
                                                                </div>
                                                                <div className={'col-6 padding-0'}>
                                                                    <button type="button" className="btn btn-claim" onClick={() => toogleModalVisibleGift(item)}>Gift</button>
                                                                </div>
                                                                </>)
                                                           }
                                                        </>
                                                    ) :
                                              <button type="button" className="btn btn-claim" onClick={() => runApprove()}>Approve</button>}
                                        </>
                                        )
                                    }
                                </>
                                )
                                :
                                <button type="button" className="btn btn-claim" onClick={()=>wallet.connect('injected')}>Connect</button>
                            }
                            </div>
                        </div>
                        <Modal className={'modal-inventory'} width={600} header={false} footer={false} visible={isModalVisibleSell} onCancel={()=>toogleModalVisibleSell({})}>
                           <Row>
                               <Col sm={12} className={'left-panel-modal'}>
                                   <div className={'block-name-class'} style={{backgroundImage:'url(' + currentItem.headerBg + ')'}}><a style={{lineHeight:'93px',color:'#fd7100'}}>{currentItem.class}</a></div>
                                    <div className="card-coopa__img" id="Skyler" style={{backgroundImage:'url('+ "assets/img/tribe/"+ currentItem.tribe + ".png" +')'}}><img alt="tribe"
                                                                                                                                                                            src={"assets/img/plant/" + currentItem.shortName +"_idle.gif"}/></div>
                               </Col>
                               <Col sm={12} className={'right-panel-modal'}>
                                    <div className={'right-panel-modal-bg'}>
                                    <div style={{height:'50%'}}>
                                        <div className={'row col-12 margin-0'}>
                                            <div className={'col-6 padding-0'}>ID: &nbsp;</div>
                                            <div className={'col-6 padding-0'}>{currentItem.id}</div>
                                        </div>
                                        <div className={'row col-12 margin-0'}>
                                            <div className={'col-6 padding-0'}>Rare: &nbsp;</div>
                                            <div className={'col-sm-6 padding-0'}>{currentItem.rare}</div>
                                        </div>
                                        <div className={'row col-12 margin-0'}>
                                            <div className={'col-6 padding-0'}>Tribe: &nbsp;</div>
                                            <div className={'col-6 padding-0'}>{currentItem.tribe}</div>
                                        </div>
                                        <div className={'row col-12 margin-0'}>
                                            <div className={'col-6 padding-0'}>Level: &nbsp;</div>
                                            <div className={'col-6 padding-0'}>{currentItem.level}</div>
                                        </div>


                                </div>
                                <span className={'title-modal-inventory'}>Your asset will be listed on Marketplace with this price </span>
                                <div className={'row col-sm-12 margin-0 padding-0'}>
                                    <div className={'col-sm-12 padding-0'}>
                                    <Input placeholder={'amount'} onChange={(e)=>setPrice(e.target.value)} type='number' addonAfter={<span className={'input-addon-inventory'}><img src={'/assets/img/cpa-coin.png'} alt={'cpa-coin'}/></span>}/>
                                    </div>
                                </div>
                                <div className={'row col-sm-12 margin-0'}>
                                <Button type={"primary"} style={{margin:'10px auto 0px',textAlign:'center'}} onClick={()=>sellCoopa()}>Sell</Button>
                                </div>
                                </div>
                               </Col>

                            </Row>
                          </Modal>

                        <Modal className={'modal-inventory'} width={600} header={false} footer={false} visible={isModalVisibleGift} onCancel={()=>toogleModalVisibleGift({})}>
                           <Row>
                               <Col sm={12} className={'left-panel-modal'}>
                                   <div className={'block-name-class'} style={{backgroundImage:'url(' + currentItem.headerBg + ')'}}><a style={{lineHeight:'93px',color:'#fd7100'}}>{currentItem.class}</a></div>
                                    <div className="card-coopa__img" id="Skyler" style={{backgroundImage:'url('+ "assets/img/tribe/"+ currentItem.tribe + ".png" +')'}}><img alt="tribe"
                                                                                                                                                                            src={"assets/img/plant/" + currentItem.shortName +"_idle.gif"}/></div>
                               </Col>
                               <Col sm={12} className={'right-panel-modal'}>
                                    <div className={'right-panel-modal-bg'}>
                                    <div style={{height:'40%'}}>
                                        <div className={'row col-12 margin-0'}>
                                            <div className={'col-6 padding-0'}>ID: &nbsp;</div>
                                            <div className={'col-6 padding-0'}>{currentItem.id}</div>
                                        </div>
                                        <div className={'row col-12 margin-0'}>
                                            <div className={'col-6 padding-0'}>Rare: &nbsp;</div>
                                            <div className={'col-6 padding-0'}>{currentItem.rare}</div>
                                        </div>
                                        <div className={'row col-12 margin-0'}>
                                            <div className={'col-6 padding-0'}>Tribe: &nbsp;</div>
                                            <div className={'col-6 padding-0'}>{currentItem.tribe}</div>
                                        </div>
                                        <div className={'row col-12 margin-0'}>
                                            <div className={'col-6 padding-0'}>Level: &nbsp;</div>
                                            <div className={'col-6 padding-0'}>{currentItem.level}</div>
                                        </div>


                                </div>
                                <span className={'title-modal-inventory'}>You're about to gift COOPA to other person, please enter receiver's BSC wallet address to continue </span>
                                <div className={'row col-sm-12 margin-0 padding-0'}>
                                    <div className={'col-sm-12 padding-0'}>
                                    <Input onChange={(e)=>setToAddress(e.target.value)} type={"text"} placeholder={'BSC wallet address'}/>
                                    </div>
                                </div>
                                <div className={'row col-sm-12 margin-0'}>
                                <Button type={"primary"} style={{margin:'10px auto 0px'}} onClick={()=>giftCoopa()}>Gift</Button>
                                </div>
                                </div>
                               </Col>

                            </Row>
                          </Modal>

                    </div>

                </div>

              </List.Item>
            )}
            />
    )
}


const Inventory = () => {
    const wallet = useWallet()
    const nftAction = useNFTaction()
    const {getOrderOfAddress,getTokenSaleOfOwnerByIndex} = useMarketAction()
    const [countCoopa, setCountCoopa] = useState(null)
    const [lsCoopa, setLsCoopa] = useState([])
    const [lsCoopaInOrder, setLsCoopaInOrder] = useState([])
    const account = wallet.account
    const [loading, setLoading] = useState(false)
    const provider = useProvider()
    const toggleLoading = (value) => {
        setLoading(value)
    }
    useEffect(() => {
        if (account) {
            setLoading(true)
            // fetchAllCoopa()
            fetchMulltiCallAllCoopa()

        }
    },[account,countCoopa])

    const fetchAllCoopa = () => {
        nftAction.getCountCoopaOfAddress(account)
                .then(res => {
                    setCountCoopa(ethers.BigNumber.from(res).toString())
                    getLsCoopa(ethers.BigNumber.from(res).toString())

                })
            getOrderOfAddress(account)
            .then(res => {
                getLsCoopaInOrder(res)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getLsCoopaMulti = (value) => {
        const promises = [];
        for (let i = 0; i < value ; i++) {
            let obj = {}
            obj.address = contractAddress.NFT
            obj.name = 'tokenOfOwnerByIndex'
            obj.params = [account,i]
            promises.push(obj);
        }
        return promises
    }

    const getLsCallgetCoopa = (value) => {
        const arr = []
        for (let i of value) {
            let obj = {}
            const tokenId = ethers.BigNumber.from(i.toString()).toString()
            obj.address = contractAddress.NFT
            obj.name = 'getCoopa'
            obj.params = [tokenId]
            arr.push(obj);
        }
        return arr
    }
    const getLsCallgetCoopaLv = (value) => {
        const arr = []
        for (let i of value) {
            let obj = {}
            const tokenId = ethers.BigNumber.from(i.toString()).toString()
            obj.address = contractAddress.NFT
            obj.name = 'coopaLevel'
            obj.params = [tokenId]
            arr.push(obj);
        }
        return arr
    }

    const mapLsCoopa = (values,values2,lsId) => {

        const lsResults = []
        for (let k in values) {
            let objCoopa = {}
            let i = values[k]
            let j = values2[k]
            objCoopa.id = lsId[k][0].toString()
            objCoopa.exp = ethers.BigNumber.from(i[0].exp).toString()
            objCoopa.rare = ethers.BigNumber.from(i[0].rare).toString()
            objCoopa.tribe = lsTribe[ethers.BigNumber.from(i[0].tribe)]
            const obj_temp = lsCoopaMap[ethers.BigNumber.from(i[0].class)]
            objCoopa.class = obj_temp.name
            objCoopa.level = ethers.BigNumber.from(j[0]).toString()
            const coopaEvolution = getCoopaEvolution(objCoopa.level,objCoopa.rare)
            objCoopa.headerBg = 'assets/img/evolution-' + coopaEvolution + '.png'
            objCoopa.shortName = obj_temp.shortName + coopaEvolution
            lsResults.push(objCoopa)
        }
        setLsCoopa(lsResults)
        setLoading(false)

    }

    const getCoopaInfoAll = (lsCoopaId) => {
        multiCall(NftABi,lsCoopaId,provider)
        .then(res => {
            const lsTokenId = res
            multiCall(NftABi,getLsCallgetCoopa(lsTokenId),provider)
            .then(res => {
                const lsCoopaTemp1 = res
                multiCall(NftABi,getLsCallgetCoopaLv(lsTokenId),provider)
                    .then(res=>{
                        mapLsCoopa(lsCoopaTemp1,res,lsTokenId)
                    })
            })
        })
    }

    const fetchMulltiCallAllCoopa = () => {
        nftAction.getCountCoopaOfAddress(account)
            .then(res => {
                const lsCoopaId = getLsCoopaMulti(ethers.BigNumber.from(res).toString())
                getCoopaInfoAll(lsCoopaId)
                })

    }


    const getAsync = (i) => {
        return new Promise((resolve) => {
            let objCoopa = {}
            nftAction.getTokenOfOwnerByIndex(account,i)
                .then(res => {
                    objCoopa.id = ethers.BigNumber.from(res).toString()
                    nftAction.getCoopa(ethers.BigNumber.from(res).toString())
                        .then(res1=>{
                            objCoopa.exp = ethers.BigNumber.from(res1.exp).toString()
                            objCoopa.rare = ethers.BigNumber.from(res1.rare).toString()
                            objCoopa.tribe = lsTribe[ethers.BigNumber.from(res1.tribe)]
                            objCoopa.class = lsCoopaMap[ethers.BigNumber.from(res1.class)].name
                            let shortName = ethers.BigNumber.from(res1.class)
                            nftAction.getCoopaLevel(objCoopa.id)
                            .then(res2 => {
                                objCoopa.level = ethers.BigNumber.from(res2).toString()
                                objCoopa.headerBg = 'assets/img/evolution-' + getCoopaEvolution(objCoopa.level,objCoopa.rare) + '.png'
                                objCoopa.shortName = lsCoopaMap[shortName].shortName + getCoopaEvolution(objCoopa.level,objCoopa.rare)
                                resolve(objCoopa);
                            })
                        })
                })

            .catch(err=>{
                console.log(err);
            })
        })

    }


    const getLsCoopa = (countCoopa)=> {
        const promises = [];
        for (let i = 0; i < countCoopa ; i++) {
            promises.push(getAsync(i));
        }
        Promise.all(promises).then(res => {
            setLsCoopa(res)
        });
    }

    const onChangeTab = (key) => {
      console.log(key);

    }

    const getAsyncOrder = (i) => {
        return new Promise((resolve) => {
            let objCoopa = {}
            getTokenSaleOfOwnerByIndex(account,i)
                .then(res => {
                    objCoopa.id = ethers.BigNumber.from(res).toString()
                    objCoopa.onOrder = true
                    nftAction.getCoopa(ethers.BigNumber.from(res).toString())
                    .then(res1=>{
                        console.log(res1)
                        objCoopa.exp = ethers.BigNumber.from(res1.exp).toString()
                        objCoopa.rare = ethers.BigNumber.from(res1.rare).toString()
                        objCoopa.tribe = lsTribe[ethers.BigNumber.from(res1.tribe)]
                        objCoopa.class = lsCoopaMap[ethers.BigNumber.from(res1.class)].name
                        let shortName = ethers.BigNumber.from(res1.class)
                        nftAction.getCoopaLevel(objCoopa.id)
                        .then(res2 => {
                            objCoopa.level = ethers.BigNumber.from(res2).toString()
                            objCoopa.headerBg = 'assets/img/evolution-' + getCoopaEvolution(objCoopa.level,objCoopa.rare) + '.png'
                            objCoopa.shortName = lsCoopaMap[shortName].shortName + getCoopaEvolution(objCoopa.level,objCoopa.rare)
                            resolve(objCoopa);
                        })
                    })
                })

            .catch(err=>{
                console.log(err);
            })
        })

    }


    const getLsCoopaInOrder = (countCoopaInOrder)=> {
        const promises = [];
        for (let i = 0; i < countCoopaInOrder ; i++) {
            promises.push(getAsyncOrder(i));
        }
        Promise.all(promises).then(res => {
            setLsCoopaInOrder(res)
            setLoading(false)
        });
    }


    return (
        <div className="main d-block">
            <Spin spinning={loading} indicator={LoadingFC}>
            <div className="banner-section bg bg_img inventory-section">
                <Container className="d-flex align-content-center align-items-center">
                        <Col sm={24}>
                            <Tabs defaultActiveKey="1" onChange={onChangeTab} centered>
                                <TabPane tab={<span><ShopOutlined style={{fontSize:'25px'}} />All</span>} key="1">
                                    <MarketplaceTab data={[...lsCoopa,...lsCoopaInOrder]} callBackReload={()=>fetchAllCoopa()} toggleLoading={(value)=>toggleLoading(value)}/>
                                    {/*<MarketplaceTab data={[]} callBackReload={()=>fetchAllCoopa()} toggleLoading={(value)=>toggleLoading(value)}/>*/}
                                </TabPane>
                                <TabPane tab={<span><ShoppingCartOutlined style={{fontSize:'25px'}}/>In Order</span>} key="2">
                                    <MarketplaceTab data={lsCoopaInOrder} callBackReload={()=>fetchAllCoopa()} toggleLoading={(value)=>toggleLoading(value)}/>
                                </TabPane>

                            </Tabs>
                        </Col>
                </Container>
            </div>
            </Spin>
        </div>
    );
}

export default withRouter(Inventory);