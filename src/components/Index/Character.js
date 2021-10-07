import React from 'react';
import {Carousel, Col, Container, Row} from 'react-bootstrap';

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
                                <h2>CHARACTERS</h2>
                            </div>
                            <div className="row justify-content-center mb-30-none">
                                <Col lg={12}>
                                    <Carousel>
                                      <Carousel.Item>
                                          <Row>
                                              <Col lg={7}>
                                                <img
                                                  className="d-block w-100"
                                                  src="assets/img/characters/elfbg.png"
                                                  alt="First slide"
                                                />
                                                <Carousel.Caption>
                                                      <h3>First slide label</h3>
                                                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                                    </Carousel.Caption>
                                                </Col>
                                              <Col lg={5}>
                                                <h2>ORC<span className={'characters-rate'}>RATE 24,6%</span></h2>
                                                  <p>Sheer might is everything to the Orc.
                                                      Every Orc is born with a muscular body coupled with seemingly never ending strength.
                                                      On any battlefield, their physical attributes alone terrorize anyone facing them.</p>
                                                  <Row>
                                                      <Col lg={4}>
                                                        <div className={'row'}>
                                                            <Col lg={6}>
                                                                <img src="assets/img/skill/skill-1.png"/>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <span className={"characters-skill-name"}>Skill 1</span>
                                                            </Col>
                                                        </div>
                                                      </Col>
                                                      <Col lg={4}>
                                                        <div className={'row'}>
                                                            <Col lg={6}>
                                                                <img src="assets/img/skill/skill-2.png"/>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <span className={"characters-skill-name"}>Skill 1</span>
                                                            </Col>
                                                        </div>
                                                      </Col>
                                                      <Col lg={4}>
                                                        <div className={'row'}>
                                                            <Col lg={6}>
                                                                <img src="assets/img/skill/skill-3.png"/>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <span className={"characters-skill-name"}>Skill 1</span>
                                                            </Col>
                                                        </div>
                                                      </Col>
                                                  </Row>
                                              </Col>
                                            </Row>
                                      </Carousel.Item>
                                      <Carousel.Item>
                                          <Row>
                                              <Col lg={7}>
                                                <img
                                                  className="d-block w-100"
                                                  src="assets/img/characters/humanbg.png"
                                                  alt="First slide"
                                                />
                                                <Carousel.Caption>
                                                      <h3>First slide label</h3>
                                                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                                    </Carousel.Caption>
                                                </Col>
                                              <Col lg={5}>
                                                <h2>ORC<span className={'characters-rate'}>RATE 24,6%</span></h2>
                                                  <p>Sheer might is everything to the Orc.
                                                      Every Orc is born with a muscular body coupled with seemingly never ending strength.
                                                      On any battlefield, their physical attributes alone terrorize anyone facing them.</p>
                                                  <Row>
                                                      <Col lg={4}>
                                                        <div className={'row'}>
                                                            <Col lg={6}>
                                                                <img src="assets/img/skill/skill-1.png"/>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <span className={"characters-skill-name"}>Skill 1</span>
                                                            </Col>
                                                        </div>
                                                      </Col>
                                                      <Col lg={4}>
                                                        <div className={'row'}>
                                                            <Col lg={6}>
                                                                <img src="assets/img/skill/skill-2.png"/>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <span className={"characters-skill-name"}>Skill 1</span>
                                                            </Col>
                                                        </div>
                                                      </Col>
                                                      <Col lg={4}>
                                                        <div className={'row'}>
                                                            <Col lg={6}>
                                                                <img src="assets/img/skill/skill-3.png"/>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <span className={"characters-skill-name"}>Skill 1</span>
                                                            </Col>
                                                        </div>
                                                      </Col>
                                                  </Row>
                                              </Col>
                                            </Row>
                                      </Carousel.Item>
                                        <Carousel.Item>
                                          <Row>
                                              <Col lg={7}>
                                                <img
                                                  className="d-block w-100"
                                                  src="assets/img/characters/angelbg.png"
                                                  alt="First slide"
                                                />
                                                <Carousel.Caption>
                                                      <h3>First slide label</h3>
                                                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                                    </Carousel.Caption>
                                                </Col>
                                              <Col lg={5}>
                                                <h2>ORC<span className={'characters-rate'}>RATE 24,6%</span></h2>
                                                  <p>Sheer might is everything to the Orc.
                                                      Every Orc is born with a muscular body coupled with seemingly never ending strength.
                                                      On any battlefield, their physical attributes alone terrorize anyone facing them.</p>
                                                  <Row>
                                                      <Col lg={4}>
                                                        <div className={'row'}>
                                                            <Col lg={6}>
                                                                <img src="assets/img/skill/skill-1.png"/>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <span className={"characters-skill-name"}>Skill 1</span>
                                                            </Col>
                                                        </div>
                                                      </Col>
                                                      <Col lg={4}>
                                                        <div className={'row'}>
                                                            <Col lg={6}>
                                                                <img src="assets/img/skill/skill-2.png"/>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <span className={"characters-skill-name"}>Skill 1</span>
                                                            </Col>
                                                        </div>
                                                      </Col>
                                                      <Col lg={4}>
                                                        <div className={'row'}>
                                                            <Col lg={6}>
                                                                <img src="assets/img/skill/skill-3.png"/>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <span className={"characters-skill-name"}>Skill 1</span>
                                                            </Col>
                                                        </div>
                                                      </Col>
                                                  </Row>
                                              </Col>
                                            </Row>
                                      </Carousel.Item>
                                    </Carousel>
                                </Col>

                            </div>
                        </div>
                    </Col>
                    {/*<Col lg={{ span: 6, order: 1 }} className="mb-30 order-0">*/}
                    {/*    <div className="about-content">*/}
                    {/*        <h3 className="sub-title">Play-to-earn Features</h3>*/}
                    {/*        <h2 className="title">*/}
                    {/*            The first ecosystem to combine the greatest*/}
                    {/*            aspects of gaming and digital collectibles*/}
                    {/*        </h2>*/}
                    {/*        <p>*/}
                    {/*            CryptoZoon is inspired by Pokemon Story, our*/}
                    {/*            mission is to build a comprehensive platform of*/}
                    {/*            digital monsters that will enable millions of*/}
                    {/*            individuals to participate in the NFT and*/}
                    {/*            blockchain-based gaming world in a simple,*/}
                    {/*            creative, and enjoyable way.*/}
                    {/*        </p>*/}
                    {/*        <div className="about-content-btn">*/}
                    {/*            <a*/}
                    {/*                href="#"*/}
                    {/*                className="cmn-btn"*/}
                    {/*                target="_blank"*/}
                    {/*                rel="noreferrer"*/}
                    {/*            >*/}
                    {/*                Read Our Story*/}
                    {/*                <i className="fas fa-long-arrow-alt-right"></i>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</Col>*/}
                </Row>
            </Container>
        </div>
    );
}
