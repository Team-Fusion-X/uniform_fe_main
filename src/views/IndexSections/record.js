import React, { useState, useEffect } from 'react';
import {
  Input,
  Row,
  Col
} from "reactstrap";

function Record() {
  const [activeTab, setActiveTab] = useState('1-1');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const tabs = ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2'];

  const [curriculum, setCurriculum] = useState([]);
  const [subjects, setSubjects] = useState({});
  const [selectedCurriculum, setSelectedCurriculum] = useState('');

  let scoreData = {
    '1-1': [
      { curriculum: '국어', subject: '국어 1', credits: 3, rawScore: 80, subjectAverage: 75, standardDeviation: 5, studentsNumber: 50, rank: 15 },
      { curriculum: '수학', subject: '수학 2', credits: 2, rawScore: 85, subjectAverage: 78, standardDeviation: 4, studentsNumber: 50, rank: 12 },
    ],
    '1-2': [
      { curriculum: '국어', subject: '국어 2', credits: 4, rawScore: 90, subjectAverage: 85, standardDeviation: 6, studentsNumber: 60, rank: 8 },
    ],
    // Add data for other tabs
  };

  useEffect(() => {
    // 교과 데이터 상태 설정(여기서 get으로 데이터 따와서 하면 될 듯)
    setCurriculum(['국어', '수학', '영어']);

    // 과목 데이터 상태 설정
    const subjectsData = {
      '국어': ['국어1', '국어2'],
      '수학': ['수학1', '수학2'],
      '영어': ['영어1', '영어2'],
    };
    setSubjects(subjectsData);
  }, []);

  const handleCurriculumChange = (event) => {
    setSelectedCurriculum(event.target.value);
  };

  return (
    <div>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              id={`nav-${tab}-tab`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>
      <div className="tab-content">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab-pane fade ${activeTab === tab ? 'show active' : ''}`}
            id={`nav-${tab}`}
            role="tabpanel"
            aria-labelledby={`nav-${tab}-tab`}
          >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">교과</th>
                  <th scope="col">과목</th>
                  <th scope="col">단위수</th>
                  <th scope="col">원점수</th>
                  <th scope="col">과목평균</th>
                  <th scope="col">표준편차</th>
                  <th scope="col">학급인원</th>
                  <th scope="col">석차등급</th>
                </tr>
              </thead>
              <tbody>
                {scoreData[tab] && scoreData[tab].length > 0 ? (
                  scoreData[tab].map((score, index) => (
                    <tr key={index}>
                      <th scope="row">{score.curriculum}</th>
                      <td>{score.subject}</td>
                      <td>{score.credits}</td>
                      <td>{score.rawScore}</td>
                      <td>{score.subjectAverage}</td>
                      <td>{score.standardDeviation}</td>
                      <td>{score.studentsNumber}</td>
                      <td>{score.rank}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8"></td>
                  </tr>
                )}
                <tr>
                  <th scope="col">
                    <select value={selectedCurriculum} onChange={handleCurriculumChange}>
                      <option value="">교과 선택</option>
                      {curriculum.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))}
                    </select>
                  </th>
                  <th scope="col">
                    <select>
                      <option value="">과목 선택</option>
                      {selectedCurriculum && subjects[selectedCurriculum] && subjects[selectedCurriculum].map((subject, index) => (
                        <option key={index} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </th>
                  <th scope="col">
                    <Input
                      id="credits"
                      placeholder=""
                      type="text"
                    />
                  </th>
                  <th scope="col">
                    <Input
                      id="rawScore"
                      placeholder=""
                      type="text"
                    />
                  </th>
                  <th scope="col">
                    <Input
                      id="subjectAverage"
                      placeholder=""
                      type="text"
                    />
                  </th>
                  <th scope="col">
                    <Input
                      id="standardDeviation"
                      placeholder=""
                      type="text"
                    />
                  </th>
                  <th scope="col">
                    <Input
                      id="stuentsNumber"
                      placeholder=""
                      type="text"
                    />
                  </th>
                  <th scope="col">
                    <Input
                      id="rank"
                      placeholder=""
                      type="text"
                    />
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Record;