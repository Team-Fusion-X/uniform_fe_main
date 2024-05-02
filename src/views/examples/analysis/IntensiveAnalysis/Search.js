import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Search() {
  const [data, setData] = useState(() => {
    // 로컬 스토리지에서 캐시된 데이터를 불러옵니다.
    const cachedData = localStorage.getItem('academicData');
    return cachedData ? JSON.parse(cachedData) : null;
  });
  const [selectedField, setSelectedField] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedColleges, setSelectedColleges] = useState([]);

  useEffect(() => {
    if (!data) {
      // 데이터가 캐시되어 있지 않으면 API에서 데이터를 불러옵니다.
      const fetchData = async () => {
        try{
          const response = await axios.get('http://orion.mokpo.ac.kr:8482/api/fields/academics');
          localStorage.setItem('academicData', JSON.stringify(response.data)); // 데이터를 로컬 스토리지에 저장
          setData(response.data);
        } catch(error){
          setData({
            "공학계열": {
              "컴퓨터공학과": ["목포대학교", "서울대학교"],
              "전자공학과": ["고려대학교"],
              "화학공학과": ["POSTECH", "서울대학교"]
            },
            "인문계열": {
              "영어학과": ["서울대학교", "연세대학교"],
              "사학과": ["서울대학교"],
              "국어국문학과": ["서울대학교", "한양대학교"]
            }
          });
        }
      };
      fetchData();
    }
  }, []);

  const handleFieldChange = (field) => {
    setSelectedField(data[field]);
    setSelectedMajor(null);
    setSelectedColleges([]);
  };

  const handleMajorChange = (major) => {
    setSelectedMajor(major);
  };

  const handleCollegeToggle = (college) => {
    setSelectedColleges(prev => 
      prev.includes(college) ? prev.filter(c => c !== college) : [...prev, college]
    );
  };

  return (
    <div>
      <div>
        <h1>계열 선택</h1>
        {data && Object.keys(data).map((field) => (
          <button key={field} onClick={() => handleFieldChange(field)}>
            {field}
          </button>
        ))}
      </div>
      {selectedField && (
        <div>
          <h1>학과 선택</h1>
          {Object.keys(selectedField).map((major) => (
            <div key={major}>
              <input
                type="checkbox"
                id={major}
                onChange={() => handleMajorChange(major)}
                checked={selectedMajor === major}
              />
              <label htmlFor={major}>{major}</label>
            </div>
          ))}
        </div>
      )}
      {selectedMajor && selectedField[selectedMajor] && (
        <div>
          <h1>대학 선택</h1>
          {selectedField[selectedMajor].map((college) => (
            <div key={college}>
              <input
                type="checkbox"
                id={college}
                onChange={() => handleCollegeToggle(college)}
                checked={selectedColleges.includes(college)}
              />
              <label htmlFor={college}>{college}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
