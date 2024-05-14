import React, { useState, useEffect, useRef } from 'react';
import { Map, MarkerClusterer, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { CgClose } from "react-icons/cg";
import axios from 'axios';
// image and data
import red_marker from './image/red.png';
import blue_marker from './image/blue.png';
import green_marker from './image/green.png';
import yellow_marker from './image/yellow.png';
import data from './json/test_user_data.json';
//pages
import SearchBar from './SearchBar';
import MajorSelection from './MajorSelect';

const UMap = () => {
    const [clusterLevel, setClusterLevel] = useState(10);
    const [positions, setPositions] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const mapRef = useRef(null);
    const maxLevel = 13;

    // Search Bar 관련 설정
    const handleSearch = (searchTerm) => {
        if (!mapRef.current) return; // 지도 인스턴스가 없다면 함수 종료
        const ps = new window.kakao.maps.services.Places(); // 장소 검색 객체

        ps.keywordSearch(searchTerm, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const bounds = new window.kakao.maps.LatLngBounds();
                data.forEach((place) => {
                    bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
                });
                mapRef.current.setBounds(bounds); // 검색된 장소를 포함하는 지도 범위로 이동
            } else {
                console.error("검색 결과가 없습니다.");
            }
        });
    };

    // MajorSelect 관련 설정
    const [selectedMajors, setSelectedMajors] = useState([]);
    const [schools, setSchools] = useState(data);
    const handleSelectionComplete = async (major) => {
        // majors 상태 업데이트
        setSelectedMajors(major);
        console.log('Selected majors:', major);

        // 전공이 있을 경우만 실행
        if (major.length > 0) {
            try {
                const response = await axios.post('http://localhost:5000/api/acceptance_rate', {
                    field: null,
                    school: null,
                    major: null,
                    keyword: major
                });

                const acceptanceRate = response.data.acceptance_rate;
                const updatedSchools = schools.map(school => {
                    if (school.university === response.data.school) {
                        return { ...school, pass: acceptanceRate };
                    }
                    return school;
                });
                setSchools(updatedSchools);
                console.log('학교:', response.data.school);
                console.log('계열:', response.data.field);
                console.log('학과:', response.data.major);
                console.log('합격률:', acceptanceRate);
            } catch (error) {
                console.error('합격률 조회 실패:', error.message);
            }
        }
    };

    // 합격률에 따라 마커 이미지를 결정하는 함수
    const getMarkerImage = (passValue) => {
        if (passValue < 20) return red_marker;
        if (passValue >= 20 && passValue < 50) return yellow_marker;
        if (passValue >= 50 && passValue < 80) return green_marker;
        if (passValue >= 80) return blue_marker;
    };

    useEffect(() => {
        const positionsArray = data.map(item => ({
            lat: item.lat, // 위도
            lng: item.lng, // 경도
            pass: item.pass, // 합격률
            image: getMarkerImage(item.pass), // pass 값에 따라 이미지를 결정
        }));
        setPositions(positionsArray);
    }, []);

    const clusterStyles = [
        {
            width: '50px',
            height: '50px',
            background: '#C8C8FF', // 클러스터 색상
            borderRadius: '25px', // 원형으로 표시
            color: '#000', // 글씨 색상은 흰색
            textAlign: 'center',
            fontWeight: 'bold',
            lineHeight: '50px' // 세로 정렬을 위해 lineHeight를 height와 같게 설정
        }
    ];

    return (
        <>
            <div style={{ display: "flex", height: "550px" }}>
                <div style={{ width: "30%", background: "#f9f9f9", padding: "20px" }}>
                    {/* 왼쪽 패널 */}
                    <SearchBar onSearch={handleSearch} />
                    <MajorSelection onSelectionComplete={handleSelectionComplete} />
                </div>
                <div style={{ width: "70%" }}>
                    <Map
                        ref={mapRef}
                        center={{ lat: 35.688291717895794, lng: 127.96375234744477 }}
                        style={{ width: "100%", height: "550px" }}
                        level={13}
                        onZoomChanged={() => {
                            if (mapRef.current) {
                                const currentLevel = mapRef.current.getLevel();
                                if (currentLevel > maxLevel) {
                                    mapRef.current.setLevel(maxLevel);
                                }
                            }
                            setClusterLevel(10);
                            setSelectedMarker(null);
                        }}
                    >
                        <MarkerClusterer
                            averageCenter={true}
                            minLevel={10}
                            styles={clusterStyles}
                        >
                            {positions.map((pos, index) => (
                                <MapMarker
                                    key={index}
                                    position={pos}
                                    image={{
                                        src: pos.image, // 사용자 정의 마커 이미지
                                        size: {
                                            width: 35,
                                            height: 35
                                        }
                                    }}
                                    onClick={() => setSelectedMarker({ latlng: pos })}
                                />
                            ))}
                        </MarkerClusterer>
                        {selectedMarker && (
                            <EventMarkerContainer
                                position={selectedMarker.latlng}
                                university={data.find(item => item.lat === selectedMarker.latlng.lat && item.lng === selectedMarker.latlng.lng).university}
                                location={data.find(item => item.lat === selectedMarker.latlng.lat && item.lng === selectedMarker.latlng.lng).location}
                                url={data.find(item => item.lat === selectedMarker.latlng.lat && item.lng === selectedMarker.latlng.lng).home_url}
                                logo={data.find(item => item.lat === selectedMarker.latlng.lat && item.lng === selectedMarker.latlng.lng).logo}
                            />
                        )}
                        <ZoomControl position="RIGHT_BOTTOM" />
                    </Map>
                </div>
            </div>
        </>
    );
};

const EventMarkerContainer = ({ position, university, location, url, logo }) => {
    const [isOpen, setIsOpen] = useState(false);

    const styles = {
        overlay: {
            border: '1px solid #ddd',
            overflow: 'hidden',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            minWidth: '380px',
            minHeight: '200px',
        },
        title: {
            backgroundColor: '#f9f9f9',
            color: '#333',
            padding: '10px 15px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderBottom: '1px solid #ddd',
            borderRight: '1px solid #999',
        },
        closeButton: {
            width: '18px',
            height: '18px',
            cursor: 'pointer',
            position: 'absolute',
            right: '8px',
            top: '8%',
        },
        body: {
            padding: '15px',
            fontSize: '14px',

            color: '#666',
        },
        img: {
            float: 'left',
            marginRight: '15px',
            width: '130px',
            height: '130px'
        },
        desc: {
            overflow: 'hidden',
        },
        ellipsis: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal', // 텍스트가 다음 줄로 넘어갈 수 있도록 설정
            fontSize: '15px',
        },
        link: {
            color: '#1a0dab',
            textDecoration: 'none',
            fontSize: '12px',
        },
    };

    return (
        <MapMarker
            position={position}
            onClick={() => setIsOpen(!isOpen)}
            clickable={true}
            image={{
                src: position.image, // 사용자 정의 마커 이미지
                size: {
                    width: 35,
                    height: 35
                }
            }}
        >
            {isOpen && (
                <div style={{ minWidth: "150px" }}>
                    <CgClose
                        style={styles.closeButton}
                        onClick={(e) => {
                            e.stopPropagation(); // 이벤트 버블링 방지
                            setIsOpen(false);
                        }}
                    />

                    <div style={styles.overlay}>
                        <div style={styles.title}>
                            {university}
                        </div>
                        <div style={styles.body}>
                            <div>
                                <img
                                    src={logo}
                                    style={styles.img}
                                />
                            </div>
                            <div style={styles.desc}>
                                <div style={styles.ellipsis}>
                                    {location}
                                </div>
                                <div style={styles.link}>
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {url}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </MapMarker >
    )
}

export default UMap;
