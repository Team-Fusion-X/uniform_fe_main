import React, { useState, useEffect } from "react";
import universityData from "../UniversityData.json";
import MapData from '../Map/json/map_data.json';
import SearchComponent from "./SearchComponent";
import axios from 'axios';
import "./FullAnal.css";

function FullAnal() {
    const [searchData, setSearchData] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [logoMap, setLogoMap] = useState({});
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [displayText, setDisplayText] = useState({
        division: '',
        university: '',
        department: ''
    });

    // 각 카테고리에 대한 옵션 생성
    const divisionOptions = Array.from(new Set(universityData.map(item => item.fields))).map(fields => ({ value: fields, label: fields }));
    const [universityOptions, setUniversityOptions] = useState([]);
    const [departmentOptions, setDepartmentOptions] = useState([]);

    useEffect(() => {
        setSearchData(universityData);

        // 대학 및 학과 옵션 초기화
        setUniversityOptions(Array.from(new Set(universityData.map(item => item.university)))
            .map(university => ({ value: university, label: university })));

        setDepartmentOptions(getFilteredDepartments(universityData));
    }, []);

    useEffect(() => {
        // map_data.json에서 로고 매핑 정보 로드
        const logoMapTemp = {};
        MapData.forEach(school => {
            logoMapTemp[school.university] = school.logo;
        });
        setLogoMap(logoMapTemp);
    }, []);

    useEffect(() => {
        if (selectedDivision) {
            const filteredDepartments = universityData.filter(item => item.fields === selectedDivision.value);
            const updatedDepartmentOptions = getFilteredDepartments(filteredDepartments);
            setDepartmentOptions(updatedDepartmentOptions);
        }
    }, [selectedDivision]); // selectedDivision이 변경될 때마다 실행

    // 학과 옵션 필터링 로직
    const getFilteredDepartments = (data) => {
        const departmentMap = new Map();
        data.forEach(item => {
            const department = item.department;
            if (department.length >= 5) {
                if (departmentMap.has(department.substring(0, 5))) {
                    const existing = departmentMap.get(department.substring(0, 5));
                    if (department.length < existing.length) {
                        departmentMap.set(department.substring(0, 5), department);
                    }
                } else {
                    departmentMap.set(department.substring(0, 5), department);
                }
            } else {
                departmentMap.set(department, department);
            }
        });

        return Array.from(departmentMap.values()).map(dept => ({ value: dept, label: dept }));
    };

    // 선택한 옵션을 임시 상태에 저장
    const handleDivisionChange = selectedOption => {
        setSelectedDivision(selectedOption);
        if (!selectedOption) {
            const allUniversities = Array.from(new Set(universityData.map(item => item.university)))
                .map(university => ({ value: university, label: university }));
            const allDepartments = getFilteredDepartments(universityData);

            setUniversityOptions(allUniversities);
            setDepartmentOptions(allDepartments);
            setSelectedUniversity(null);
            setSelectedDepartment(null);
            setDisplayText({
                division: '',
                university: '',
                department: ''
            });
            return;
        }

        // 계열에 따라 대학 목록 필터링
        const filteredUniversities = universityData.filter(item => item.fields === selectedOption.value);
        const uniqueUniversities = Array.from(new Set(filteredUniversities.map(item => item.university)));
        const updatedUniversityOptions = uniqueUniversities.map(university => ({ value: university, label: university }));
        setUniversityOptions(updatedUniversityOptions);

        const filteredDepartments = universityData.filter(item => item.fields === selectedOption.value);
        const updatedDepartmentOptions = getFilteredDepartments(filteredDepartments);
        setDepartmentOptions(updatedDepartmentOptions);

        setSelectedUniversity(null);
        setSelectedDepartment(null);

        setSelectedUniversity(null);
        setSelectedDepartment(null);
        setDepartmentOptions([]);
    };

    const handleUniversityChange = selectedOption => {
        setSelectedUniversity(selectedOption);
        if (!selectedOption) {
            if (selectedDivision) {
                const filteredDepartments = universityData.filter(item => item.fields === selectedDivision.value);
                setDepartmentOptions(getFilteredDepartments(filteredDepartments));
            } else {
                setDepartmentOptions(getFilteredDepartments(universityData));
            }
            setSelectedDepartment(null);
            setDisplayText(prev => ({
                ...prev,
                university: '',
                department: ''
            }));
            return;
        }

        const filteredDepartments = universityData.filter(item => {
            if (selectedDivision) {
                return item.fields === selectedDivision.value && item.university === selectedOption.value;
            }
            return item.university === selectedOption.value;
        });

        setDepartmentOptions(getFilteredDepartments(filteredDepartments));
        setSelectedDepartment(null);
    };

    const handleDepartmentChange = selectedOption => {
        setSelectedDepartment(selectedOption);
        if (!selectedOption) {
            if (selectedDivision && selectedUniversity) {
                const filteredDepartments = universityData.filter(item =>
                    item.fields === selectedDivision.value && item.university === selectedUniversity.value
                );
                setDepartmentOptions(getFilteredDepartments(filteredDepartments));
            } else if (selectedDivision) {
                const filteredDepartments = universityData.filter(item => item.fields === selectedDivision.value);
                setDepartmentOptions(getFilteredDepartments(filteredDepartments));
            } else if (selectedUniversity) {
                const filteredDepartments = universityData.filter(item => item.university === selectedUniversity.value);
                setDepartmentOptions(getFilteredDepartments(filteredDepartments));
            } else {
                setDepartmentOptions(getFilteredDepartments(universityData));
            }
        }
    };

    const handleSearchClick = () => {
        setDisplayText({
            division: selectedDivision ? selectedDivision.label : '',
            university: selectedUniversity ? selectedUniversity.label : '',
            department: selectedDepartment ? selectedDepartment.label : ''
        });
    
        // 서버가 요구하는 키 이름으로 객체 구성
        const jsonData = {
            field: selectedDivision ? selectedDivision.value : null,
            university: selectedUniversity ? selectedUniversity.value : null,
            major: selectedDepartment ? selectedDepartment.value : null,
            keyword: null
        };
        console.log('Sending data to server:', jsonData);
    
        axios.post('/api/8482/analysis', jsonData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('분석 결과:', response.data);
            // 서버로부터 받은 데이터로 상태 업데이트
            setData(response.data.map(item => ({
                ...item,
                category: getCategory(item.possibility),
            })));
            setTotalPages(Math.ceil(response.data.length / itemsPerPage));
            // 필터링 된 데이터 상태 초기화 (새로운 데이터에 맞게 UI 업데이트)
            setFilteredData([]);
        })
        .catch(error => {
            if (error.response) {
                console.error('Server responded with:', error.response.status, error.response.statusText, 'Message:', error.response.data);
            } else {
                console.error('분석 중 오류가 발생했습니다.', error.message);
            }
        });
    };

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setTotalPages(Math.ceil(data.length / itemsPerPage));
    }, [data]);

    useEffect(() => {
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    }, [filteredData]);

    const getCategory = (possibility) => {
        if (possibility >= 75) return "여유";
        if (possibility >= 50) return "적절";
        if (possibility >= 21) return "도전";
        return "위험";
    };

    const handleButtonClick = (category) => {
        const filteredData = data.filter(item => item.category === category);
        setFilteredData(filteredData);
        // 합격률에 따라 내림차순 정렬
        filteredData.sort((a, b) => b.possibility - a.possibility);
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
                    <button className="categoryButton1" onClick={() => handleButtonClick("여유")}>
                        여유
                    </button>
                    <button className="categoryButton2" onClick={() => handleButtonClick("적절")}>
                        적절
                    </button>
                    <button className="categoryButton3" onClick={() => handleButtonClick("도전")}>
                        도전
                    </button>
                    <button className="categoryButton4" onClick={() => handleButtonClick("위험")}>
                        위험
                    </button>
                </div>
            </div>
            <div className="contentBelow">
                <div className="fourColumns">
                    {filteredData.slice(startIndex, startIndex + itemsPerPage).map((item, index) => (
                        <div className="column" key={index}>
                            <div className={`box1`}>
                                <img src={logoMap[item.school]} alt={`${item.school} logo`} style={{ height: "50px", marginRight: "10px", verticalAlign: "middle" }} />
                            </div>
                            <div className={`box2 ${getColorClass(item.category)}`}>
                                {item.school}
                            </div>
                            <div className={`box3 ${getColorClass(item.category)}`}>{item.major}</div>
                            <div className="progressBarContainer">
                                <div className={`progressBar ${getColorClass(item.category)}`} style={{ width: `${item.admissionProbability}%` }}>
                                    <span className="progressText">{item.admissionProbability}%</span>
                                </div>
                            </div>
                            <div className={`box4 category-${getColorClass(item.category)}`}>{item.category}</div>
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



/*서버 코드 반영한 코드로, 추후에 백엔드 진행 후 사용될 예정이니 주석 처리 해둡니다.
import React, { useState, useEffect } from "react";
import universityData from "../UniversityData.json";
import SearchComponent from "./SearchComponent";
import "./FullAnal.css";
import Modal from './FullAnalModal.js';

function FullAnal() {
    const [searchData, setSearchData] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [displayText, setDisplayText] = useState({
        division: '',
        university: '',
        department: ''
    });

    // 각 카테고리에 대한 옵션 생성
    const divisionOptions = Array.from(new Set(universityData.map(item => item.fields))).map(fields => ({ value: fields, label: fields }));
    const [universityOptions, setUniversityOptions] = useState([]);
    const [departmentOptions, setDepartmentOptions] = useState([]);

    useEffect(() => {
        setSearchData(universityData);

        // 대학 및 학과 옵션 초기화
        setUniversityOptions(Array.from(new Set(universityData.map(item => item.university)))
            .map(university => ({ value: university, label: university })));

        setDepartmentOptions(getFilteredDepartments(universityData));
    }, []);

    // 학과 옵션 필터링 로직
    const getFilteredDepartments = (data) => {
        const departmentMap = new Map();
        data.forEach(item => {
            const department = item.department;
            if (department.length >= 5) {
                if (departmentMap.has(department.substring(0, 5))) {
                    const existing = departmentMap.get(department.substring(0, 5));
                    if (department.length < existing.length) {
                        departmentMap.set(department.substring(0, 5), department);
                    }
                } else {
                    departmentMap.set(department.substring(0, 5), department);
                }
            } else {
                departmentMap.set(department, department);
            }
        });

        return Array.from(departmentMap.values()).map(dept => ({ value: dept, label: dept }));
    };

    // 선택한 옵션을 임시 상태에 저장
    const handleDivisionChange = selectedOption => {
        setSelectedDivision(selectedOption);
        if (!selectedOption) {
            const allUniversities = Array.from(new Set(universityData.map(item => item.university)))
                .map(university => ({ value: university, label: university }));
            const allDepartments = getFilteredDepartments(universityData);

            setUniversityOptions(allUniversities);
            setDepartmentOptions(allDepartments);
            setSelectedUniversity(null);
            setSelectedDepartment(null);
            setDisplayText({
                division: '',
                university: '',
                department: ''
            });
            return;
        }

        // 계열에 따라 대학 목록 필터링
        const filteredUniversities = universityData.filter(item => item.fields === selectedOption.value);
        const uniqueUniversities = Array.from(new Set(filteredUniversities.map(item => item.university)));
        const updatedUniversityOptions = uniqueUniversities.map(university => ({ value: university, label: university }));
        setUniversityOptions(updatedUniversityOptions);

        setSelectedUniversity(null);
        setSelectedDepartment(null);
        setDepartmentOptions([]);
    };

    const handleUniversityChange = selectedOption => {
        setSelectedUniversity(selectedOption);
        if (!selectedOption) {
            if (selectedDivision) {
                const filteredDepartments = universityData.filter(item => item.fields === selectedDivision.value);
                setDepartmentOptions(getFilteredDepartments(filteredDepartments));
            } else {
                setDepartmentOptions(getFilteredDepartments(universityData));
            }
            setSelectedDepartment(null);
            setDisplayText(prev => ({
                ...prev,
                university: '',
                department: ''
            }));
            return;
        }

        const filteredDepartments = universityData.filter(item => {
            if (selectedDivision) {
                return item.fields === selectedDivision.value && item.university === selectedOption.value;
            }
            return item.university === selectedOption.value;
        });

        setDepartmentOptions(getFilteredDepartments(filteredDepartments));
        setSelectedDepartment(null);
    };

    const handleDepartmentChange = selectedOption => {
        setSelectedDepartment(selectedOption);
        if (!selectedOption) {
            if (selectedDivision && selectedUniversity) {
                const filteredDepartments = universityData.filter(item =>
                    item.fields === selectedDivision.value && item.university === selectedUniversity.value
                );
                setDepartmentOptions(getFilteredDepartments(filteredDepartments));
            } else if (selectedDivision) {
                const filteredDepartments = universityData.filter(item => item.fields === selectedDivision.value);
                setDepartmentOptions(getFilteredDepartments(filteredDepartments));
            } else if (selectedUniversity) {
                const filteredDepartments = universityData.filter(item => item.university === selectedUniversity.value);
                setDepartmentOptions(getFilteredDepartments(filteredDepartments));
            } else {
                setDepartmentOptions(getFilteredDepartments(universityData));
            }
        }
    };

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    const [filteredData, setFilteredData] = useState([]);

    const [loading, setLoading] = useState(false); // 로딩 여부를 저장하는 상태

    useEffect(() => {
        setTotalPages(Math.ceil(data.length / itemsPerPage));
    }, [data]);

    useEffect(() => {
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    }, [filteredData]);

    const handleSearchClick = () => {
        setDisplayText({
            division: selectedDivision ? selectedDivision.label : '',
            university: selectedUniversity ? selectedUniversity.label : '',
            department: selectedDepartment ? selectedDepartment.label : ''
        });

        const requestData = [
            selectedDivision ? selectedDivision.value : null,
            selectedUniversity ? selectedUniversity.value : null,
            selectedDepartment ? selectedDepartment.value : null,
            null
        ];

        fetch('YOUR_SERVER_URL/api/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ selectedData: requestData })
        })
            .then(response => response.json())
            .then(data => {

                // 서버 요청 대신 임시 데이터 사용
                const mockData = [
                    {
                        school: "가야대학교",
                        major: "국제학과",
                        admissionProbability: "73",
                        fields: "사회계열"
                    },
                    {
                        school: "가야대학교",
                        major: "전기공학과",
                        admissionProbability: "55",
                        fields: "공학계열"
                    },
                    {
                        school: "가야대학교",
                        major: "컴퓨터공학과",
                        admissionProbability: "42",
                        fields: "공학계열"
                    },
                    {
                        school: "가야대학교",
                        major: "윤리교육학과",
                        admissionProbability: "16",
                        fields: "교육계열"
                    },
                    {
                        school: "가야대학교",
                        major: "화학과",
                        admissionProbability: "93",
                        fields: "자연계열"
                    },
                    {
                        school: "가야대학교",
                        major: "음악학과",
                        admissionProbability: "71",
                        fields: "예체능계열"
                    },
                    {
                        school: "가야대학교",
                        major: "국어국문학과",
                        admissionProbability: "45",
                        fields: "인문계열"
                    },
                    {
                        school: "가야대학교",
                        major: "재활치료학과",
                        admissionProbability: "11",
                        fields: "의약계열"
                    }
                ];

                console.log('Server Response:', data);
                console.log(mockData);

                // 서버 응답에서 fields 제거하고 필요한 정보만 사용
                const formattedData = mockData.map(item => ({
                    school: item.school,
                    major: item.major,
                    admissionProbability: item.admissionProbability,
                    category: getCategory(item.admissionProbability)
                }));

                setData(formattedData);
                setFilteredData([]); // 검색 후 초기화
                setTotalPages(Math.ceil(formattedData.length / itemsPerPage));
                setCurrentPage(1);

                // 로딩 상태 설정
                setLoading(true);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        console.log(requestData);
    };

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

    // 모달 닫기 함수
    function closeModal() {
        // 모달 및 로딩 상태를 닫거나 초기화
        setLoading(false);
    }

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

                {/* 버튼 4개가 들어있는 컨테이너 *//*}
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

{/* 이전 버튼과 다음 버튼 사이에 페이지 수 표시 *//*}
<div className="pagination">
    <button className="previousButton" onClick={handlePreviousButtonClick} disabled={currentPage === 1}>
        &lt;
    </button>
    {renderPageNumbers()}
    <button className="nextButton" onClick={handleNextButtonClick} disabled={currentPage === totalPages}>
        &gt;
    </button>
</div>

{/* 모달 표시 *//*}
{loading && (
    <div className="FullAnalModal">
        <div className="FullAnalModalContent">
            <Modal closeModal={closeModal} />
        </div>
    </div>
)}
</div>
);
}

export default FullAnal/*;*/