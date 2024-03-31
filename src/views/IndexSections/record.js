import React, { useState, useEffect } from 'react';
import {
  Input,
  Row,
  Col,
  Button
} from "reactstrap";
import axios from 'axios'; // Axios 추가

function Record() {
  const [activeTab, setActiveTab] = useState('1-1');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const tabs = ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2'];

  const [curriculum, setCurriculum] = useState([]);
  const [subjects, setSubjects] = useState({});
  const [selectedCurriculum, setSelectedCurriculum] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [credits, setCredits] = useState('');
  const [rawScore, setRawScore] = useState('');
  const [subjectAverage, setSubjectAverage] = useState('');
  const [standardDeviation, setStandardDeviation] = useState('');
  const [studentsNumber, setStudentsNumber] = useState('');
  const [rank, setRank] = useState('');

  const handleCurriculumChange = (event) => {
    setSelectedCurriculum(event.target.value);
  };
  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };
  const handleCreditsChange = (event) => {
    setCredits(event.target.value);
  };
  const handleRawScoreChange = (event) => {
    setRawScore(event.target.value);
  };
  const handleSubjectAverageChange = (event) => {
    setSubjectAverage(event.target.value);
  };
  const handleStandardDeviationChange = (event) => {
    setStandardDeviation(event.target.value);
  };
  const handleStudentsNumberChange = (event) => {
    setStudentsNumber(event.target.value);
  };
  const handleRankChange = (event) => {
    setRank(event.target.value);
  };

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

  const handleAddScore = () => {
    let [schoolYear, schoolTerm] = activeTab.split('-');
    let newScore = {
      school_year: parseInt(schoolYear),
      school_term: parseInt(schoolTerm),
      curriculum: selectedCurriculum,
      subject: selectedSubject,
      credits: parseInt(credits),
      rawScore: parseInt(rawScore),
      subjectAverage: parseInt(subjectAverage),
      standardDeviation: parseInt(standardDeviation),
      studentsNumber: parseInt(studentsNumber),
      rank: parseInt(rank)
    };
    console.log(newScore)
    // axios.post('your_api_endpoint_here', newScore)
    // .then(response => {
    //   console.log('성적이 추가되었습니다.');
    //   // 성적이 성공적으로 추가되었을 때 해야 할 작업 추가
    // })
    // .catch(error => {
    //   console.error('성적 추가 중 오류가 발생했습니다.', error);
    // });
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

    // 주소 + 세션에 로그인한 ID로 넣기만 하면 끝
    // 서버에서 세션으로 접속된 user_id를 기반으로 score 데이터를 가져오는 Get 요청 수행
    // axios.get('your_api_endpoint_here')
    // .then(response => {
    //   // 서버에서 받아온 데이터를 scoreData로 설정
    //   const receivedData = response.data; // 서버에서 받아온 데이터
    //   const formattedData = {}; // 정제된 데이터를 저장할 객체
    //   receivedData.forEach((item, index) => {
    //     // 서버에서 받아온 데이터를 newScore와 동일한 형식으로 변환하여 formattedData에 추가
    //     const { school_year, school_term, curriculum, subject, credits, rawScore, subjectAverage, standardDeviation, studentsNumber, rank } = item;
    //     const newScore = {
    //       school_year: parseInt(school_year),
    //       school_term: parseInt(school_term),
    //       curriculum,
    //       subject,
    //       credits: parseInt(credits),
    //       rawScore: parseInt(rawScore),
    //       subjectAverage: parseInt(subjectAverage),
    //       standardDeviation: parseInt(standardDeviation),
    //       studentsNumber: parseInt(studentsNumber),
    //       rank: parseInt(rank)
    //     };
    //     if (formattedData[school_year + '-' + school_term]) {
    //       formattedData[school_year + '-' + school_term].push(newScore);
    //     } else {
    //       formattedData[school_year + '-' + school_term] = [newScore];
    //     }
    //   });
    //   setScoreData(formattedData);
    // })
    // .catch(error => {
    //   console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
    // });
  }, []);

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
                    <select value={selectedSubject} onChange={handleSubjectChange}>
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
                      value={credits}
                      onChange={handleCreditsChange}
                    />
                  </th>
                  <th scope="col">
                    <Input
                      id="rawScore"
                      placeholder=""
                      type="text"
                      value={rawScore}
                      onChange={handleRawScoreChange}
                    />
                  </th>
                  <th scope="col">
                    <Input
                      id="subjectAverage"
                      placeholder=""
                      type="text"
                      value={subjectAverage}
                      onChange={handleSubjectAverageChange}
                    />
                  </th>
                  <th scope="col">
                    <Input
                      id="standardDeviation"
                      placeholder=""
                      type="text"
                      value={standardDeviation}
                      onChange={handleStandardDeviationChange}
                    />
                  </th>
                  <th scope="col">
                    <Input
                      id="studentsNumber"
                      placeholder=""
                      type="text"
                      value={studentsNumber}
                      onChange={handleStudentsNumberChange}
                    />
                  </th>
                  <th scope="col">
                    <Input
                      id="rank"
                      placeholder=""
                      type="text"
                      value={rank}
                      onChange={handleRankChange}
                    />
                  </th>
                </tr>
              </tbody>
            </table>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button color="primary" onClick={handleAddScore}>성적 추가</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Record;