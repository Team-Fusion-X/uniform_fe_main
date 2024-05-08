import React, { useState, useEffect } from 'react';
import universityData from './UniversityData.json';

function UniversityFilter() {
  // 상태 선언: 각 필터 선택 및 필터링된 결과 데이터를 저장
  const [fields, setFields] = useState(null); // 선택된 계열
  const [keyword, setKeyword] = useState(null); // 선택된 상세 계열
  const [university, setUniversity] = useState(null); // 선택된 학교
  const [department, setDepartment] = useState(null); // 선택된 학과
  const [filteredData, setFilteredData] = useState(universityData); // 필터링된 전체 데이터
  const [uniqueUniversities, setUniqueUniversities] = useState([]); // 유니크 학교 목록
  const [uniqueDepartments, setUniqueDepartments] = useState([]); // 유니크 학과 목록
  const [uniqueFields, setUniqueFields] = useState([]); // 유니크 계열 목록
  const [uniqueKeywords, setUniqueKeywords] = useState([]); // 유니크 상세 계열 목록

  // 전체 데이터를 필터링하여 현재 선택된 값에 맞는 데이터로 설정
  useEffect(() => {
    setFilteredData(universityData.filter(data => 
      (!fields || data.fields === fields) &&
      (!keyword || data.keyword === keyword) &&
      (!university || data.university === university) &&
      (!department || data.department === department)
    ));
  }, [fields, keyword, university, department]);

  // 유니크 계열 목록 설정
  useEffect(() => {
    const fieldsSet = new Set(universityData.map(item => item.fields));
    setUniqueFields([...fieldsSet]);
  }, []);

  // 계열 변경 시 유니크 상세 계열 목록 설정
  useEffect(() => {
    if (fields) {
      const filteredByFields = universityData.filter(item => item.fields === fields);
      const keywordSet = new Set(filteredByFields.map(item => item.keyword));
      setUniqueKeywords([...keywordSet]);
    } else {
      setUniqueKeywords([]);
    }
  }, [fields]);

  // 상세 계열 변경 시 유니크 학교 목록 설정
  useEffect(() => {
    if (keyword && fields) {
      const filteredByKeyword = universityData.filter(item => item.keyword === keyword
      && item.fields === fields);
      const universitySet = new Set(filteredByKeyword.map(item => item.university));
      setUniqueUniversities([...universitySet]);
    } else {
      setUniqueUniversities([]);
    }
  }, [keyword, fields]);

  // 학교, 계열, 상세 계열 변경 시 유니크 학과 목록 설정
  useEffect(() => {
    if (university && fields && keyword) {
      const filteredByUniversity = universityData.filter(item => 
        item.university === university &&
        item.fields === fields &&
        item.keyword === keyword
      );
      const departmentSet = new Set(filteredByUniversity.map(item => item.department));
      setUniqueDepartments([...departmentSet]);
    } else {
      setUniqueDepartments([]);
    }
  }, [university, fields, keyword]);

  // 필터링 결과 및 설정 함수 반환
  return { 
    filteredData, 
    uniqueUniversities, 
    uniqueDepartments, 
    uniqueFields, 
    uniqueKeywords,
    setFields, 
    setKeyword, 
    setUniversity, 
    setDepartment
  };
}

export default UniversityFilter;
