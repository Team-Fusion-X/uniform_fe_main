import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
} from "reactstrap";

// 세션 관련
import { useAuth } from '../../contexts/AuthContext.js';

// FontAwesome Icon 관련
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faUser, faArrowRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';

function DemoNavbar() {
  const [collapseClasses, setCollapseClasses] = useState("");
  const navbarRef = useRef(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
    return () => headroom.destroy();
  }, []);

  const onExiting = () => setCollapseClasses("collapsing-out");
  const onExited = () => setCollapseClasses("");

  const handleLogout = () => {
    logout()
  };

  return (
    <>
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
              <img
                alt="..."
                src={require("assets/img/brand/uniform_logo3.png")}
                style={{ width: '8rem', height: 'auto' }}
              />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse
              toggler="#navbar_global"
              navbar
              className={collapseClasses}
              onExiting={onExiting}
              onExited={onExited}
            >
              <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav style={{ fontSize: '1.1rem' }}>
                    <i className="ni ni-ui-04 d-lg-none mr-1" />
                    <span className="nav-link-inner--text">분석모드</span>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-xl">
                    <div className="dropdown-menu-inner">
                      <Media
                        className="d-flex align-items-center"
                        nav to="/intensive-analysis-page" tag={Link}
                        target="_self"
                      >
                        <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                          <i className="ni ni-spaceship" />
                        </div>
                        <Media body className="ml-3">
                          <h6 className="heading text-primary mb-md-1">
                            집중 분석 모드
                          </h6>
                          <p className="description d-none d-md-inline-block mb-0">
                            특정 대학 특정 학과를 지정하여 합격률을 집중적으로 분석 및 조회합니다.
                          </p>
                        </Media>
                      </Media>
                      <Media
                        className="d-flex align-items-center"
                        nav to="/full-analysis-page" tag={Link}
                        target="_self"
                      >
                        <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                          <i className="ni ni-palette" />
                        </div>
                        <Media body className="ml-3">
                          <h6 className="heading text-primary mb-md-1">
                            전체 분석 모드
                          </h6>
                          <p className="description d-none d-md-inline-block mb-0">
                            전국 대학을 대상으로 합격률을 분석하여 조회합니다.
                          </p>
                        </Media>
                      </Media>
                      <Media
                        className="d-flex align-items-center"
                        nav to="/map-analysis-page" tag={Link}
                        target="_self"
                      >
                        <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                          <i className="ni ni-ui-04" />
                        </div>
                        <Media body className="ml-3">
                          <h5 className="heading text-warning mb-md-1">
                            지도 모드
                          </h5>
                          <p className="description d-none d-md-inline-block mb-0">
                            지도 형태로 전국 대학의 합격률을 분석하여 조회합니다.
                          </p>
                        </Media>
                      </Media>
                    </div>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav style={{ fontSize: '1.1rem' }} to="/chat-bot" tag={Link}>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span className="nav-link-inner--text">챗봇</span>
                  </DropdownToggle>
                </UncontrolledDropdown>
              </Nav>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                {auth.isLoggedIn ? (
                  <>
                    <NavItem>
                      <Button className="mr-2"
                        color="secondary" 
                        href="#pablo"
                        size="m"
                        to="/profile-page" 
                        tag={Link}>
                        <span style={{ marginRight: '5px' }}>
                        <FontAwesomeIcon icon={faUser} />
                        </span>
                        마이페이지
                      </Button>
                    </NavItem>
                    <NavItem>
                      <Button 
                        color="secondary" href="#pablo"  size="m"
                        type="button"
                        onClick={handleLogout}>
                        <span style={{ marginRight: '5px' }}>
                          <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        </span>
                        로그아웃
                      </Button>
                    </NavItem>
                  </>
                ) : (
                  <>
                    <NavItem>
                      <Button 
                      color="secondary" 
                      type="button"
                      to="/login-page" tag={Link}>
                        <span style={{ marginRight: '5px' }}>
                          <FontAwesomeIcon icon={faArrowRightToBracket} />
                        </span>
                        로그인
                      </Button>
                    </NavItem>
                    <NavItem>
                      <Button 
                      color="secondary" 
                      type="button"
                      to="/register-page" tag={Link}>
                        <span style={{ marginRight: '5px' }}>
                          <FontAwesomeIcon icon={faUserPlus} />
                        </span>
                        회원가입
                      </Button>
                    </NavItem>
                  </>
                )}
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default DemoNavbar;
