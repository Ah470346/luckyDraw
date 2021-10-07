import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Partners() {
    return (
        <div className="contact-section pt-120" id="partners">
            <Container>
                <Row className="mb-30">
                    <Col className="text-center">
                        <h2 className="section-title text-primary">
                            Partner & Backers
                        </h2>
                    </Col>
                </Row>
                <Row className="mb-30-none justify-content-center">
                    <Col
                        lg={3}
                        md={6}
                        sm={6}
                        className="mb-30 text-center d-flex"
                    >
                        <a
                            href="#partners"
                            className="d-flex align-items-center"
                        >
                            <div className="contact-item text-center">
                                <div className="contact-item-icon">
                                    <img src="/assets/img/partners/BSC.png" />
                                </div>
                            </div>
                        </a>
                    </Col>
                    <Col
                        lg={3}
                        md={6}
                        sm={6}
                        className="mb-30 text-center d-flex"
                    >
                        <a
                            href="#"
                            target="_blank" rel="noreferrer"
                            className="d-flex align-items-center"
                        >
                            <div className="contact-item text-center">
                                <div className="contact-item-icon">
                                    <img src="/assets/img/partners/gate.png" />
                                </div>
                            </div>
                        </a>
                    </Col>
                    <Col
                        lg={3}
                        md={6}
                        sm={6}
                        className="mb-30 text-center d-flex"
                    >
                        <a
                            href="#partners"
                            className="d-flex align-items-center"
                        >
                            <div className="contact-item text-center">
                                <div className="contact-item-icon">
                                    <img src="/assets/img/partners/bitpie.png" />
                                </div>
                            </div>
                        </a>
                    </Col>
                    <Col
                        lg={3}
                        md={6}
                        sm={6}
                        className="mb-30 text-center d-flex"
                    >
                        <a
                            href="#"
                            target="_blank" rel="noreferrer"
                            className="d-flex align-items-center"
                        >
                            <div className="contact-item text-center">
                                <div className="contact-item-icon">
                                    <img src="/assets/img/partners/Mexc.png" />
                                </div>
                            </div>
                        </a>
                    </Col>
                    <Col
                        lg={3}
                        md={6}
                        sm={6}
                        className="mb-30 text-center d-flex"
                    >
                        <a
                            href="https://coinmarketcap.com/alexandria/article/what-is-cryptozoon"
                            target="_blank" rel="noreferrer"
                            className="d-flex align-items-center"
                        >
                            <div className="contact-item text-center">
                                <div className="contact-item-icon">
                                    <img src="/assets/img/partners/cmc.png" />
                                </div>
                            </div>
                        </a>
                    </Col>
                    <Col
                        lg={3}
                        md={6}
                        sm={6}
                        className="mb-30 text-center d-flex"
                    >
                        <a
                            href="#partners"
                            className="d-flex align-items-center"
                        >
                            <div className="contact-item text-center">
                                <div className="contact-item-icon">
                                    <img src="/assets/img/partners/Pancake.png" />
                                </div>
                            </div>
                        </a>
                    </Col>
                    <Col
                        lg={3}
                        md={6}
                        sm={6}
                        className="mb-30 text-center d-flex"
                    >
                        <a
                            href="#partners"
                            className="d-flex align-items-center"
                        >
                            <div className="contact-item text-center">
                                <div className="contact-item-icon">
                                    <img src="/assets/img/partners/babyswap.png" />
                                </div>
                            </div>
                        </a>
                    </Col>
                    <Col
                        lg={3}
                        md={6}
                        sm={6}
                        className="mb-30 text-center d-flex"
                    >
                        <a
                            href="#partners"
                            className="d-flex align-items-center"
                        >
                            <div className="contact-item text-center">
                                <div className="contact-item-icon">
                                    <img src="/assets/img/partners/peckshield.png" />
                                </div>
                            </div>
                        </a>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
