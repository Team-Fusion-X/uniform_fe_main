import React, { useState, useEffect, useRef } from 'react';
import { Map, MarkerClusterer, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import data from './uni_map_data.json';

const UMap = () => {
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
                        content={data.find(item => item.lat === selectedMarker.latlng.lat && item.lng === selectedMarker.latlng.lng).university}
                    />
                )}
                <ZoomControl position="RIGHT_BOTTOM" />
            </Map>
        </>
    );
};

const EventMarkerContainer = ({ position, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <MapMarker
            position={position}
            onClick={() => setIsOpen(!isOpen)}
            clickable={true}
        >
            {isOpen && (
                <div style={{ minWidth: "150px" }}>
                    <img
                        alt="close"
                        width="14"
                        height="13"
                        src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                        style={{
                            position: "absolute",
                            right: "5px",
                            top: "5px",
                            cursor: "pointer",
                        }}
                        onClick={(e) => {
                            e.stopPropagation(); // 이벤트 버블링 방지
                            setIsOpen(false);
                        }}
                    />
                    <div style={{ padding: "5px", color: "#000" }}>{content}</div>
                </div>
            )}
        </MapMarker>
    )
}

export default UMap;
