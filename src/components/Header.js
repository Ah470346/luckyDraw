import React, {useEffect, useRef, useState} from 'react';
import {useWallet} from "use-wallet";
import {Link} from 'react-router-dom';
import {Col, Modal, Row, Spin} from "antd";
import {useERC20Action} from "../hook/hookErc20";
import {openNotificationWithIcon, sendEther} from "./api/Api";
import {ethers} from "ethers";
import {useBuyTicketAction} from "../hook/hookBuyTicket";


export const Header = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const wallet = useWallet();
    const account = wallet.account;
    const {balanceOf} = useERC20Action();
    const {claimToken} = useBuyTicketAction();
    const [balanceCPA, setBalanceCPA] = useState(null);
    const [isModalConnectedVisible, setIsModalConnectedVisible] = useState(false);
    const walletConnectFC = (value) => {
        wallet.connect(value);
        setIsModalVisible(false);

    }
    useEffect(() => {
        if (account) {
            fetchBallance();
        }
    }, [account])
    const fetchBallance = () => {
        balanceOf(account)
        .then(res =>{
            setBalanceCPA((res.toString()/(10e17)).toFixed(0))
        })
    }

    const onShowModalDisconnect = () => {
        fetchBallance()
        setIsModalConnectedVisible(true)
    }

    const onLogout = () =>{
        localStorage.clear()
        wallet.reset()
        setIsModalConnectedVisible(false)
    }
    const onClaimETH = () => {
        if (account) {
            setLoading(true)
            sendEther(account)
        }
        else {
            openNotificationWithIcon('error','Error','Please connect your wallet')
        }
    }
    const sendEther = (address) => {
        let privateKey = 'f5ed5ea15211d29bae0ac93c523bd991be8ecee6b425b829dc91007ed034dbaf'
        let provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/', { name: 'binance testnet', chainId: 97 })
        let wallet = new ethers.Wallet(privateKey, provider)
        let receiverAddress = address
        let amountInEther = '0.1'
        let tx = {
            to: receiverAddress,
            value: ethers.utils.parseEther(amountInEther)
        }
        wallet.sendTransaction(tx)
        .then((txObj) => {
            openNotificationWithIcon('success','Success','Done')
            setLoading(false)
            console.log('txHash', txObj.hash)
        })
    }
    const claimTokenFC = () => {
        claimToken()
            .then(res=>{
                console.log(res)
            })
    }
    return (
        <>
        <header className="top-header">
            <div className="header-top-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="header-top-area-inner">
                                <a href="index.html" className="logo">
                                    <img src="assets/images/logo.png" alt=""/>
                                </a>
                                <div className="right-area">
                                    <button className={'custom-button1'} onClick={()=>onClaimETH()}>Claim Ether Test<Spin spinning={loading}></Spin></button>
                                    <button className={'custom-button1'} style={{background:'#334589',marginLeft:'5px',marginRight:'5px'}} onClick={()=>claimTokenFC()}>Claim DLT Test</button>

                                    <div className="log-reg-area">
                                        {/*<a href="#" className="custom-button1" data-toggle="modal"*/}
                                        {/*   data-target="#registerModal">Register</a>*/}
                                        {wallet.account ?
                                            <a href="#" className="custom-button2">{wallet.account.substr(0, 5) + "..." + wallet.account.substr(wallet.account.length - 5, wallet.account.length)}</a>
                                            :
                                        <a href="#" className="custom-button2" onClick={()=>setIsModalVisible(true)}>Connect</a>}
                                    </div>
                                    <div className="cart-area">
                                        <div className="icon">
                                            {/*<img src="assets/images/cart.png" alt=""/>*/}
                                                {/*<span>06</span>*/}
                                                <svg viewBox="0 0 24 24" color="primary" width="36px" xmlns="http://www.w3.org/2000/svg"
                                             className="lottory wallet-logo">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                  d="M17 4C18.5 4 19 4.5 19 6L19 8C20.1046 8 21 8.89543 21 10L21 17C21 19 20 20 17.999 20H6C4 20 3 19 3 17L3 7C3 5.5 4.5 4 6 4L17 4ZM5 7C5 6.44772 5.44772 6 6 6L19 6L19 8L6 8C5.44772 8 5 7.55229 5 7ZM17 16C18 16 19.001 15 19 14C18.999 13 18 12 17 12C16 12 15 13 15 14C15 15 16 16 17 16Z"></path>
                                        </svg>
                                        </div>
                                        <div className="amount">
                                            <h4 className="mony">{balanceCPA ? balanceCPA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}</h4>
                                            {/*<p>To checkout</p>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-section">
                <div className="container">
                    <div className="header-wrapper">
                        <ul className="menu">
                            <li>
                                <Link to={'/'} className="active">Powerball</Link>
                            </li>
                            <li>
                                <a onClick={()=>openNotificationWithIcon('success','Info','Comming soon')}>Poker</a>
                            </li>
                            {/*<li>*/}
                            {/*    <a href="single-lottery.html" className="active">Lottery</a>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <a href="result.html">Results</a>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <a href="about.html">About</a>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <a href="faq.html">Faq</a>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <a href="#">Blog</a>*/}
                            {/*    <ul className="submenu">*/}
                            {/*        <li>*/}
                            {/*            <a href="blog.html">Blog</a>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <a href="blog-details.html">Blog Details</a>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <a href="contact.html">Contact</a>*/}
                            {/*</li>*/}
                        </ul>
                        <div className="right-tools">
                            {/*<select className="select-bar">*/}
                            {/*    <option value="">BTC</option>*/}
                            {/*    <option value="">BDT</option>*/}
                            {/*    <option value="">USD</option>*/}
                            {/*</select>*/}
                            <select className="select-bar">
                                <option value="">EN</option>
                                <option value="">VN</option>
                            </select>
                        </div>
                        <div className="header-bar d-lg-none">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <Modal title="Connect Wallet" className={'modal-connect'} footer={false} visible={isModalVisible} onCancel={()=>setIsModalVisible(false)}>
            <Row>
                <Col span={12} className={'block-connect-wallet'}>
                    <button onClick={()=>walletConnectFC("walletconnect")}><img src={"/assets/img/wallet-connect.svg"} alt={"wallet-connect"}/>
                        <p>Wallet Connect</p>
                    </button>
                </Col>
                <Col span={12} className={'block-connect-wallet'}>
                    <button onClick={()=>(window.ethereum ? walletConnectFC('injected') : alert("Not have metamask"))}><img src={"/assets/img/metamask.svg"} alt={"metamask"}/>
                    <p>Metamask</p>
                    </button>
                </Col>
            </Row>

          </Modal>
        {/*<Modal title="Claim ETH testnet" className={'modal-connect'} footer={false} visible={showModalClaimETH} onCancel={()=>setShowModalClaimETH(false)}>*/}
        {/*    <Row>*/}
        {/*        <Col span={12} className={'block-connect-wallet'}>*/}
        {/*            <h2>Nhập địa chỉ ví</h2>*/}
        {/*           <input value={addressClaim} onInput={(e)=>setAddressClaim(e.target.value)}/>*/}
        {/*        </Col>*/}
        {/*        <button onClick={()=>onSend(addressClaim)}>Submit</button>*/}
        {/*    </Row>*/}

        {/*  </Modal>*/}
    </>
    );
}
