import React, { useState, useEffect } from "react";
import SearchComponent from "./SearchComponent";
import "./FullAnal.css";

function FullAnal() {
    let searchData = [
        {
            "계열": "공학",
            "대학": "서울대학교",
            "학과": "컴퓨터공학과"
        },
        {
            "계열": "자연",
            "대학": "연세대학교",
            "학과": "물리학과"
        },
        {
            "계열": "예술",
            "대학": "홍익대학교",
            "학과": "미술학과"
        },
        {
            "계열": "공학",
            "대학": "포항공과대학교",
            "학과": "기계공학과"
        },
        {
            "계열": "의학",
            "대학": "경희대학교",
            "학과": "의학과"
        },
        {
            "계열": "인문",
            "대학": "고려대학교",
            "학과": "철학과"
        },
        {
            "계열": "사회과학",
            "대학": "서강대학교",
            "학과": "심리학과"
        },
        {
            "계열": "경영학",
            "대학": "한양대학교",
            "학과": "경영학과"
        },
        {
            "계열": "예술",
            "대학": "서울예술대학교",
            "학과": "연극학과"
        },
        {
            "계열": "자연",
            "대학": "서울과학기술대학교",
            "학과": "화학과"
        }
    ]

    const [selectedDivision, setSelectedDivision] = useState(null);
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [displayText, setDisplayText] = useState({
        division: '',
        university: '',
        department: ''
    });

    // 각 카테고리에 대한 옵션 생성
    const divisionOptions = Array.from(new Set(searchData.map(data => data.계열))).map(division => ({ value: division, label: division }));
    const [universityOptions, setUniversityOptions] = useState([]);
const [departmentOptions, setDepartmentOptions] = useState([]);

useEffect(() => {
    setUniversityOptions(Array.from(new Set(searchData.map(data => data.대학)))
        .map(university => ({ value: university, label: university })));
    setDepartmentOptions(Array.from(new Set(searchData.map(data => data.학과)))
        .map(department => ({ value: department, label: department })));
}, []);

    // 선택한 옵션을 임시 상태에 저장
    const handleDivisionChange = selectedOption => {
        setSelectedDivision(selectedOption);
        // 계열에 따라 대학 목록 필터링
        const filteredUniversities = searchData.filter(data => data.계열 === selectedOption.value);
        const uniqueUniversities = Array.from(new Set(filteredUniversities.map(data => data.대학)));
        const updatedUniversityOptions = uniqueUniversities.map(university => ({ value: university, label: university }));
        setUniversityOptions(updatedUniversityOptions);
        setSelectedUniversity(null); // 대학 선택 초기화
        setSelectedDepartment(null); // 학과 선택 초기화
        setDepartmentOptions([]); // 학과 옵션 초기화
         const uniqueDepartments = Array.from(new Set(searchData.filter(data => data.계열 === selectedOption.value).map(data => data.학과)));
    const updatedDepartmentOptions = uniqueDepartments.map(department => ({ value: department, label: department }));
    setDepartmentOptions(updatedDepartmentOptions);
    setSelectedDepartment(null); // 학과 선택 초기화
    };    

    const handleUniversityChange = selectedOption => {
        setSelectedUniversity(selectedOption);
        // 대학에 따라 학과 목록 필터링
        const filteredDepartments = searchData.filter(data => data.대학 === selectedOption.value);
        const uniqueDepartments = Array.from(new Set(filteredDepartments.map(data => data.학과)));
        const updatedDepartmentOptions = uniqueDepartments.map(department => ({ value: department, label: department }));
        setDepartmentOptions(updatedDepartmentOptions);
        setSelectedDepartment(null); // 학과 선택 초기화
    };

    const handleDepartmentChange = selectedOption => {
        setSelectedDepartment(selectedOption);
    };

    // 검색 버튼 클릭 시 displayText 상태 업데이트
    const handleSearchClick = () => {
        setDisplayText({
            division: selectedDivision ? selectedDivision.label : '',
            university: selectedUniversity ? selectedUniversity.label : '',
            department: selectedDepartment ? selectedDepartment.label : ''
        });
    };

    let newData = [
        {
            school: "목포대학교",
            major: "컴퓨터공학과",
            admissionProbability: "95"
        },
        {
            school: "안동대학교",
            major: "문학학과",
            admissionProbability: "65"
        },
        {
            school: "경기대학교",
            major: "신소재공학과",
            admissionProbability: "76"
        },
        {
            school: "가천대학교",
            major: "화학공학과",
            admissionProbability: "59"
        },
        {
            school: "전남대학교",
            major: "물리학과",
            admissionProbability: "63"
        },
        {
            school: "서울과학기술대학교",
            major: "전자공학과",
            admissionProbability: "25"
        },
        {
            school: "성균관대학교",
            major: "법학과",
            admissionProbability: "20"
        },
        {
            school: "한양대학교",
            major: "경영학과",
            admissionProbability: "15"
        },
        {
            school: "연세대학교",
            major: "의학과",
            admissionProbability: "22"
        },
        {
            school: "고려대학교",
            major: "정치외교학과",
            admissionProbability: "20"
        },
        {
            school: "이화여자대학교",
            major: "교육학과",
            admissionProbability: "10"
        },
        {
            school: "서강대학교",
            major: "물리교육과",
            admissionProbability: "1"
        },
        {
            school: "서울대학교",
            major: "철학과",
            admissionProbability: "5"
        },
        {
            school: "전남대학교",
            major: "소프트웨어학과",
            admissionProbability: "38"
        },
        {
            school: "전북대학교",
            major: "기계공학과",
            admissionProbability: "41"
        },
        {
            school: "충남대학교",
            major: "경영학과",
            admissionProbability: "36"
        },
        {
            school: "충북대학교",
            major: "회계학과",
            admissionProbability: "32"
        },
        {
            school: "전북대학교",
            major: "기계공학과",
            admissionProbability: "41"
        },
        {
            school: "경상대학교",
            major: "물리교육과",
            admissionProbability: "28"
        },
        {
            school: "전남대학교",
            major: "사회교육과",
            admissionProbability: "26"
        },
        {
            school: "전남대학교",
            major: "전자정보공학과",
            admissionProbability: "45"
        },
        {
            school: "충남대학교",
            major: "소프트웨어학과",
            admissionProbability: "49"
        },
        {
            school: "충북대학교",
            major: "건축공학과",
            admissionProbability: "39"
        },
        {
            school: "충남대학교",
            major: "화학공학과",
            admissionProbability: "57"
        },
        {
            school: "한국해양대학교",
            major: "해양학과",
            admissionProbability: "60"
        },
        {
            school: "강원대학교",
            major: "산업공학과",
            admissionProbability: "52"
        },
        {
            school: "경북대학교",
            major: "컴퓨터공학과",
            admissionProbability: "79"
        },
        {
            school: "순천대학교",
            major: "전기공학과",
            admissionProbability: "85"
        },
        {
            school: "조선대학교",
            major: "화학공학과",
            admissionProbability: "100"
        },
        {
            school: "전북대학교",
            major: "경제학과",
            admissionProbability: "84"
        },
        {
            school: "아주대학교",
            major: "국제학과",
            admissionProbability: "73"
        },
        {
            school: "한밭대학교",
            major: "의학과",
            admissionProbability: "75"
        },
        {
            school: "충북대학교",
            major: "사회학과",
            admissionProbability: "78"
        },
        {
            school: "경북대학교",
            major: "경영학과",
            admissionProbability: "82"
        },
        {
            school: "군산대학교",
            major: "기계공학과",
            admissionProbability: "90"
        },
        {
            school: "목포대학교",
            major: "융합소프트웨어학과",
            admissionProbability: "87"
        },
        {
            school: "건양대학교",
            major: "정보보안학과",
            admissionProbability: "92"
        },
        {
            school: "전남대학교",
            major: "패션의류학과",
            admissionProbability: "67"
        },
        {
            school: "전북대학교",
            major: "경제학과",
            admissionProbability: "84"
        },
        {
            school: "충북대학교",
            major: "사회학과",
            admissionProbability: "78"
        },
        {
            school: "경북대학교",
            major: "경영학과",
            admissionProbability: "82"
        },
        {
            school: "경남대학교",
            major: "교육학과",
            admissionProbability: "79"
        },
        {
            school: "안동대학교",
            major: "예술학과",
            admissionProbability: "74"
        },
        {
            school: "경기대학교",
            major: "신소재공학과",
            admissionProbability: "76"
        },
        {
            school: "가천대학교",
            major: "화학공학과",
            admissionProbability: "70"
        },
        {
            school: "경북대학교",
            major: "컴퓨터공학과",
            admissionProbability: "79"
        },
        {
            school: "아주대학교",
            major: "전기공학과",
            admissionProbability: "70"
        },
        {
            school: "한밭대학교",
            major: "의학과",
            admissionProbability: "75"
        },
        {
            school: "순천대학교",
            major: "토목공학과",
            admissionProbability: "89"
        },
        {
            school: "순천대학교",
            major: "에너지화학공학과",
            admissionProbability: "97"
        },
        {
            school: "순천대학교",
            major: "건축공학과",
            admissionProbability: "86"
        },
        {
            school: "군산대학교",
            major: "화학공학과",
            admissionProbability: "88"
        },
        {
            school: "경남대학교",
            major: "교육학과",
            admissionProbability: "79"
        },
        {
            school: "안동대학교",
            major: "문화학과",
            admissionProbability: "71"
        },
        {
            school: "경기대학교",
            major: "신소재공학과",
            admissionProbability: "76"
        },
        {
            school: "가천대학교",
            major: "기계공학과",
            admissionProbability: "62"
        },
        {
            school: "경북대학교",
            major: "컴퓨터공학과",
            admissionProbability: "79"
        },
        {
            school: "경상대학교",
            major: "철학과",
            admissionProbability: "83"
        },
        {
            school: "조선대학교",
            major: "생명공학과",
            admissionProbability: "91"
        },
        {
            school: "군산대학교",
            major: "조선해양공학과",
            admissionProbability: "98"
        },
        {
            school: "한밭대학교",
            major: "수학교육과",
            admissionProbability: "69"
        },
        {
            school: "인하대학교",
            major: "물리학과",
            admissionProbability: "55"
        },
        {
            school: "경기대학교",
            major: "전기공학과",
            admissionProbability: "64"
        },
        {
            school: "경기대학교",
            major: "컴퓨터과학과",
            admissionProbability: "67"
        },

        /*
        {
            school: "목포대학교",
            major: "컴퓨터공학과",
            admissionProbability: "95"
        },
        {
            school: "안동대학교",
            major: "문학학과",
            admissionProbability: "65"
        },
        {
            school: "경기대학교",
            major: "신소재공학과",
            admissionProbability: "76"
        },
        {
            school: "가천대학교",
            major: "화학공학과",
            admissionProbability: "59"
        },
        {
            school: "전남대학교",
            major: "물리학과",
            admissionProbability: "63"
        },
        {
            school: "서울과학기술대학교",
            major: "전자공학과",
            admissionProbability: "25"
        },
        {
            school: "성균관대학교",
            major: "법학과",
            admissionProbability: "20"
        },
        {
            school: "한양대학교",
            major: "경영학과",
            admissionProbability: "15"
        },
        {
            school: "연세대학교",
            major: "의학과",
            admissionProbability: "22"
        },
        {
            school: "고려대학교",
            major: "정치외교학과",
            admissionProbability: "20"
        },
        {
            school: "이화여자대학교",
            major: "교육학과",
            admissionProbability: "10"
        },
        {
            school: "서강대학교",
            major: "물리교육과",
            admissionProbability: "1"
        },
        {
            school: "서울대학교",
            major: "철학과",
            admissionProbability: "5"
        },
        {
            school: "전남대학교",
            major: "소프트웨어학과",
            admissionProbability: "38"
        },
        {
            school: "전북대학교",
            major: "기계공학과",
            admissionProbability: "41"
        },
        {
            school: "충남대학교",
            major: "경영학과",
            admissionProbability: "36"
        },
        {
            school: "충북대학교",
            major: "회계학과",
            admissionProbability: "32"
        },
        {
            school: "전북대학교",
            major: "기계공학과",
            admissionProbability: "41"
        },
        {
            school: "경상대학교",
            major: "물리교육과",
            admissionProbability: "28"
        },
        {
            school: "전남대학교",
            major: "사회교육과",
            admissionProbability: "26"
        },
        {
            school: "전남대학교",
            major: "전자정보공학과",
            admissionProbability: "45"
        },
        {
            school: "충남대학교",
            major: "소프트웨어학과",
            admissionProbability: "49"
        },
        {
            school: "충북대학교",
            major: "건축공학과",
            admissionProbability: "39"
        },
        {
            school: "충남대학교",
            major: "화학공학과",
            admissionProbability: "57"
        },
        {
            school: "한국해양대학교",
            major: "해양학과",
            admissionProbability: "60"
        },
        {
            school: "강원대학교",
            major: "산업공학과",
            admissionProbability: "52"
        },
        {
            school: "경북대학교",
            major: "컴퓨터공학과",
            admissionProbability: "79"
        },
        {
            school: "순천대학교",
            major: "전기공학과",
            admissionProbability: "85"
        },
        {
            school: "조선대학교",
            major: "화학공학과",
            admissionProbability: "100"
        },
        {
            school: "전북대학교",
            major: "경제학과",
            admissionProbability: "84"
        },
        {
            school: "아주대학교",
            major: "국제학과",
            admissionProbability: "73"
        },
        {
            school: "한밭대학교",
            major: "의학과",
            admissionProbability: "75"
        },
        {
            school: "충북대학교",
            major: "사회학과",
            admissionProbability: "78"
        },
        {
            school: "경북대학교",
            major: "경영학과",
            admissionProbability: "82"
        },
        {
            school: "군산대학교",
            major: "기계공학과",
            admissionProbability: "90"
        },
        {
            school: "목포대학교",
            major: "융합소프트웨어학과",
            admissionProbability: "87"
        },
        {
            school: "건양대학교",
            major: "정보보안학과",
            admissionProbability: "92"
        },
        {
            school: "전남대학교",
            major: "패션의류학과",
            admissionProbability: "67"
        },
        {
            school: "전북대학교",
            major: "경제학과",
            admissionProbability: "84"
        },
        {
            school: "충북대학교",
            major: "사회학과",
            admissionProbability: "78"
        },
        {
            school: "경북대학교",
            major: "경영학과",
            admissionProbability: "82"
        },
        {
            school: "경남대학교",
            major: "교육학과",
            admissionProbability: "79"
        },
        {
            school: "안동대학교",
            major: "예술학과",
            admissionProbability: "74"
        },
        {
            school: "경기대학교",
            major: "신소재공학과",
            admissionProbability: "76"
        },
        {
            school: "가천대학교",
            major: "화학공학과",
            admissionProbability: "70"
        },
        {
            school: "경북대학교",
            major: "컴퓨터공학과",
            admissionProbability: "79"
        },
        {
            school: "아주대학교",
            major: "전기공학과",
            admissionProbability: "70"
        },
        {
            school: "한밭대학교",
            major: "의학과",
            admissionProbability: "75"
        },
        {
            school: "순천대학교",
            major: "토목공학과",
            admissionProbability: "89"
        },
        {
            school: "순천대학교",
            major: "에너지화학공학과",
            admissionProbability: "97"
        },
        {
            school: "순천대학교",
            major: "건축공학과",
            admissionProbability: "86"
        },
        {
            school: "군산대학교",
            major: "화학공학과",
            admissionProbability: "88"
        },
        {
            school: "경남대학교",
            major: "교육학과",
            admissionProbability: "79"
        },
        {
            school: "안동대학교",
            major: "문화학과",
            admissionProbability: "71"
        },
        {
            school: "경기대학교",
            major: "신소재공학과",
            admissionProbability: "76"
        },
        {
            school: "가천대학교",
            major: "기계공학과",
            admissionProbability: "62"
        },
        {
            school: "경북대학교",
            major: "컴퓨터공학과",
            admissionProbability: "79"
        },
        {
            school: "경상대학교",
            major: "철학과",
            admissionProbability: "83"
        },
        {
            school: "조선대학교",
            major: "생명공학과",
            admissionProbability: "91"
        },
        {
            school: "군산대학교",
            major: "조선해양공학과",
            admissionProbability: "98"
        },
        {
            school: "한밭대학교",
            major: "수학교육과",
            admissionProbability: "69"
        },
        {
            school: "인하대학교",
            major: "물리학과",
            admissionProbability: "55"
        },
        {
            school: "경기대학교",
            major: "전기공학과",
            admissionProbability: "64"
        },
        {
            school: "경기대학교",
            major: "컴퓨터과학과",
            admissionProbability: "67"
        },
        */
    ];

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setTotalPages(Math.ceil(data.length / itemsPerPage));
    }, [data]);

    useEffect(() => {
        // admissionProbability에 따라 category 자동 분류
        const categorizedData = newData.map(item => ({
            ...item,
            category: getCategory(item.admissionProbability),
        }));
        setData(categorizedData);
        setTotalPages(Math.ceil(categorizedData.length / itemsPerPage));
    }, []);

    const getCategory = (probability) => {
        if (probability >= 75) return "여유";
        if (probability >= 50) return "적절";
        if (probability >= 21) return "도전";
        return "위험";
    };

    const handleButtonClick = (category) => {
        const filteredData = data.filter(item => item.category === category);
        setFilteredData(filteredData);
        // 합격률에 따라 내림차순 정렬
        filteredData.sort((a, b) => b.admissionProbability - a.admissionProbability);
        setFilteredData(filteredData);
        setCurrentPage(1); // 데이터 필터링 후 첫 페이지로 초기화
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousButtonClick = () => {
        setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
    };

    const handleNextButtonClick = () => {
        setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages);
    };

    const renderPageNumbers = () => {
        let startPage, endPage;
        if (totalPages <= 10) {
            // 전체 페이지가 10개 이하인 경우
            startPage = 1;
            endPage = totalPages;
        } else {
            // 현재 페이지가 5 이상인 경우, 앞으로 5개, 뒤로 5개의 페이지 번호를 표시
            if (currentPage <= 5) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 5;
            }
        }

        return (
            <div className="pageNumbers">
                {Array.from({ length: (endPage + 1) - startPage }, (_, i) => startPage + i).map(number => (
                    <span key={number}
                        className={`pageNumber ${currentPage === number ? 'active' : ''}`}
                        onClick={() => handlePageClick(number)}
                        style={{ cursor: 'pointer', margin: '0 10px' }}>
                        {number}
                    </span>
                ))}
            </div>
        );
    };

    const startIndex = (currentPage - 1) * itemsPerPage;

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
            <SearchComponent
                divisionOptions={divisionOptions}
                universityOptions={universityOptions}
                departmentOptions={departmentOptions}
                selectedDivision={selectedDivision}
                selectedUniversity={selectedUniversity}
                selectedDepartment={selectedDepartment}
                onDivisionChange={handleDivisionChange}
                onUniversityChange={handleUniversityChange}
                onDepartmentChange={handleDepartmentChange}
                onSearchClick={handleSearchClick}
            />
            <div className="contentLayout">
                <div className="lineInputContainer">
                    <span className="submitText">희망 계열:</span>
                    <span className="inputText">{displayText.division}</span>
                </div>
                <div className="universityInputContainer">
                    <span className="submitText">희망 대학:</span>
                    <span className="inputText">{displayText.university}</span>
                </div>
                <div className="departmentInputContainer">
                    <span className="submitText">희망 학과:</span>
                    <span className="inputText">{displayText.department}</span>
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
                    {filteredData.slice(startIndex, startIndex + itemsPerPage).map((item, index) => (
                        <div className="column" key={index}>
                            <div className={`box ${getColorClass(item.category)}`}>{item.school}</div>
                            <div className={`box ${getColorClass(item.category)}`}>{item.major}</div>
                            <div className="progressBarContainer">
                                <div className={`progressBar ${getColorClass(item.category)}`} style={{ width: `${item.admissionProbability}%` }}>
                                    <span className="progressText">{item.admissionProbability}%</span>
                                </div>
                            </div>
                            <div className={`box category-${getColorClass(item.category)}`}>{item.category}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 이전 버튼과 다음 버튼 사이에 페이지 수 표시 */}
            <div className="pagination">
                <button className="previousButton" onClick={handlePreviousButtonClick} disabled={currentPage === 1}>
                    &lt;
                </button>
                {renderPageNumbers()}
                <button className="nextButton" onClick={handleNextButtonClick} disabled={currentPage === totalPages}>
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default FullAnal;
