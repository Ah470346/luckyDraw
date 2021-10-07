import React from 'react';
import { Container, Row, Col, Accordion, Card, Button } from 'react-bootstrap';

export default function Faq() {
    return (
        <div className="pricing-section pt-120" id="faq">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8} className="text-center">
                        <div className="section-header">
                            <h3 className="sub-title">FAQ</h3>
                        </div>
                    </Col>
                </Row>

                <div className="pricing-item-area">
                    <Row className="justify-content-center mb-30-none">
                        <Col lg={8} sm={12} className="mb-30">
                            <div className="pricing-item">
                                <div id="accordion">
                                    <Accordion>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle
                                                    as={Button}
                                                    variant="link"
                                                    eventKey="0"
                                                >
                                                    Why the total supply is
                                                    increasing?
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    <ul>
                                                        <li>
                                                            <b>
                                                                First and
                                                                foremost,
                                                            </b>
                                                            we are timelocked,
                                                            so new tokens cannot
                                                            be minted. All
                                                            tokens originating
                                                            from wallet
                                                            0x00000000.. are
                                                            obtained as a prize
                                                            when you defeat a
                                                            monster.
                                                        </li>
                                                        <li>
                                                            The second point is
                                                            that, as previously
                                                            said, the total
                                                            quantity of Tokens
                                                            in Fight Monster is
                                                            140 million. Tokens
                                                            are distributed at
                                                            initial:
                                                            <b>
                                                                570 million
                                                                tokens.
                                                            </b>
                                                        </li>
                                                        <li>
                                                            <b>
                                                                570 million
                                                                tokens + 140
                                                                million tokens =
                                                                710 million
                                                                tokens.
                                                            </b>
                                                            So what happens if
                                                            this quantity of
                                                            tokens is exceeded?
                                                            We have a very clear
                                                            plan for this; so
                                                            far, more than
                                                            20,000 NFTs have
                                                            been sold, resulting
                                                            in a total of 260
                                                            million tokens
                                                            gathered from the
                                                            community. This
                                                            tokens will continue
                                                            to be used for
                                                            project development
                                                            (Fight Monsters,
                                                            Bosses, Training,
                                                            Farming, ...)
                                                        </li>
                                                        <li>
                                                            Our Max Total Supply
                                                            Is 1 Billion.
                                                        </li>
                                                    </ul>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle
                                                    as={Button}
                                                    variant="link"
                                                    eventKey="1"
                                                >
                                                    Why the asset of CryptoZoon
                                                    game is similar to some
                                                    others?
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body>
                                                    <ul>
                                                        <li>
                                                            We purchased the
                                                            copy rights from the
                                                            <b>
                                                                Unity game
                                                                company,
                                                            </b>
                                                            which are open to
                                                            all game companies,
                                                            and we developed
                                                            these components
                                                            based on our
                                                            concept.
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <b>
                                                                    Link Detail
                                                                </b>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            We have the
                                                            <b>
                                                                Assets Liciense:
                                                            </b>
                                                            From Unity, and we
                                                            already bought Image
                                                            copyright for game
                                                            development.
                                                        </li>
                                                    </ul>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle
                                                    as={Button}
                                                    variant="link"
                                                    eventKey="2"
                                                >
                                                    Dev are Doxxing or Not?
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="2">
                                                <Card.Body>
                                                    <ul>
                                                        <li>
                                                            Because crypto
                                                            currency has not
                                                            been approved by the
                                                            government in our
                                                            country due to a
                                                            legal issue,
                                                            anonymity is
                                                            required for the
                                                            time being.
                                                            <b>
                                                                Sushiswap and
                                                                YFI
                                                            </b>
                                                            are examples of
                                                            successful projects
                                                            with anonymous
                                                            developers.
                                                            <b>
                                                                "In Code We
                                                                Trust"
                                                            </b>
                                                            is a phrase used in
                                                            the crypto currency
                                                            area. Many projects,
                                                            such as NanoDoge,
                                                            continue to
                                                            "rug-pull" when the
                                                            developer is doxxed.
                                                            As a result,
                                                            "Doxxing" is a bit
                                                            of a misnomer.
                                                        </li>
                                                    </ul>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle
                                                    as={Button}
                                                    variant="link"
                                                    eventKey="3"
                                                >
                                                    Contract Owner can set "sell
                                                    fee" to 100%?
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="3">
                                                <Card.Body>
                                                    <ul>
                                                        <li>
                                                            <span>
                                                                <b>
                                                                    CryptoZoon
                                                                    Contract is
                                                                    been
                                                                    timelocked
                                                                </b>
                                                                . You can check
                                                                here:
                                                            </span>
                                                            <a
                                                                href="#"
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                <b>
                                                                    Link Detail
                                                                </b>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            The timelock will be
                                                            activated with a 48h
                                                            delay, this should
                                                            give you enough time
                                                            to validate any of
                                                            our transactions.
                                                        </li>
                                                        <li>
                                                            Timelocks prevent
                                                            any unseen and
                                                            immediate changes to
                                                            the smart contracts.
                                                            Changes are locked
                                                            for a period of time
                                                            and can be monitored
                                                            publicly, alerting
                                                            users to any
                                                            changes.
                                                        </li>
                                                        <li>
                                                            It means: for every
                                                            command executed
                                                            from the developer,
                                                            <b>
                                                                48h delay period
                                                                is required
                                                            </b>
                                                            . During this time,
                                                            User can fully
                                                            understand what is
                                                            that transaction and
                                                            and make an
                                                            appropriate plan for
                                                            this token.
                                                        </li>
                                                        <li>
                                                            <b>
                                                                CryptoZoon is
                                                                Un-ruggable!
                                                            </b>
                                                        </li>
                                                    </ul>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}
