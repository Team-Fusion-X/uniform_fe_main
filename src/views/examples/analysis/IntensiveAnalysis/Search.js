import React, { useState, useEffect } from 'react';
import UniversityFilter from '../UniversityFilter';
import { Button, Row, Col, Container, Form, FormGroup, Label, Input, Table, Card, CardBody, CardText } from 'reactstrap';
import styled from 'styled-components';
import axios from 'axios';

function Search() {
  const [selectedFields, setSelectedFields] = useState(null);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [resultData, setResultData] = useState("");

  const StyledTable = styled(Table)`
  border-collapse: separate; 
  border-spacing: 0; 
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1); // 그림자 추가
  background-color: #f8f9fa; // 배경색 설정

  th {
    background-color: #4793ff; // 헤더 배경색
    color: white; // 헤더 텍스트 색상
    padding: 10px 15px; // 헤더 패딩
    border-bottom: 2px solid #dee2e6; // 헤더 하단 테두리 강조
    border-radius: 0.5rem 0.5rem 0 0; // 상단 모서리 둥글게
  }

  td {
    border-top: none; // 셀 상단 테두리 제거
  }`;
  // StyledTable 컴포넌트를 정의합니다.
  const StyledTable2 = styled(Table)`
    width: 100%; // 테이블 너비를 100%로 설정
    margin: 20px 0; // 위아래 여백 설정
    border-collapse: separate; 
    border-spacing: 0; 
    background-color: #f8f9fa; // 배경색 설정
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); // 그림자 추가
    border-radius: 10px; // 모서리 둥글게

    th {
      background-color: #4793ff; // 헤더 배경색
      color: white; // 헤더 텍스트 색상
      padding: 10px 15px; // 헤더 패딩
      border-bottom: 2px solid #dee2e6; // 하단 테두리
    }

    td {
      padding: 10px 15px; // 셀 패딩
      border-top: none; // 상단 테두리 없음
    }
    `;

  const { uniqueFields, setFields, 
    uniqueKeywords, setKeyword, 
    uniqueDepartments, setDepartment, 
    uniqueUniversities, setUniversity } = UniversityFilter();

  const handleSubmit = () => {
    let postData = {
      "university":selectedUniversity,
      "department":selectedDepartment,
      "hope":"종합"
    };
    console.log(postData)
    axios.post('/api/8482/analysis/one', postData, {withCredentials: true})
    .then(response => {
      const passRate = response.data["possibility"];
      setResultData(passRate);
    })
    .catch(error => {
      console.error('집중 분석 중 오류가 발생했습니다.', error);
      setResultData("오류 발생");
    });
  };

  useEffect(() => {
    setFields(selectedFields);
    setSelectedKeyword(null);
    setSelectedDepartment(null);
    setSelectedUniversity(null);
  }, [selectedFields]);

  useEffect(() => {
    setKeyword(selectedKeyword);
    setSelectedDepartment(null);
    setSelectedUniversity(null);
  }, [selectedKeyword]);

  useEffect(() => {
    setUniversity(selectedUniversity);
    setSelectedDepartment(null);
  }, [selectedUniversity]);

  return (
    <Container>
      <Form>
        <StyledTable bordered responsive>
          <tbody>
            <tr>
              <th className="h4" colSpan={4}>계열선택</th>
            </tr>
            <tr>
              <td colSpan={3}>
                <Row>
                  {uniqueFields.map((field, index) => (
                    <Col md={3} key={index}>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="field"
                            checked={selectedFields === field}
                            onChange={() => setSelectedFields(field)}
                          />
                          {field}
                        </Label>
                      </FormGroup>
                    </Col>
                  ))}
                </Row>
              </td>
            </tr>
            {selectedFields && (
              <>
                <tr>
                  <th className="h4" colSpan={3}>키워드 선택</th>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <Row>
                      {uniqueKeywords.map((keyword, index) => (
                        <Col md={3} key={index}>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="radio"
                                name="keyword"
                                checked={selectedKeyword === keyword}
                                onChange={() => setSelectedKeyword(keyword)}
                              />
                              {keyword}
                            </Label>
                          </FormGroup>
                        </Col>
                      ))}
                    </Row>
                  </td>
                </tr>
              </>
            )}
            {selectedKeyword && (
              <>
                <tr>
                  <th className="h4" colSpan={4}>학교 선택</th>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <Row>
                      {uniqueUniversities.map((university, index) => (
                        <Col md={3} key={index}>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="radio"
                                name="university"
                                checked={selectedUniversity === university}
                                onChange={() => setSelectedUniversity(university)}
                              />
                              {university}
                            </Label>
                          </FormGroup>
                        </Col>
                      ))}
                    </Row>
                  </td>
                </tr>
              </>
            )}
            {selectedUniversity && (
              <>
                <tr>
                  <th className="h4" colSpan={3}>학과 선택</th>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <Row>
                      {uniqueDepartments.map((department, index) => (
                        <Col md={3} key={index}>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="radio"
                                name="department"
                                checked={selectedDepartment === department}
                                onChange={() => setSelectedDepartment(department)}
                              />
                              {department}
                            </Label>
                          </FormGroup>
                        </Col>
                      ))}
                    </Row>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </StyledTable>
        <Row>
          <Col className="text-center">
            <Button onClick={handleSubmit} color="primary">적용하기</Button>
          </Col>
        </Row>
        {resultData && (
          <StyledTable2 striped>
            <thead>
              <tr>
                <th>계열</th>
                <th>중계열</th>
                <th>학교</th>
                <th>학과</th>
                <th>합격 확률</th>
              </tr>
            </thead>
            <tbody className="h5">
              <tr>
                <td>{selectedFields}</td>
                <td>{selectedKeyword}</td>
                <td>{selectedUniversity}</td>
                <td>{selectedDepartment}</td>
                <td>{resultData}</td>
              </tr>
            </tbody>
          </StyledTable2>
        )}
      </Form>
    </Container>
  );
}

export default Search;