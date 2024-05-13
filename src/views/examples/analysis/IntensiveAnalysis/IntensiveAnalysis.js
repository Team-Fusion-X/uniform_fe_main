import React, { useEffect, useRef } from "react";
import classnames from "classnames";
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

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import Search from "./Search.js";
import Test from "../UniversityTest.js"

function IntensiveAnalysis() {
  const mainRef = useRef(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <>
      <DemoNavbar />
      <main ref={mainRef}>
        <div className="position-relative">
          <section className="section section-shaped" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
            <div className="shape shape-style-1 shape-default" style={{ height: '100px' }}>
            </div>
          </section>
        </div>

        <section className="section" style={{ paddingTop: '1rem', paddingBottom: '3rem' }}>
          <Container>
          <Search/>
          </Container>
        </section>

      </main>
      <SimpleFooter />
    </>
  );
}

export default IntensiveAnalysis;
