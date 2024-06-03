import React, { useState, useEffect } from 'react';
import {
  Input,
  Button
} from "reactstrap";
import axios from 'axios';
import { useAverage } from './AverageContext';

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
  const [credit, setCredits] = useState('');
  const [rawScore, setRawScore] = useState('');
  const [subjectMean, setSubjectAverage] = useState('');
  const [sDeviation, setStandardDeviation] = useState('');
  const [headCount, setStudentsNumber] = useState('');
  const [ranking, setRank] = useState('');
  const [scoreData, setScoreData] = useState({});
  const { mainAverage, setMainAverage, kemrAverage, setKemrAverage } = useAverage();
  

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

  // post 평균산정 요청 함수
  const PostAverage = (schoolYear, schoolTerm) => {
    const key = `${schoolYear}-${schoolTerm}`;
    let postAverage = checkScore(key);

    if (postAverage) { // 이렇게 하면 성적하기를 입력했을 때 기준 학기의 성적이 올바르면 삽입
      const maxSchoolYear = 3;  // 최대 학년 수
      const maxSchoolTerm = 2;  // 최대 학기 수
      let formattedData = {"scores": []};
      let flag = false;

      for (let year = 1; year <= maxSchoolYear; year++) {
        for (let term = 1; term <= maxSchoolTerm; term++) {
          // scoreData에서 해당 year와 term에 대한 데이터를 접근
          const scoresArray = scoreData[`${year}-${term}`];

          if (scoresArray && scoresArray.length > 0) {
              // 각 점수 데이터에 대해 반복 처리
              scoresArray.forEach(score => {
                  const scoreWithYearAndTerm = {
                      ...score,  // 기존 점수 데이터 복사
                      "schoolYear": year,  // 학년 추가
                      "schoolTerm": term   // 학기 추가
                  };
                  formattedData.scores.push(scoreWithYearAndTerm);
              });
          }

          if (year == schoolYear & term == schoolTerm) {
            flag = true;
            break;
          }
        }
        if (flag){
          break;
        }
      }
      axios.post('api/8482/average', formattedData, {withCredentials: true})
      .then(response => {
        console.log('평균 산정 성공');
      })
      .catch(error => {
        console.log(formattedData);
        console.error('평균 산정 중 오류가 발생했습니다.', error);
      });
    }
  };

  // 국영수탐 총 8과목 있는지 체크하는 함수 있으면 True 없으면 False 
  const checkScore = (key) => {
    let idxUpdate = new Array(7).fill(0); // 로컬 배열 초기화
    const subjects = ['국어', '수학', '영어', '사회', '과학'];
    let socialScienceIndex = 3; // 사회와 과학 과목을 위한 시작 인덱스

    // scoreData[key] 접근하여 각 항목 처리
    Object.values(scoreData[key]).forEach(scoreItem => {
        let index = subjects.indexOf(scoreItem.curriculum);
        if (index !== -1) {
            if (index < 3) { // 국어, 수학, 영어는 직접 매핑
                idxUpdate[index] = 1;
            } else { // 사회, 과학은 3번 인덱스부터 차례대로 할당
                if (idxUpdate[socialScienceIndex] === 0) {
                    idxUpdate[socialScienceIndex] = 1;
                    socialScienceIndex++; // 다음 사회/과학 과목을 위해 인덱스 증가
                }
                if (socialScienceIndex >= 7) {
                  socialScienceIndex--;
                };
            }
        }
    });
    // 모든 인덱스가 1로 채워졌는지 확인
    const allFilled = idxUpdate.every(value => value === 1);

    return allFilled;
  };

  // 성적 추가 함수 및 average 체킹 후 있으면 넣음
  const handleAddScore = () => {
    let [schoolYear, schoolTerm] = activeTab.split('-');
    let newScore = {
      "schoolYear": parseInt(schoolYear),
      "schoolTerm": parseInt(schoolTerm),
      "curriculum": selectedCurriculum,
      "subjectName": selectedSubject,
      "credit": parseInt(credit),
      "rawScore": parseFloat(rawScore),
      "subjectMean": parseFloat(subjectMean),
      "sDeviation": parseFloat(sDeviation),
      "headCount": parseInt(headCount),
      "ranking": parseInt(ranking)
    };
    axios.post('api/8482/score', newScore, {withCredentials: true})
    .then(response => {
      // scoreData에 새로운 데이터 추가
      console.log(newScore)
      const key = `${newScore.schoolYear}-${newScore.schoolTerm}`;
      if (!scoreData[key]) {
        scoreData[key] = [];
      }
      scoreData[key].push({
        curriculum: newScore.curriculum,
        subjectName: newScore.subjectName,
        credit: newScore.credit,
        rawScore: newScore.rawScore,
        subjectMean: newScore.subjectMean,
        sDeviation: newScore.sDeviation,
        headCount: newScore.headCount,
        ranking: newScore.ranking
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

      PostAverage(schoolYear, schoolTerm);
    })
    .catch(error => {
      console.error('성적 추가 중 오류가 발생했습니다.', error);
    });
  };

  // 과목 조회
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

  // 평균 성적 가져오기
  useEffect(() => {
    axios.get('/api/8482/average', {withCredentials: true})
      .then(response => {
        const data = response.data;
        let roundedNumberallSubject = parseFloat(data.allSubjectDegree.toFixed(2));
        let roundedNumberkemr = parseFloat(data.kemrDegree.toFixed(2));
        setMainAverage(roundedNumberallSubject);
        setKemrAverage(roundedNumberkemr);
      })
      .catch(error => {
        console.error('평균 성적 데이터를 가져오는 중 오류가 발생했습니다.', error);
      });
  }, []);

  // 성적 불러오기
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
            subjectName: item.subjectName,
            credit: item.credit,
            rawScore: item.rawScore,
            subjectMean: item.subjectMean,
            sDeviation: item.sdeviation,
            headCount: item.headCount,
            ranking: item.ranking
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
                      <td>{score.subjectName}</td>
                      <td>{score.credit}</td>
                      <td>{score.rawScore}</td>
                      <td>{score.subjectMean}</td>
                      <td>{score.sDeviation}</td>
                      <td>{score.headCount}</td>
                      <td>{score.ranking}</td>
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
                      {selectedCurriculum && subjects[selectedCurriculum] && subjects[selectedCurriculum].map((subjectName, index) => (
                        <option key={index} value={subjectName}>{subjectName}</option>
                      ))}
                    </select>
                  </th>
                  <th scope="col">
                    <Input
                      id="credit"
                      placeholder=""
                      type="text"
                      value={credit}
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
                      id="subjectMean"
                      placeholder=""
                      type="text"
                      value={subjectMean}
                      onChange={handleSubjectAverageChange}
                    />
                  </th>
                  <th scope="col">
                    <Input
                      id="sdeviation"
                      placeholder=""
                      type="text"
                      value={sDeviation}
                      onChange={handleStandardDeviationChange}
                    />
                  </th>
                  <th scope="col">
                    <Input
                      id="headCount"
                      placeholder=""
                      type="text"
                      value={headCount}
                      onChange={handleStudentsNumberChange}
                    />
                  </th>
                  <th scope="col">
                    <Input
                      id="ranking"
                      placeholder=""
                      type="text"
                      value={ranking}
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