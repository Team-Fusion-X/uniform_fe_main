import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Input, Button, Container } from 'reactstrap';
import red_marker from './image/red.png';
import blue_marker from './image/blue.png';
import green_marker from './image/green.png';
import yellow_marker from './image/yellow.png';

const MarkerInfo = () => (
    <Container style={{ marginBottom: "40px" }}>
        <div className="text-center" style={{ fontSize: "20px", marginTop: "15px", marginBottom: "20px" }}>
            마커를 클릭해 학교 정보를 확인하세요!
        </div>
        <Row className="justify-content-between text-center">
            <Col xs="3" className="d-flex align-items-center justify-content-center">
                <img src={red_marker} alt="Red Marker" className="img-fluid" style={{ maxWidth: "2rem", height: "auto" }} />
                <span>~20%</span>
            </Col>
            <Col xs="3" className="d-flex align-items-center justify-content-center">
                <img src={yellow_marker} alt="Yellow Marker" className="img-fluid" style={{ maxWidth: "2rem", height: "auto" }} />
                <span>20~50%</span>
            </Col>
            <Col xs="3" className="d-flex align-items-center justify-content-center">
                <img src={green_marker} alt="Green Marker" className="img-fluid" style={{ maxWidth: "2rem", height: "auto" }} />
                <span>50~80%</span>
            </Col>
            <Col xs="3" className="d-flex align-items-center justify-content-center">
                <img src={blue_marker} alt="Blue Marker" className="img-fluid" style={{ maxWidth: "2rem", height: "auto" }} />
                <span >80%~</span>
            </Col>

        </Row>
    </Container>
);

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <>
            <MarkerInfo />
            <Form onSubmit={handleSubmit} className="d-flex mt-3 mb-4">
                <FormGroup className="flex-grow-1 mr-2">
                    <Input
                        type="text"
                        placeholder="지역이나 대학명을 입력해 주세요!"
                        value={searchTerm}
                        onChange={handleChange}
                        className="form-control"
                    />
                </FormGroup>
                <Button type="submit" color="primary" style={{ width: "100px" }}>검색</Button>
            </Form>
        </>
    );
};

export default SearchBar;
