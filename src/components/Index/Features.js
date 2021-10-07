import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function About() {
    return (
        <div className="about-section pb-120" id="features">
            <div className="about-element-one">
                <img src="assets/images/about/icon-1.png" alt="icon" />
            </div>
            <div className="about-element-two">
                <img src="assets/images/about/icon-2.png" alt="icon" />
            </div>
            <div className="about-element-three">
                <img src="assets/images/about/icon-3.png" alt="icon" />
            </div>
            <div className="about-element-four">
                <img src="assets/images/about/icon-4.png" alt="icon" />
            </div>
            <div className="about-element-five">
                <img src="assets/images/about/icon-5.png" alt="icon" />
            </div>
            <div className="about-element-six">
                <img src="assets/images/about/icon-5.png" alt="icon" />
            </div>
            <div className="about-element-seven">
                <img src="assets/images/about/icon-6.png" alt="icon" />
            </div>
            <div className="about-element-eight">
                <img src="assets/images/about/icon-7.png" alt="icon" />
            </div>
            <div className="about-element-nine">
                <img src="assets/images/about/icon-8.png" alt="icon" />
            </div>
            <div className="about-element-ten">
                <img src="assets/images/about/icon-9.png" alt="icon" />
            </div>

            <Container>
                <Row className="justify-content-center align-items-center mb-30-none">
                    <Col lg={{ span: 12, order: 0 }} className="mb-30 order-1">
                        <div className="about-item-area">
                            <div className="row justify-content-center mb-30">
                                <h2>FEATURES</h2>
                            </div>
                            <div className="row justify-content-center mb-30">
                                <h3>Your Heroes and Equipment are securely stored on the blockchain in the form of an NFT.</h3>
                            </div>
                            <div className="row justify-content-center mb-30-none">
                                <Col lg={3}>
                                    <div className="about-item text-center">
                                        <div className="about-icon">
                                            <img
                                                src="/assets/img/feature/ownership.png"
                                                alt="fight"
                                            />
                                        </div>
                                        <h3 className="title">OWNERSHIP</h3>
                                        <div>
                                            <p>Your Heroes and Equipment are securely stored on the blockchain in the form of an NFT.</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={3}>
                                    <div className="about-item about-item--style text-center">
                                        <div className="about-icon">
                                            <img
                                                src="/assets/img/feature/marketplace.png"
                                                alt="farming"
                                            />
                                        </div>
                                        <h3 className="title">MARKETPLACE</h3>
                                        <div>
                                            <p>Use the Marketplace to find your best Hero and trade rare equipment with other players.</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={3} className="mb-30">
                                    <div className="about-item text-center">
                                        <div className="about-icon">
                                            <img
                                                src="/assets/img/feature/floorPrice.png"
                                                alt="breeding"
                                            />
                                        </div>
                                        <h3 className="title">
                                            FLOOR PRICE
                                        </h3>
                                        <div>
                                            <p>NFT Heroes have a Floor Price pegged in BNB. It will be increased through trading and other gaming activities.</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={3} className="mb-30">
                                    <div className="about-item about-item--style-two text-center">
                                        <div className="about-icon">
                                            <img
                                                src="/assets/img/feature/wargame.png"
                                                alt="training"
                                            />
                                        </div>
                                        <h3 className="title">
                                            WAR GAME
                                        </h3>
                                        <div>
                                            <p>Preparing for the War by training your best Heroes, equipping them with the best Items and learning powerful Skills.</p>
                                        </div>
                                    </div>
                                </Col>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
