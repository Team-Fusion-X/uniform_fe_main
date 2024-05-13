import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Container, Row, Col } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import Record from '../IndexSections/record.js';
import useAuthCheck from '../../components/hooks/UseAuthCheck.js'; // 커스텀 훅 임포트
import { AverageProvider, useAverage  } from '../IndexSections/AverageContext.js';

function Profile() {
  const refMain = useRef(null);
  useAuthCheck(refMain); // 커스텀 훅 호출

  return (
    <AverageProvider>
      <DemoNavbar />
      <main className="profile-page" ref={refMain}>
        <section className="section-profile-cover section-shaped my-0">
          {/* Circles background */}
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/user.png")}
                        />
                      </a>
                    </div>
                  </Col>
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0">
                      <Button
                        className="mr-4"
                        color="info"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        정보 수정
                      </Button>
                      <Button
                        className="float-right"
                        color="default"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        성적 수정
                      </Button>
                    </div>
                  </Col>
                  <ProfileStats />
                </Row>
                <div className="mt-5 py-5 border-top text-center">
                  <Row className="justify-content-center">
                    <Col lg="11">
                    <Record />
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </AverageProvider>
  );
};

export default Profile;

function ProfileStats() {
  const { mainAverage, kemrAverage } = useAverage();  // Now it should be correctly imported and used

  return (
      <Col className="order-lg-1" lg="4">
        <div className="card-profile-stats d-flex justify-content-center">
          <div>
            <span className="heading">강호준</span>
            <span className="description">이름</span>
          </div>
          <div>
            <span className="heading">{mainAverage}</span>
            <span className="description">전 과목</span>
          </div>
          <div>
            <span className="heading">{kemrAverage}</span>
            <span className="description">국영수탐</span>
          </div>
        </div>
      </Col>
  );
}
