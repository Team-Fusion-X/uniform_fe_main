import React, { useState } from "react";
import red_marker from './image/red.png';
import blue_marker from './image/blue.png';
import green_marker from './image/green.png';
import yellow_marker from './image/yellow.png';

// 각 마커 색에 따른 합격률 안내 표시
const MarkerInfo = () => (
    <div style={{ marginBottom: "40px" }}> {/* 외부 컨테이너의 margin-bottom을 조절하여 내부 요소들 간의 간격을 설정 */}
        <div style={{ marginBottom: "20px", fontSize: "20px", textAlign: "center", marginTop: "15px" }}>
            "마커를 클릭해 학교 정보를 확인하세요!"
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: "20px", justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={red_marker} alt="Red Marker" style={{ width: "30px", height: "30px" }} />
                <span>20% 미만</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={yellow_marker} alt="Yellow Marker" style={{ width: "30px", height: "30px" }} />
                <span>20~50%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={green_marker} alt="Green Marker" style={{ width: "30px", height: "30px", }} />
                <span>50~80%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={blue_marker} alt="Blue Marker" style={{ width: "30px", height: "30px", }} />
                <span>80% 이상</span>
            </div>
        </div>
    </div>

);

// 학교 이름 검색창 
const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };
    return (
        <>
            <MarkerInfo />
            <form onSubmit={handleSubmit} style={{ display: "flex", marginTop: "15px", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="지역이나 대학명을 입력해 주세요!"
                    value={searchTerm}
                    onChange={handleChange}
                    style={{
                        flex: 1,
                        padding: "15px",
                        border: "none",
                        borderRadius: "5px 0 0 5px",
                        fontSize: "16px",
                        height: "50px"
                    }}
                />
                <button type="submit" style={{
                    backgroundColor: "#646EFF",
                    color: "white",
                    border: "none",
                    padding: "15px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    borderRadius: "0 5px 5px 0",
                    height: "50px"
                }}>
                    검색
                </button>
            </form>
        </>
    );
};

export default SearchBar;