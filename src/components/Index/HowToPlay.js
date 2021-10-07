import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function Challenge() {
    return (
        <div className="challenge-section" id="howtoplay">
            <Container>
                <div className="challenge-area">
                    <Row className="justify-content-center mb-30">
                        <Col className="text-center">
                            <h2 className="section-title">How To Play</h2>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mb-30-none">
                        <Col lg={4} md={8} sm={12} className="mb-30">
                            <div className="challenge-item text-center">
                                <div className="challenge-thumb">
                                    <img
                                        src="/assets/img/icon-owned.svg"
                                        alt="owned"
                                    />
                                </div>
                                <div className="challenge-content">
                                    <h3 className="title">Owned</h3>
                                    <p>
                                        To participate in CryptoZoon, you must
                                        have at least one coopa or items. You can
                                        own in a variety of methods, including
                                        purchasing on the NFT marketplace,
                                        purchasing eggs, or purchasing from
                                        other players.
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={8} sm={12} className="mb-30">
                            <div className="challenge-item text-center">
                                <div className="challenge-thumb">
                                    <img
                                        src="/assets/img/icon-play.svg"
                                        alt="play"
                                    />
                                </div>
                                <div className="challenge-content">
                                    <h3 className="title">Play-To-Earn</h3>
                                    <p>
                                        Perform daily quests to acquire more
                                        ZOON tokens and get profit while
                                        assisting CryptoZoon in escaping the
                                        Yaki empire's invasion.
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={8} sm={12} className="mb-30">
                            <div className="challenge-item text-center">
                                <div className="challenge-thumb">
                                    <img
                                        src="/assets/img/icon-repeat.svg"
                                        alt="repeat"
                                    />
                                </div>
                                <div className="challenge-content">
                                    <h3 className="title">Repeat</h3>
                                    <p>
                                        Use ZOON tokens to acquire more coopas
                                        with higher level to enhance your
                                        profits with CryptoZoon.
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}
