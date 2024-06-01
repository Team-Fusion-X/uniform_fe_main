import React, { useState, useEffect } from "react";
import universityData from "../UniversityData.json";
import MapData from '../Map/json/map_data.json';
import SearchComponent from "./SearchComponent";
import axios from 'axios';
import "./FullAnal.css";
import Modal from './FullAnalModal.js';

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

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    const [filteredData, setFilteredData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태
    const [isLoading, setIsLoading] = useState(false); // 로딩 중 상태

    useEffect(() => {
        setTotalPages(Math.ceil(data.length / itemsPerPage));
    }, [data]);

    useEffect(() => {
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    }, [filteredData]);

    const handleSearchClick = () => {
        setIsModalOpen(true); // 모달 열기
        setIsLoading(true); // 로딩 중 상태 설정

        setDisplayText({
            division: selectedDivision ? selectedDivision.label : '',
            university: selectedUniversity ? selectedUniversity.label : '',
            department: selectedDepartment ? selectedDepartment.label : ''
        });

        let jsonData = {
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
                // 데이터가 객체인 경우, 배열로 변환
                let dataArray = response.data.data_list;
                console.log('Data array:', dataArray);

                // 배열 데이터로 상태 업데이트
                const updatedData = dataArray.map(item => ({
                    ...item,
                    category: getCategory(parseInt(item.possibility)),
                }));

                // 내림차순으로 정렬
                updatedData.sort((a, b) => b.possibility - a.possibility);

                setData(updatedData);
                setFilteredData([]); // 필터링된 데이터 초기화
                setTotalPages(Math.ceil(updatedData.length / itemsPerPage));
                setCurrentPage(1);
                setIsLoading(false);
                setIsModalOpen(false);

                // 자동으로 가장 높은 우선순위의 데이터를 필터링하고 보여주기
                const categories = ["여유", "적절", "도전", "위험"];
                for (let category of categories) {
                    const filteredData = updatedData.filter(item => item.category === category);
                    if (filteredData.length > 0) {
                        setFilteredData(filteredData);
                        break;
                    }
                }
            })
            .catch(error => {
                if (error.response) {
                    console.error('Server responded with:', error.response.status, error.response.statusText, 'Message:', error.response.data);
                } else {
                    console.error('분석 중 오류가 발생했습니다.', error.message);
                }
            });
    };

    const handleButtonClick = (category) => {
        const filtered = data.filter(item => item.category === category);
        filtered.sort((a, b) => b.possibility - a.possibility);

        if (filtered.length === 0) {
            alert(`${category} 카테고리에 해당하는 결과가 없습니다.`);
        } else {
            setFilteredData(filtered);
            setCurrentPage(1);
            console.log('Filtered data:', filtered);
        }
    };

    const getCategory = (possibility) => {
        if (possibility >= 75) return "여유";
        if (possibility >= 50) return "적절";
        if (possibility >= 21) return "도전";
        return "위험";
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
                startPage = currentPage - 4;
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

    const closeModal = () => {
        setIsModalOpen(false);
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
                                <img src={logoMap[item.university]} alt={`${item.university} logo`} style={{ width: "65px", height: "55px", verticalAlign: "middle" }} />
                            </div>
                            <div className={`box2 ${getColorClass(item.category)}`}>
                                {item.university}
                            </div>
                            <div className={`box3 ${getColorClass(item.category)}`}>{item.major}</div>
                            <div className="progressBarContainer">
                                <div className={`progressBar ${getColorClass(item.category)}`} style={{ width: `${item.possibility}%` }}>
                                    <span className="progressText">{item.possibility}%</span>
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
            {/* 모달 표시 */}
            {isModalOpen && (
                <div className="FullAnalModal">
                    <div className="FullAnalModalContent">
                        <Modal closeModal={closeModal} isLoading={isLoading} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default FullAnal;