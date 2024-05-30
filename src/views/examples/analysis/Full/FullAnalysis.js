import React from "react";
// nodejs library that concatenates classes
import FullAnal from "./FullAnal";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";

// index page sections
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
            <section className="section section-shaped" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
              <div className="shape shape-style-1 shape-default" style={{ height: '100px' }}>
              </div>
            </section>
            {/* 1st Hero Variation */}
          </div>
          
          <section className="section" style={{ paddingTop: '1rem', paddingBottom: '3rem' }}>
            <FullAnal />
          </section>
          

        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Landing;