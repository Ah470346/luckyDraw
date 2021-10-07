import React, {useEffect, useState} from 'react';
import 'react-notifications/lib/notifications.css';
import {withRouter} from 'react-router';
import {Container} from "react-bootstrap";
import {Button, Col, List, Spin} from "antd";
import useWallet from "use-wallet";
import {useNFTaction} from "../hook/hookNFT";
import {useMarketAction} from "../hook/hookMarket";
import {ethers} from "ethers";
import {useERC20Action} from "../hook/hookErc20";
import {
    convertBigNumBer,
    getCoopaEvolution,
    LoadingFC,
    lsCoopaMap,
    lsTribe,
    lsTribeMarket, openNotificationWithIcon
} from "../components/api/Api";
import MarketABi from "../abi/market.json"
import {contractAddress} from "../utils/contract";
import {multiCall} from "../utils/multicall";
import {useProvider} from "../hook/hook";
import NftABi from "../abi/nft.json";
import SortAscendingOutlined from "@ant-design/icons/lib/icons/SortAscendingOutlined";
import SortDescendingOutlined from "@ant-design/icons/lib/icons/SortDescendingOutlined";
import {handledErrorAction} from "../utils/handleError";

const itemRender = (current, type, originalElement) => {
  if (type === 'prev') {
    return <button style={{background:'#ff7600',padding:'2px 10px',borderRadius:'10px'}}>Previous</button>;
  }
  if (type === 'next') {
    return <button style={{background:'#ff7600',padding:'2px 10px',borderRadius:'10px'}}>Next</button>;
  }
  return originalElement;
}


const MartketplaceTab = ({wallet,data,pageSize,marketSize,callBack,toggleLoading}) =>{
    const {fillOrder} = useMarketAction()
    const account = wallet.account
    const {approveMarket, isApproveMarket} = useERC20Action()
    const [isApproved, setIsApproved] = useState(false);
    useEffect(() => {
        if (account) {
            isApproveMarket()
            .then(setIsApproved)
        }
    }, [account])

    const runApprove = () => {
        approveMarket().then(res =>{
            res.wait().then(res=>{
                setIsApproved(true)
            })
            .catch(error => {
                const message = handledErrorAction(error).message
                openNotificationWithIcon('error','Error',message)
            })
        })
         .catch(error => {
                const message = handledErrorAction(error).message
                openNotificationWithIcon('error','Error',message)
            })
    }


    const buyItemSale = (tokenId) => {
        toggleLoading(true)
        fillOrder(tokenId)
            .then(res=>{
                res.wait().then(res =>{
                    openNotificationWithIcon('success','Success','Transaction Success')
                    callBack(marketSize)
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
                lg: 3,xl:3,xxl:3
            }}
            dataSource={data}
            pagination={{
                  onChange: page => {
                    // callBack(marketSize,pageSize,page)
                  },
                  pageSize: 12,
                    hideOnSinglePage:true,
                    position:'bottom',
                simple:'simple',
                itemRender:itemRender
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
                        <div className={'box-table-detail'}>
                         <table className="coopa-statis">
                            <tbody>
                            <tr>
                                <td>
                                    <div className="coopa-statis__title">ID: &nbsp;<span
                                        className="coopa-statis__value">{item.id}</span></div>
                                </td>
                                <td>
                                    <div className="coopa-statis__title">Level: &nbsp;<span
                                        className="coopa-statis__value">{item.level}/<span className="small">{item.exp}exp</span></span>
                                    </div>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <div className="coopa-statis__title">Rare: &nbsp;<span
                                        className="coopa-statis__value">{item.rare}</span></div>
                                </td>
                                <td>
                                    <div className="coopa-statis__title">Tribe: &nbsp;<span
                                        className="coopa-statis__value">{item.tribe}</span></div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                            </div>
                        {/*<div className="coopa-price">*/}
                        {/*    <div className="coopa-statis__title">Last Fighting ago: &nbsp;<span*/}
                        {/*        className="coopa-statis__value"><span>06h:36m:20s</span></span></div>*/}
                        {/*</div>*/}
                        <div className="owner-address">Owner: <span>{item.owner.toString().substring(0,5) + "..." + item.owner.toString().substring(item.owner.toString().length-6,item.owner.toString()-1)}</span></div>
                        <div className="coopa-price">
                            <div className="coopa-price__coin"><img src="../../assets/img/cpa-coin.png"
                                                                   alt="cpa-coin.png"/></div>
                            <div className="coopa-price__value">
                                <div style={{display: 'inline-flex', alignItems: 'center'}}><span>{item.price}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        {wallet.account ?
                            <button type="button" className="btn btn-claim" onClick={() => {
                                        if(isApproved){
                                            return buyItemSale(item.id)
                                        }
                                        return runApprove()
                                    }}
                                >
                                    {
                                        isApproved ? (
                                            <>
                                                {item.owner === wallet.account ? "Cancel" :
                                            "Buy" }</>):
                                            "Approve"
                                    }</button>
                            :
                        <button type="button" className="btn btn-claim" onClick={()=>wallet.connect('injected')}>Connect</button>}
                    </div>
                </div>
              </List.Item>
            )}
            />

    )
}

const Marketplace = () => {
    const provider = useProvider()
    const wallet = useWallet()
    const nftAction = useNFTaction()
    const marketsAction = useMarketAction()
    const [marketSize, setMarketSize] = useState(null);
    const [lsMarket, setlsMarket] = useState([]);
    const [marketFilterData, setMarketFilterData] = useState([]);
    const [lsFilterRare, setLsFilterRare] = useState([]);
    const [lsFilterLv, setLsFilterLv] = useState([]);
    const [lsFilterTribe, setLsFilterTribe] = useState([]);
    const [loading, setLoading] = useState(false)
    const [sortType, setSortType] = useState('asc')
    const pageSize = 12
    const callback = (key) => {
      console.log(key);
    }


    useEffect(() => {
        setLoading(true)
        marketsAction.getMarketSize().then(
            res => {
                setMarketSize(ethers.BigNumber.from(res).toString())
                fetchMulltiCallAllMarket(ethers.BigNumber.from(res).toString())
                // getLsMarket(ethers.BigNumber.from(res).toString(),pageSize,1)
            }
        );
    },[]);

    const getAsync = (i) => {
        return new Promise((resolve) => {
            let objCoopa = {}
            marketsAction.getTokenSaleByIndex(i).then(res =>{
                objCoopa.id = ethers.BigNumber.from(res).toString()
                marketsAction.getOrderSale(ethers.BigNumber.from(res).toString())
                    .then(res2 => {
                        // objCoopa.price = ethers.utils.formatUnits(res2.price, "ether");
                        objCoopa.price = convertBigNumBer(res2.price);
                        objCoopa.owner = res2.owner.toString()
                        objCoopa.tokenId = ethers.BigNumber.from(res2.tokenId).toString()
                        nftAction.getNftInfo(ethers.BigNumber.from(res).toString())
                        .then(res1=>{
                            objCoopa.exp = ethers.BigNumber.from(res1.exp).toString()
                            objCoopa.rare = ethers.BigNumber.from(res1.rare).toString()
                            objCoopa.tribe = lsTribe[ethers.BigNumber.from(res1.tribe)]
                            objCoopa.class = lsCoopaMap[ethers.BigNumber.from(res1.class)].name
                            let shortName = ethers.BigNumber.from(res1.class)
                            nftAction.getCoopaLevel(res2.tokenId)
                                .then(res3 => {
                                    objCoopa.level = ethers.BigNumber.from(res3).toString()
                                    objCoopa.headerBg = 'assets/img/evolution-' + getCoopaEvolution(objCoopa.level,objCoopa.rare) + '.png'
                                    objCoopa.shortName = lsCoopaMap[shortName].shortName + getCoopaEvolution(objCoopa.level,objCoopa.rare)
                                    resolve(objCoopa);
                                })
                        })
                    })
            })
            .catch(err=>{
                console.log(err);
            })
        })

    }
    const callBackGetLsMarket = () => {
        marketsAction.getMarketSize().then(
            res => {
                setMarketSize(ethers.BigNumber.from(res).toString())
                fetchMulltiCallAllMarket(ethers.BigNumber.from(res).toString())
                // getLsMarket(ethers.BigNumber.from(res).toString(),pageSize,1)
            }
        );
    }


    const getLsCallgetCoopa = (value) => {
        const arr = []
        for (let i of value) {
            let obj = {}
            const tokenId = ethers.BigNumber.from(i.toString()).toString()
            obj.address = contractAddress.coopaNFT
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
            obj.address = contractAddress.coopaNFT
            obj.name = 'coopaLevel'
            obj.params = [tokenId]
            arr.push(obj);
        }
        return arr
    }
    const getLsMarketMulti = (value) => {
        const promises = [];
        for (let i = 0; i < value ; i++) {
            let obj = {}
            obj.address = contractAddress.market
            obj.name = 'tokenSaleByIndex'
            obj.params = [i]
            promises.push(obj);
        }
        return promises
    }

    const getLsMarketMultiOrderSale = (value) => {
        const arr = []
        for (let i of value) {
            let obj = {}
            const tokenId = ethers.BigNumber.from(i.toString()).toString()
            obj.address = contractAddress.market
            obj.name = 'orderSale'
            obj.params = [tokenId]
            arr.push(obj);
        }
        return arr
    }
    const mapLsCoopa = (values,values2,lsId,lsOrderInfo) => {
        const lsResults = []
        for (let k in values) {
            let objCoopa = {}
            let i = values[k]
            let j = values2[k]

            objCoopa.id = lsId[k][0].toString()
            objCoopa.price = convertBigNumBer(lsOrderInfo[k][0].price.toString())
            objCoopa.owner = lsOrderInfo[k][0].owner.toString()
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
        setlsMarket(lsResults)
        setMarketFilterData(lsResults)
        setLoading(false)

    }

    const fetchMulltiCallAllMarket = (marketSize) => {
        const lsId = getLsMarketMulti(marketSize)
        multiCall(MarketABi,lsId,provider)
            .then(res=>{
                const lsTokenId = res
                const lsOrderSale = getLsMarketMultiOrderSale(lsTokenId)
                multiCall(MarketABi,lsOrderSale,provider)
                    .then(res => {
                        const lsOrderInfo = res
                        multiCall(NftABi,getLsCallgetCoopa(lsTokenId),provider)
                        .then(res => {
                            const lsCoopaTemp1 = res
                            multiCall(NftABi,getLsCallgetCoopaLv(lsTokenId),provider)
                                .then(res=>{
                                    mapLsCoopa(lsCoopaTemp1,res,lsTokenId,lsOrderInfo)
                                })
                        })


                    })
            })
    }


    // const getLsMarket = (marketSize,pageSize,page)=> {
    //     const promises = [];
    //     const countStart = pageSize*(page-1)
    //     for (let i = countStart; i < (pageSize+countStart) && i < marketSize ; i++) {
    //         promises.push(getAsync(i));
    //     }
    //     Promise.all(promises).then(res => {
    //         setlsMarket(res)
    //         setLoading(false)
    //     });
    // }

    const lsRare = [1,2,3,4,5,6]
    const lsLvl = [1,2,3,4,5,6]
    const setFilter = () => {
        let lsResult = lsMarket
        if (lsFilterRare.length > 0) {
            lsResult = lsResult.filter(item=>lsFilterRare.includes(item.rare))
        }
        if (lsFilterLv.length > 0) {
            lsResult = lsResult.filter(item=>lsFilterLv.includes(item.level))
        }
        if (lsFilterTribe.length > 0) {
            lsResult = lsResult.filter(item=>lsFilterTribe.includes(item.tribe))
        }
        if (lsFilterRare.length === 0 && lsFilterLv.length === 0 && lsFilterTribe.length === 0) {
            lsResult = lsMarket
        }
        setMarketFilterData(lsResult)
    }
    const onResetFilter = () =>{
        setMarketFilterData(lsMarket)
        for (const i in lsRare){
            document.getElementById('filterRare' + i).checked = false
        }
        for (const i in lsLvl){
            document.getElementById('filterLevel' + i).checked = false
        }
        for (const i in lsTribeMarket){
            document.getElementById('filterTribe' + i).checked = false
        }
        setLsFilterTribe([])
        setLsFilterRare([])
        setLsFilterLv([])
    }
    const CheckboxRare = (event) => {
        let currentFilterRare = lsFilterRare
        if (event.target.checked) {
            if (!currentFilterRare.includes(event.target.value)) {
                currentFilterRare.push(event.target.value)
                setLsFilterRare(currentFilterRare)
                setFilter()
            }
        }
        else {
            currentFilterRare.splice(currentFilterRare.indexOf(event.target.value),1)
            setLsFilterRare(currentFilterRare)
            setFilter()
        }

    }
    const CheckboxLv = (event) => {
        let currentFilterLv = lsFilterLv
        if (event.target.checked) {
            if (!currentFilterLv.includes(event.target.value)) {
                currentFilterLv.push(event.target.value)
                setLsFilterLv(currentFilterLv)
                setFilter()

            }
        }
        else {
            currentFilterLv.splice(currentFilterLv.indexOf(event.target.value),1)
            setLsFilterLv(currentFilterLv)
            setFilter()
        }

    }

    const CheckboxTribe = (event) => {
        let currentFilterTribe = lsFilterTribe
        if (event.target.checked) {
            if (!currentFilterTribe.includes(event.target.value)) {
                currentFilterTribe.push(event.target.value)
                setLsFilterTribe(currentFilterTribe)
                setFilter()

            }
        }
        else {
            currentFilterTribe.splice(currentFilterTribe.indexOf(event.target.value),1)
            setLsFilterTribe(currentFilterTribe)
            setFilter()
        }

    }
    function compareASC( a, b ) {
      if (parseInt(a.price) < parseInt(b.price)){
        return 1;
      }
      if (parseInt(a.price) > parseInt(b.price)){
        return -1;
      }
      return 0;
    }
    function compareDESC( a, b ) {
      if (parseInt(a.price) < parseInt(b.price)){
        return -1;
      }
      if (parseInt(a.price) > parseInt(b.price)){
        return 1;
      }
      return 0;
    }
    const sortPrice = () =>{
        setSortType(sortType === 'asc' ? 'desc' : 'asc')
        const newData = [...marketFilterData]
        setMarketFilterData(sortType === 'asc' ? newData.sort(compareASC) : newData.sort(compareDESC))
    }
    return (
        <div className="main">
            <Spin spinning={loading} indicator={LoadingFC}>
            <div className="banner-section bg bg_img market-section">
                <Container style={{width:'100%'}}>
                    <div className="justify-content-center row">
                        <div className="text-center col-md-12 col-lg-8">
                            <div className="starter-pack-title">
                            <h1><h3 style={{textAlign:'center'}}>{marketSize} Planet For Sale</h3>
                            </h1>
                                </div>
                        </div>
                    </div>
                    <div className={'row col-sm-12'}>
                    {/*<Spin >*/}

                        <Col sm={24} xs={24} md={24} lg={18} xl={18} xxl={18}>
                            {marketFilterData.length > 0 ?
                                <MartketplaceTab wallet={wallet} data={marketFilterData} toggleLoading={(value)=>setLoading(value)} pageSize={pageSize} marketSize={marketSize} callBack={()=>callBackGetLsMarket()}/> :null }
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
                    >
                            <div className="market-search">
                                <div className="market-search__filter">
                                    <div className="form-group"><h5><font style={{verticalAlign: 'inherit'}}><font
                                        style={{verticalAlign: 'inherit'}}>Rare</font></font></h5>
                                        <div>
                                            {lsRare.map((item,index) =>
                                                <div className="filter-checkbox" key={"filterRare" + index}><input onClick={event => CheckboxRare(event)}
                                                    className="filter-checkbox-input"
                                                    type="checkbox" id={"filterRare"+index}
                                                    value={item}/><label
                                                    className="filter-checkbox-label" htmlFor={"filterRare"+index}><font
                                                    style={{verticalAlign: 'inherit'}}><font
                                                    style={{verticalAlign: 'inherit'}}>{item}</font></font></label></div>
                                            )
                                            }
                                        </div>
                                    </div>
                                    <div className="form-group"><h5><font style={{verticalAlign: 'inherit'}}><font
                                        style={{verticalAlign: 'inherit'}}>Level</font></font></h5>
                                        <div>
                                            {lsLvl.map((item,index) =>
                                            <div className="filter-checkbox" key={"filterLevel" + index}><input className="filter-checkbox-input"
                                                                                 onClick={event => CheckboxLv(event)}
                                                                                    type="checkbox" id={"filterLevel"+index}
                                                                                    value={item}/><label
                                                className="filter-checkbox-label" htmlFor={"filterLevel"+index}><font
                                                style={{verticalAlign: 'inherit'}}><font
                                                style={{verticalAlign: 'inherit'}}>{item}</font></font></label></div>
                                                )}
                                        </div>
                                    </div>
                                    <div className="form-group"><h5><font style={{verticalAlign: 'inherit'}}><font
                                        style={{verticalAlign: 'inherit'}}>Level</font></font></h5>
                                        <div>
                                            {lsTribeMarket.map((item,index) =>
                                            <div className="filter-checkbox" key={"filterTribe" + index}><input className="filter-checkbox-input"
                                                                                 onClick={event => CheckboxTribe(event)}
                                                                                    type="checkbox" id={"filterTribe"+index}
                                                                                    value={item}/><label
                                                className="filter-checkbox-label" htmlFor={"filterTribe"+index}><font
                                                style={{verticalAlign: 'inherit'}}><font
                                                style={{verticalAlign: 'inherit'}}>{item}</font></font></label></div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Button type={'primary'} onClick={()=>sortPrice()}><span className={'sort-price-icon'}>Sort price {sortType === 'asc' ? <SortAscendingOutlined style={{fontSize:19}} />: <SortDescendingOutlined style={{fontSize:19}} />}</span></Button>
                                    <Button type={'danger'} style={{marginLeft:'10px'}} onClick={()=>onResetFilter()}>Reset</Button>
                                </div>
                            </div>
                        </Col>
                    </div>
                </Container>
            </div>
            </Spin>
        </div>
    );
}

export default withRouter(Marketplace);