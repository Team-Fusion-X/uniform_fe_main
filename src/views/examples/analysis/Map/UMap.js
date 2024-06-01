import React, { useState, useEffect, useRef } from 'react';
import { Map, MarkerClusterer, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { CgClose } from "react-icons/cg";
import axios from 'axios';
import { Spinner } from 'reactstrap';
import glay_marker from './image/glay.png';
import red_marker from './image/red.png';
import blue_marker from './image/blue.png';
import green_marker from './image/green.png';
import yellow_marker from './image/yellow.png';
import data from './json/map_data.json';
import MapInfo from './MapInfo';
import SearchBar from './SearchBar';
import MajorSelection from './MajorSelect';

const UMap = () => {
    const [clusterLevel, setClusterLevel] = useState(10);
    const [positions, setPositions] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedMajors, setSelectedMajors] = useState([]); // 여기로 상태 선언을 이동
    const [isLoading, setIsLoading] = useState(false);
    const mapRef = useRef(null);
    const maxLevel = 13;


    const handleSearch = (searchTerm) => {
        if (!mapRef.current) return;
        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(searchTerm, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const bounds = new window.kakao.maps.LatLngBounds();
                data.forEach((place) => {
                    bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
                });
                mapRef.current.setBounds(bounds);
            } else {
                console.error("검색 결과가 없습니다.");
            }
        });
    };

    const getMarkerImage = (passValue) => {
        if (passValue < 20) return red_marker;
        if (passValue >= 20 && passValue < 50) return yellow_marker;
        if (passValue >= 50 && passValue < 80) return green_marker;
        if (passValue >= 80) return blue_marker;
    };

    const groupByUniversity = (data) => {
        const results = {};
        data.forEach(item => {
            const key = item.university;
            if (!results[key]) {
                results[key] = {
                    ...item,
                    count: 0,
                    total: 0,
                };
            }
            results[key].total += parseInt(item.possibility, 10);
            results[key].count += 1;
        });

        return Object.values(results).map(item => ({
            ...item,
            possibility: Math.round(item.total / item.count),
        }));
    };

    const handleSelectionComplete = async (field, keyword) => {
        setSelectedMajors(field); // 상태 업데이트 함수 사용
        setIsLoading(true);  // 로딩 시작
        console.log('Selected field:', field);
        console.log('Selected keyword:', keyword);

        // keyword가 '기타'일 경우 null로 설정
        const effectiveKeyword = keyword === '기타' ? null : keyword;

        if (field.length > 0) {
            const inputData = {
                field: field,
                major: null,
                university: null,
                keyword: effectiveKeyword
            };
            try {
                const response = await axios.post('/api/8482/analysis', inputData, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                const passRateData = response.data.data_list;
                const groupedData = groupByUniversity(passRateData);
                console.log('Grouped Data:', groupedData);

                const updatedPositions = groupedData.map(dataItem => {
                    const match = data.find(jsonItem => jsonItem.university === dataItem.university);
                    if (match) {
                        return {
                            lat: match.lat,
                            lng: match.lng,
                            university: dataItem.university,
                            pass: dataItem.possibility,
                            image: getMarkerImage(dataItem.possibility),
                            location: match.location,
                            url: match.home_url
                        };
                    }
                    return null;
                }).filter(item => item !== null);

                setPositions(updatedPositions);
            } catch (error) {
                console.error('분석 중 오류가 발생했습니다.', error.response?.data || error.message);
            } finally {
                setIsLoading(false);  // 로딩 종료
            }
        } else {
            setIsLoading(false);  // 필드가 비어있는 경우 바로 로딩 종료
        }
    };

    useEffect(() => {
        const positionsArray = data.map(item => ({
            lat: item.lat,
            lng: item.lng,
            image: glay_marker,
        }));
        setPositions(positionsArray);
    }, []);
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setLevel(30);
        }
    }, [positions]);

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
            {/* 로딩창 */}
            {isLoading && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '200px',
                    height: '100px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                    <Spinner color="primary">Loading...</Spinner>
                    <div>분석 중..</div>
                </div>
            )}
            <div style={{ display: "flex", height: "550px" }}>
                <div style={{ width: "30%", background: "#f9f9f9", padding: "20px" }}>
                    {/* 왼쪽 패널 */}
                    <MapInfo />
                    <MajorSelection onSelectionComplete={handleSelectionComplete} />
                    <SearchBar onSearch={handleSearch} />
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
                            key={JSON.stringify(positions)}
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
