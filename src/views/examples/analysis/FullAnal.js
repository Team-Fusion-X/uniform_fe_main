import React, { useState, useEffect } from "react";
import "./FullAnal.css";

function FullAnal() {
    const [data, setData] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10; // 페이지 당 항목 수

    useEffect(() => {
        // 데이터가 업데이트될 때마다 총 페이지 수를 다시 계산
        setTotalPages(Math.ceil(data.length / itemsPerPage));
    }, [data]);

    const handleButtonClick = (category) => {
        let newData = [];
        switch (category) {
            case "여유":
                newData = [
                    {
                        school: "목포대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "95",
                        category: "여유",
                    },
                    {
                        school: "순천대학교",
                        major: "전기공학과",
                        admissionProbability: "85",
                        category: "여유",
                    },
                    {
                        school: "조선대학교",
                        major: "화학공학과",
                        admissionProbability: "100",
                        category: "여유",
                    },
                    {
                        school: "군산대학교",
                        major: "기계공학과",
                        admissionProbability: "90",
                        category: "여유",
                    },
                ];
                break;
            case "적절":
                newData = [
                    {
                        school: "전북대학교",
                        major: "경제학과",
                        admissionProbability: "84",
                        category: "적절",
                    },
                    {
                        school: "아주대학교",
                        major: "국제학과",
                        admissionProbability: "71",
                        category: "적절",
                    },
                    {
                        school: "한밭대학교",
                        major: "의학과",
                        admissionProbability: "75",
                        category: "적절",
                    },
                    {
                        school: "충북대학교",
                        major: "사회학과",
                        admissionProbability: "78",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "경영학과",
                        admissionProbability: "82",
                        category: "적절",
                    },
                    {
                        school: "경남대학교",
                        major: "교육학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "안동대학교",
                        major: "예술학과",
                        admissionProbability: "74",
                        category: "적절",
                    },
                    {
                        school: "경기대학교",
                        major: "신소재공학과",
                        admissionProbability: "76",
                        category: "적절",
                    },
                    {
                        school: "가천대학교",
                        major: "화학공학과",
                        admissionProbability: "70",
                        category: "적절",
                    },
                    {
                        school: "경북대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "79",
                        category: "적절",
                    },
                    {
                        school: "경상대학교",
                        major: "철학과",
                        admissionProbability: "83",
                        category: "적절",
                    },
                    {
                        school: "전남대학교",
                        major: "패션의류학과",
                        admissionProbability: "67",
                        category: "적절",
                    },
                ];
                break;
            case "도전":
                newData = [
                    {
                        school: "전남대학교",
                        major: "물리학과",
                        admissionProbability: "63",
                        category: "도전",
                    },
                    {
                        school: "부산대학교",
                        major: "영어학과",
                        admissionProbability: "45",
                        category: "도전",
                    },
                    {
                        school: "충남대학교",
                        major: "화학공학과",
                        admissionProbability: "57",
                        category: "도전",
                    },
                    {
                        school: "한국해양대학교",
                        major: "해양학과",
                        admissionProbability: "60",
                        category: "도전",
                    },
                    {
                        school: "강원대학교",
                        major: "산업공학과",
                        admissionProbability: "52",
                        category: "도전",
                    },
                ];
                break;
            case "위험":
                newData = [
                    {
                        school: "서울과학기술대학교",
                        major: "전자공학과",
                        admissionProbability: "25",
                        category: "위험",
                    },
                    {
                        school: "성균관대학교",
                        major: "법학과",
                        admissionProbability: "20",
                        category: "위험",
                    },
                    {
                        school: "한양대학교",
                        major: "경영학과",
                        admissionProbability: "15",
                        category: "위험",
                    },
                    {
                        school: "연세대학교",
                        major: "의학과",
                        admissionProbability: "22",
                        category: "위험",
                    },
                    {
                        school: "고려대학교",
                        major: "정치외교학과",
                        admissionProbability: "20",
                        category: "위험",
                    },
                    {
                        school: "이화여자대학교",
                        major: "교육학과",
                        admissionProbability: "10",
                        category: "위험",
                    },
                    {
                        school: "서강대학교",
                        major: "물리교육과",
                        admissionProbability: "1",
                        category: "위험",
                    },
                    {
                        school: "서울대학교",
                        major: "철학과",
                        admissionProbability: "5",
                        category: "위험",
                    },
                ];
                break;
            default:
                break;
        }
        // 합격률에 따라 내림차순 정렬
        newData.sort((a, b) => b.admissionProbability - a.admissionProbability);
        setData(newData);
        setStartIndex(0); // 데이터가 변경될 때 시작 인덱스를 0으로 초기화
    };

    const handlePreviousButtonClick = () => {
        setStartIndex(Math.max(0, startIndex - 10)); // 이전 버튼 클릭 시 시작 인덱스 변경
    };

    const handleNextButtonClick = () => {
        if (startIndex + 10 < data.length) {
            setStartIndex(startIndex + 10); // 다음 버튼 클릭 시 시작 인덱스 변경
        }
    };

    const getColorClass = (category) => {
        switch (category) {
            case "여유":
                return "blue";
            case "적절":
                return "lime";
            case "도전":
                return "orange";
            case "위험":
                return "red";
            default:
                return "";
        }
    };

    return (
        <div className="fullAnalLayout">
            <div className="contentLayout">
                {/* 성적 입력 칸 레이아웃 */}
                <div className="gradeInputContainer">
                    <span className="submitText">내 성적</span>
                    <input type="text" placeholder="내 등급" />
                </div>
                <div className="departmentInputContainer">
                    <span className="submitText">희망 학과</span>
                    <input type="text" placeholder="희망 학과" />
                </div>

                {/* 버튼 4개가 들어있는 컨테이너 */}
                <div className="buttonContainer">
                    <button className="categoryButton" onClick={() => handleButtonClick("여유")}>
                        여유
                    </button>
                    <button className="categoryButton" onClick={() => handleButtonClick("적절")}>
                        적절
                    </button>
                    <button className="categoryButton" onClick={() => handleButtonClick("도전")}>
                        도전
                    </button>
                    <button className="categoryButton" onClick={() => handleButtonClick("위험")}>
                        위험
                    </button>
                </div>
            </div>
            <div className="contentBelow">
                <div className="fourColumns">
                    {data.slice(startIndex, startIndex + 10).map((item, index) => (
                        <div className="column" key={index}>
                            <div className={`box ${getColorClass(item.category)}`}>{item.school}</div>
                            <div className={`box ${getColorClass(item.category)}`}>{item.major}</div>
                            <div className="progressBarContainer">
                                <div className={`progressBar ${getColorClass(item.category)}`} style={{ width: `${item.admissionProbability}%` }}>
                                    <span className="progressText">{item.admissionProbability}%</span>
                                </div>
                            </div>
                            <div className={`box red-text`}>{item.category}</div>
                        </div>
                    ))}
                </div>
            </div>
            {/* 이전 버튼과 다음 버튼 사이에 페이지 수 표시 */}
            <div className="pagination">
                <button className="previousButton" onClick={handlePreviousButtonClick}>
                    &lt;
                </button>
                {/* 현재 페이지 번호와 총 페이지 수를 표시 */}
                <span className="pageInfo">{`${startIndex / itemsPerPage + 1}/${totalPages}`}</span>
                <button className="nextButton" onClick={handleNextButtonClick}>
                    &gt;
                </button>
            </div>

        </div>
    );
}

export default FullAnal;