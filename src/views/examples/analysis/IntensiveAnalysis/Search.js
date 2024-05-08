import React, { useState, useEffect } from 'react';
import UniversityFilter from '../UniversityFilter';
import { Button, Row, Col, Container, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import styled from 'styled-components';

const StyledTable = styled(Table)`
  border-collapse: separate; 
  border-spacing: 0; 
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05); // 그림자 추가
  background-color: #f8f9fa; // 배경색 설정

  th {
    background-color: #4793ff; // 헤더 배경색
    color: white; // 헤더 텍스트 색상
    border-bottom: 2px solid #dee2e6; // 헤더 하단 테두리 강조
    border-radius: 0.5rem 0.5rem 0 0; // 상단 모서리 둥글게
  }

  td {
    border-top: none; // 셀 상단 테두리 제거
  }
`;

function Search() {
  const [selectedFields, setSelectedFields] = useState(null);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const { uniqueFields, setFields, 
    uniqueKeywords, setKeyword, 
    uniqueDepartments, setDepartment, 
    uniqueUniversities, setUniversity } = UniversityFilter();

    const handleSubmit = () => {
      // 여기에 학교 & 학과 담아서 합격률 조회 로직 발동
      // 마우스 커서 아래로 이동 아래에서 합격률 분석 결과 보여주고 그 밑에 미리
      // 생각해둔 로직 넣기
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
      </Form>
    </Container>
  );
}

export default Search;