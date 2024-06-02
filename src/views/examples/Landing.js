import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";

// index page sections
import Download from "../IndexSections/Download.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

class Landing extends React.Component {
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-250">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="6">
                      <h1 className="display-3 text-white">
                        너의 꿈을 응원해! 너가 최고야!{" "}
                        <p className="display-3 text-white">넌 할 수 있어! 자신을 믿어!</p>
                      </h1>
                      <p className="display-4 text-white">
                        너의 합격을 응원해. 언제나 화이팅!
                      </p>
                    </Col>
                  </Row>
                </div>
              </Container>
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
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
              </div>
            </section>
            {/* 1st Hero Variation */}
          </div>
          <section className="section section-lg pt-lg-0 mt--200">
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <Row className="row-grid">
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="ni ni-check-bold" />
                          </div>
                          <h6 className="text-primary text-uppercase">
                            집중 분석 모드
                          </h6>
                          <p className="description mt-3">
                            1개의 대학을 지정하여 합격률을 집중적으로 분석 및 조회합니다.
                          </p>
                          <div>
                            <Badge color="primary" pill className="mr-1">
                              특정 대학 검색
                            </Badge>
                            <Badge color="primary" pill className="mr-1">
                              대학별 비교
                            </Badge>
                            <Badge color="primary" pill className="mr-1">
                              집중 분석
                            </Badge>
                          </div>
                          <Button
                            className="mt-4"
                            color="primary"
                            href="/intensive-analysis-page"
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.href = "/intensive-analysis-page";
                            }}
                          >
                            바로가기
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                            <i className="ni ni-istanbul" />
                          </div>
                          <h6 className="text-success text-uppercase">
                            전체 분석 모드
                          </h6>
                          <p className="description mt-3">
                            전국의 대학을 대상으로 지정하여 합격률을 분석 및 조회합니다.
                          </p>
                          <div>
                            <Badge color="success" pill className="mr-1">
                              전국 대학 조회
                            </Badge>
                            <Badge color="success" pill className="mr-1">
                              전체 분석
                            </Badge>
                            <Badge color="success" pill className="mr-1">
                              대략적인 파악
                            </Badge>
                          </div>
                          <Button
                            className="mt-4"
                            color="success"
                            href="/full-analysis-page"
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.href = "/full-analysis-page";
                            }}
                          >
                            바로가기
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                            <i className="ni ni-planet" />
                          </div>
                          <h6 className="text-warning text-uppercase">
                            지도 분석 모드
                          </h6>
                          <p className="description mt-3">
                            지도 형태로 전국 대학의 합격률을 분석하여 조회합니다.
                          </p>
                          <div>
                            <Badge color="warning" pill className="mr-1">
                              지도 형태
                            </Badge>
                            <Badge color="warning" pill className="mr-1">
                              지역별 분석
                            </Badge>
                            <Badge color="warning" pill className="mr-1">
                              시각화
                            </Badge>
                          </div>
                          <Button
                            className="mt-4"
                            color="warning"
                            href="/map-analysis-page"
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.href = "/map-analysis-page";
                            }}
                          >
                            바로가기
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Landing;
