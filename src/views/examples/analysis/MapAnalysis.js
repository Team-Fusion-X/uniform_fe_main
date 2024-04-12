import React from "react";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import UMap from "./UMap";

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


          {/* 작업공간 시작 */}
          <section className="section" style={{ paddingTop: '1rem', paddingBottom: '3rem' }}>
            <UMap />
          </section>
          {/* 작업공간 끝 */}

        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Landing;
