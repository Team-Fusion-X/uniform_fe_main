import React, { useState, useEffect, useRef } from 'react';
import { Map, MarkerClusterer, MapMarker, ZoomControl, CustomOverlayMap } from "react-kakao-maps-sdk";
import data from './uni_map_data.json';
import { CgClose } from "react-icons/cg";
import { FaMapMarkerAlt } from "react-icons/fa";

const Overlay = () => {
    const [clusterLevel, setClusterLevel] = useState(10); // 클러스터 확대 레벨
    const [positions, setPositions] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null); // 클릭된 마커 정보
    const mapRef = useRef(null); // 지도 인스턴스 참조

    useEffect(() => {
        // 위도, 경도만 추출하여 positions에 설정
        const positionsArray = data.map(item => ({
            lat: item.lat,
            lng: item.lng
        }));
        setPositions(positionsArray);
    }, []);

    return (
        <>
            <Map // 지도를 표시할 Container
                ref={mapRef} // 지도 인스턴스 참조 설정
                center={{ lat: 33.450701, lng: 126.570667 }}
                style={{
                    // 지도의 크기
                    width: "100%",
                    height: "450px",
                }}
                level={14} // 지도의 확대 레벨
                onZoomChanged={() => {
                    // 클러스터 확대 레벨 초기화
                    setClusterLevel(10);
                    // 선택된 마커 초기화
                    setSelectedMarker(null);
                }}
            >
                <MarkerClusterer
                    averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
                    minLevel={10} // 클러스터 할 최소 지도 레벨
                >
                    {positions.map((pos, index) => (
                        <MapMarker
                            key={index}
                            position={{
                                lat: pos.lat,
                                lng: pos.lng,
                            }}
                            onClick={() => setSelectedMarker({ latlng: pos })} // 마커 클릭 이벤트 처리
                        />
                    ))}
                </MarkerClusterer>
                {selectedMarker && ( // 선택된 마커가 있을 때만 이벤트 마커 표시
                    <EventMarkerContainer
                        position={selectedMarker.latlng}
                        university={data.find(item => item.lat === selectedMarker.latlng.lat && item.lng === selectedMarker.latlng.lng).university}
                        location={data.find(item => item.lat === selectedMarker.latlng.lat && item.lng === selectedMarker.latlng.lng).location}
                    />
                )}
                <ZoomControl position="RIGHT_BOTTOM" />
            </Map>
        </>
    );
};



const EventMarkerContainer = ({ position, university, location }) => {
    const [isOpen, setIsOpen] = useState(false);
    // 인라인 스타일 정의
    const styles = {
        overlay: {
            border: '1px solid #ddd',
            overflow: 'hidden',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            minWidth: '380px', // 최소 너비 설정
            minHeight: '200px', // 최소 높이 설정
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
            width: '18px', // 닫기 버튼의 너비
            height: '18px', // 닫기 버튼의 높이
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
        },
        desc: {
            overflow: 'hidden',
        },
        ellipsis: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'clip',
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
                            <div style={styles.img}>
                                <img
                                    src="//t1.daumcdn.net/thumb/C84x76/?fname=http://t1.daumcdn.net/cfile/2170353A51B82DE005"
                                />
                            </div>
                        </div>
                        <div style={styles.desc}>
                            <div style={styles.ellipsis}>
                                {location}
                            </div>
                            <div style={styles.link}>
                                <a
                                    href="https://www.kakaocorp.com/main"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    홈페이지
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </MapMarker >
    )
}

export default Overlay;
