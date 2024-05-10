import React, { useState, useEffect } from 'react';
import {
  Input,
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
  const [sdeviation, setStandardDeviation] = useState('');
  const [studentsNumber, setStudentsNumber] = useState('');
  const [rank, setRank] = useState('');
  const [scoreData, setScoreData] = useState({}); // 수정된 부분: scoreData state 추가

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

  const handleAddScore = () => {
    let [schoolYear, schoolTerm] = activeTab.split('-');
    let newScore = {
      "schoolYear": parseInt(schoolYear),
      "schoolTerm": parseInt(schoolTerm),
      "curriculum": selectedCurriculum,
      "subjectName": selectedSubject,
      "credit": parseInt(credits),
      "rawScore": parseFloat(rawScore),
      "subjectMean": parseFloat(subjectAverage),
      "sDeviation": parseFloat(sdeviation),
      "headCount": parseInt(studentsNumber),
      "ranking": parseInt(rank)
    };
    axios.post('api/8482/score', newScore, {withCredentials: true})
    .then(response => {
      // scoreData에 새로운 데이터 추가
      const key = `${newScore.schoolYear}-${newScore.schoolTerm}`;
      if (!scoreData[key]) {
        scoreData[key] = [];
      }
      scoreData[key].push({
        curriculum: newScore.curriculum,
        subject: newScore.subjectName,
        credits: newScore.credit,
        rawScore: newScore.rawScore,
        subjectAverage: newScore.subjectMean,
        standardDeviation: newScore.sDeviation,
        studentsNumber: newScore.headCount,
        rank: newScore.ranking
      });
      // scoreData state 갱신
      setScoreData({ ...scoreData });

      // 입력란 초기화
      setSelectedCurriculum('');
      setSelectedSubject('');
      setCredits('');
      setRawScore('');
      setSubjectAverage('');
      setStandardDeviation('');
      setStudentsNumber('');
      setRank('');
    })
    .catch(error => {
      console.error('성적 추가 중 오류가 발생했습니다.', error);
    });
  };

  useEffect(() => {
    axios.get('/api/8482/subject', {withCredentials: true})
      .then(response => {
        const subjectsData = response.data;
        setSubjects(subjectsData);
        setCurriculum(Object.keys(subjectsData));
      })
      .catch(error => {
        console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
      });
  }, []);

  useEffect(() => {
    axios.get('/api/8482/score', { withCredentials: true })
      .then(response => {
        const receivedData = response.data.getScores;
        const formattedData = {};
  
        // schoolYear와 schoolTerm을 조합하여 키를 생성하고, 해당 키에 해당하는 배열에 데이터 추가
        receivedData.forEach(item => {
          const key = `${item.schoolYear}-${item.schoolTerm}`;
          if (!formattedData[key]) {
            formattedData[key] = [];
          }
          formattedData[key].push({
            curriculum: item.curriculum,
            subject: item.subjectName,
            credits: item.credit,
            rawScore: item.rawScore,
            subjectAverage: item.subjectMean,
            standardDeviation: item.sdeviation,
            studentsNumber: item.headCount,
            rank: item.ranking
          });
          
        });
  
        // 가공된 데이터를 state에 설정
        setScoreData(formattedData);
      })
      .catch(error => {
        console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
      });
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
                      value={sdeviation}
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