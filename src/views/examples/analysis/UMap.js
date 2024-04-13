import React, { useState, useEffect, useRef } from 'react';
import { Map, MarkerClusterer, MapMarker, ZoomControl, CustomOverlayMap } from "react-kakao-maps-sdk";
import { CgClose } from "react-icons/cg";
import red_marker from './image/red.png';
import blue_marker from './image/blue.png';
import green_marker from './image/green.png';
import yellow_marker from './image/yellow.png';
import data from './test_user_data.json';

const UMap = () => {
    const [clusterLevel, setClusterLevel] = useState(10);
    const [positions, setPositions] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const mapRef = useRef(null);
    const maxLevel = 13;

    // 마커 이미지를 결정하는 함수
    const getMarkerImage = (passValue) => {
        if (passValue <= 25) return red_marker;
        if (passValue <= 45) return yellow_marker;
        if (passValue <= 65) return green_marker;
        return blue_marker;
    };

    useEffect(() => {
        const positionsArray = data.map(item => ({
            lat: item.lat,
            lng: item.lng,
            image: getMarkerImage(item.pass), // pass 값에 따라 이미지를 결정
        }));
        setPositions(positionsArray);
    }, []);

    return (
        <>
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
        </>
    );
};

const EventMarkerContainer = ({ position, university, location, url, logo }) => {
    const [isOpen, setIsOpen] = useState(false);

    // 마커 이미지를 결정하는 함수
    const getMarkerImage = (passValue) => {
        if (passValue <= 25) return red_marker;
        if (passValue <= 45) return yellow_marker;
        if (passValue <= 65) return green_marker;
        return blue_marker;
    };

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
            whiteSpace: 'nowrap',
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
