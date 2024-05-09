import React, { useState, useEffect } from 'react';
import universityData from './UniversityData.json'; // JSON 데이터 불러오기

function UniversityTest() {
  const [university, setUniversity] = useState(null);
  const [department, setDepartment] = useState(null);
  const [fields, setFields] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [filteredData, setFilteredData] = useState(universityData); // 초기 상태는 전체 데이터

  useEffect(() => {
    const result = universityData.filter(data => {
      return (!university || data.university === university) &&
             (!department || data.department === department) &&
             (!fields || data.fields === fields) &&
             (!keyword || data.keyword === keyword);
    });
    setFilteredData(result);
  }, [university, department, fields, keyword]);

  return (  
    <div>
      <h1>University Data Filter</h1>
      {/* 조건 입력 필드 */}
      <input
        type="text"
        placeholder="University"
        onChange={e => setUniversity(e.target.value || null)}
      />
      <input
        type="text"
        placeholder="Department"
        onChange={e => setDepartment(e.target.value || null)}
      />
      <input
        type="text"
        placeholder="Fields"
        onChange={e => setFields(e.target.value || null)}
      />
      <input
        type="text"
        placeholder="Keyword"
        onChange={e => setKeyword(e.target.value || null)}
      />
      {/* 필터링된 결과 표시 */}
      <div>
        {filteredData.map((item, index) => (
          <div key={index}>
            <p>University: {item.university}</p>
            <p>Department: {item.department}</p>
            <p>Fields: {item.fields}</p>
            <p>Keyword: {item.keyword}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UniversityTest;
