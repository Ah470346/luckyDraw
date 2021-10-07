import React, {useEffect, useRef, useState} from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import {useWallet} from "use-wallet";
import {Link} from 'react-router-dom';
import {Col, Modal, Row} from "antd";
import {BarsOutlined} from '@ant-design/icons';
import {ethers} from "ethers";
import {useERC20Action} from "../hook/hookErc20";


export const Header = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navRef = useRef(null);
    const wallet = useWallet();
    const account = wallet.account;
    const {balanceOf} = useERC20Action();
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
            setBalanceCPA(res.toString()/(10e17))
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
                                            <img src="assets/images/cart.png" alt=""/>
                                                <span>06</span>
                                        </div>
                                        <div className="amount">
                                            <h4 className="mony">{balanceCPA ? balanceCPA : 0}</h4>
                                            <p>To checkout</p>
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
                                <Link to={'/'} className="active">Home</Link>
                            </li>
                            <li>
                                <Link to={'/result'}>Results</Link>
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
    </>
    );
}
