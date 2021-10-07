import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Pie} from "@ant-design/charts";

const PieToken = () => {
    var data = [
    {
      type: 'GAME REWARD',
      value: 30,
    },
    {
      type: 'MARKETING (LOCK 6 MONTHS)',
      value: 5,
    },
    {
      type: 'AIRDROP',
      value: 5,
    },
    {
      type: 'DEV (LOCK 6 MONTHS)',
      value: 10,
    },
    {
      type: 'PRESALE',
      value: 25,
    },
    {
      type: 'LP (LOCK 6 MONTHS)',
      value: 25,
    },
  ];
  var config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    autoFit:true,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{percentage}',
    style: {
      fill: '#ffffff',
      opacity: 0.6,
      fontSize: 20
    },
    },
      tooltip:{
        color: '#333'
      },
      legend: {

      layout: 'vertical',
      position: 'right',
          itemStyle: {
               fontSize: '10px',
               letterSpacing: '0.25px',
               fontWeight: '500',
               color: '#ffffff',
            },
      itemMarginBottom: 18,
        x: -30,
        y: -2,
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  };

  return <Pie {...config} />;
}


export default function Client() {
    return (
        <div className="client-section pt-120 pb-120" id="tokenomics">
            <div className="client-element-two">
                <img src="/assets/images/circle-2.png" alt="shape" />
            </div>
            <div className="client-element-three">
                <img src="/assets/images/join/icon-5.png" alt="shape" />
            </div>
            <div className="client-element-four">
                <img src="/assets/images/join/icon-6.png" alt="shape" />
            </div>
            <div className="client-element-five">
                <img src="/assets/images/join/icon-7.png" alt="shape" />
            </div>
            <div className="client-element-six">
                <img src="/assets/images/join/icon-5.png" alt="shape" />
            </div>
            <div className="client-element-seven">
                <img src="/assets/images/join/icon-6.png" alt="shape" />
            </div>
            <div className="client-element-eight">
                <img src="/assets/images/join/icon-7.png" alt="shape" />
            </div>

            <Container>
                <Row className="justify-content-center align-items-center mb-30-none">
                    <Col lg={10} className="text-center">
                        <h3 className="sub-title mb-4 text-primary">
                            Tokenomics
                        </h3>
                        <PieToken />
                        {/*<img src="/assets/img/tokenomics.png" />*/}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
