import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Input, Button, Container } from 'reactstrap';
import { FcSearch } from "react-icons/fc";

import red_marker from './image/red.png';
import blue_marker from './image/blue.png';
import green_marker from './image/green.png';
import yellow_marker from './image/yellow.png';

const MapInfo = () => (
    <Container style={{ marginBottom: "40px" }}>
        <div className="text-center" style={{ fontSize: "30px", marginTop: "15px", marginBottom: "20px" }}>
            <FcSearch />
            <span style={{ marginLeft: "10px" }}>지도모드</span>
        </div>
        <div className="text-center" style={{ fontSize: "17px", marginTop: "15px", marginBottom: "20px" }}>
            마커를 클릭해 학교 정보를 확인할 수 있습니다.
        </div>
        <div className="text-center" style={{ fontSize: "16px", marginTop: "15px", marginBottom: "20px" }}>
            계열, 학과 키워드를 선택하고 합격 확률을 확인하세요.
        </div>
        <Row className="justify-content-between text-center">
            <Col xs="3" className="d-flex align-items-center justify-content-center">
                <img src={red_marker} alt="Red Marker" className="img-fluid" style={{ maxWidth: "2rem", height: "auto" }} />
                <span>위험</span>
            </Col>
            <Col xs="3" className="d-flex align-items-center justify-content-center">
                <img src={yellow_marker} alt="Yellow Marker" className="img-fluid" style={{ maxWidth: "2rem", height: "auto" }} />
                <span>도전</span>
            </Col>
            <Col xs="3" className="d-flex align-items-center justify-content-center">
                <img src={green_marker} alt="Green Marker" className="img-fluid" style={{ maxWidth: "2rem", height: "auto" }} />
                <span>적절</span>
            </Col>
            <Col xs="3" className="d-flex align-items-center justify-content-center">
                <img src={blue_marker} alt="Blue Marker" className="img-fluid" style={{ maxWidth: "2rem", height: "auto" }} />
                <span >여유</span>
            </Col>

        </Row>
    </Container >
);

export default MapInfo;