/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
import { Badge, Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import ChatBot from "./chatBotPage";

function Landing() {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, []);

  const mainRef = React.createRef();

  return (
    <>
      <DemoNavbar />
      <main ref={mainRef}>
        <div className="position-relative">
          {/* shape Hero */}
          <section className="section section-shaped" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
            <div className="shape shape-style-1 shape-default" style={{ height: '100px' }}>
            </div>
          </section>
          {/* 1st Hero Variation */}
        </div>
        
        <section className="section" style={{ paddingTop: '1rem', paddingBottom: '3rem' }}>
          <ChatBot />
        </section>
      </main>
      <SimpleFooter />
    </>
  );
};

export default Landing;