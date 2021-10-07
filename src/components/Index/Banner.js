import React from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';

export default function Banner() {
    return (
        <div className="banner-section bg bg_img">
            <div className="banner-element-eight">
                <img src="/assets/images/banner/line3.png" alt="element" />
            </div>
            <div className="banner-element-nine">
                <img src="/assets/images/banner/line4.png" alt="element" />
            </div>
            <div className="banner-element-twelve">
                <img src="/assets/images/banner/line3.png" alt="element" />
            </div>
            <div className="banner-element-thirteen">
                <img src="/assets/images/banner/line6.png" alt="element" />
            </div>
            <div className="banner-element-fourteen">
                <img src="/assets/images/banner/line6.png" alt="element" />
            </div>
            <div className="banner-element-fifteen">
                <img src="/assets/images/banner/line3.png" alt="element" />
            </div>
            <div className="banner-element-sixteen">
                <img src="/assets/images/banner/line7.png" alt="element" />
            </div>
            <div className="banner-element-seventeen">
                <img src="/assets/images/banner/line1.png" alt="element" />
            </div>
            <div className="banner-element-eightteen">
                <img src="/assets/images/banner/manyline.png" alt="element" />
            </div>
            <div className="banner-element-nineteen">
                <img src="/assets/images/banner/whitedot.png" alt="element" />
            </div>

            <Container className="d-flex align-content-center align-items-center">
                <div className="justify-content-center row col-sm-12">
                    <div className="text-center mb-4 col-sm-12 col-md-6 col-lg-4">
                        <div className="card-egg card">
                            <div className="card-header">
                                <img src="../assets/img/characters/fee-active.svg" alt="a"
                                                              className="gem-img"/>
                            </div>
                            <div className="card-body"><h3>Fusion Stone</h3>
                                <div className="price">
                                    <div className="price-title">Price</div>
                                    <div className="price-value"><img src="../../assets/img/sun-coin.svg"
                                                                      width="1.5rem"/>
                                        <div style={{display: 'inline-flex', alignItems: 'center'}}><span>5,500</span></div>
                                    </div>
                                </div>
                                <div className="price">
                                    <div className="price-title">Created</div>
                                    <div className="price-value">
                                        <div style={{display: 'inline-flex', alignItems: 'center'}}><span>20,000</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="price">
                                    <div className="price-title">Limit</div>
                                    <div className="price-value">
                                        <div style={{display: 'inline-flex', alignItems: 'center'}}><span>20,000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="button" className="btn btn-danger btn-block">Connect</button>
                                <div className="mt-2"><a
                                    href="https://exchange.pancakeswap.finance/#/swap?inputCurrency=BNB&amp;outputCurrency=0x9D173E6c594f479B4d47001F8E6A95A7aDDa42bC"
                                    target="_blank" className="small">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                         data-icon="external-link-alt"
                                         className="svg-inline--fa fa-external-link-alt fa-w-16 " role="img"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor"
                                              d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>
                                    </svg>
                                    Buy CPA</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mb-4 col-sm-12 col-md-6 col-lg-4">
                        <div className="card-egg card">
                            <div className="card-header"><img alt="a" src="/assets/img/characters/egg.svg"
                                                              className="w-100"/></div>
                            <div className="card-body"><h3>Random Egg</h3>
                                <div className="price">
                                    <div className="price-title">Price</div>
                                    <div className="price-value"><img alt="SUN-coin"
                                                                      src=".../../assets/img/sun-coin.svg"
                                                                      width="1.5rem"/>
                                        <div style={{display: 'inline-flex', alignItems: 'center'}}><span>9,999</span></div>
                                    </div>
                                </div>
                                <div className="price">
                                    <div className="price-title">Payment</div>
                                    <div className="price-value form-group">
                                        <div className="purchase input-group"><select className="form-control">
                                            <option value="CPA">CPA</option>
                                            <option value="BNB">BNB</option>
                                            <option value="BUSD">BUSD</option>
                                        </select></div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="button" className="btn btn-danger btn-block">Connect</button>
                                <div className="mt-2"><a
                                    href="https://exchange.pancakeswap.finance/#/swap?inputCurrency=BNB&amp;outputCurrency=0x9D173E6c594f479B4d47001F8E6A95A7aDDa42bC"
                                    target="_blank" className="small">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                         data-icon="external-link-alt"
                                         className="svg-inline--fa fa-external-link-alt fa-w-16 " role="img"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor"
                                              d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>
                                    </svg>
                                    Buy CPA</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mb-4 col-sm-12 col-md-6 col-lg-4">
                        <div className="card-egg card">
                            <div className="card-header"><img src="../assets/img/characters/cover-active.svg" alt="a"
                                                              className="gem-img"/></div>
                            <div className="card-body"><h3>Proteus Stone</h3>
                                <div className="price">
                                    <div className="price-title">Price</div>
                                    <div className="price-value"><img src="../../assets/img/sun-coin.svg"
                                                                      width="1.5rem"/>
                                        <div style={{display: 'inline-flex', alignItems: 'center'}}><span>3,000</span></div>
                                    </div>
                                </div>
                                <div className="price">
                                    <div className="price-title">Created</div>
                                    <div className="price-value">
                                        <div style={{display: 'inline-flex', alignItems: 'center'}}><span>14,000</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="price">
                                    <div className="price-title">Limit</div>
                                    <div className="price-value">
                                        <div style={{display: 'inline-flex', alignItems: 'center'}}><span>14,000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="button" className="btn btn-danger btn-block">Connect</button>
                                <div className="mt-2"><a
                                    href="https://exchange.pancakeswap.finance/#/swap?inputCurrency=BNB&amp;outputCurrency=0x9D173E6c594f479B4d47001F8E6A95A7aDDa42bC"
                                    target="_blank" className="small">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                         data-icon="external-link-alt"
                                         className="svg-inline--fa fa-external-link-alt fa-w-16 " role="img"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor"
                                              d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>
                                    </svg>
                                    Buy CPA</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
