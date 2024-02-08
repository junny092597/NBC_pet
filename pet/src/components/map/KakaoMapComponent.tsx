import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { initMap, searchPlaces } from './MapUtil';
import CategoryButton from './CategoryButton';

const ButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &.show {
    opacity: 1;
  }
`;

const FloatingButton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: #F6F7C4;
  color: black;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #45a049;
  }
`;

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
`;

const InstructionText = styled.div`
  position: absolute;
  top: 60px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 20;
`;

const KakaoMapComponent: React.FC = () => {
    const [map, setMap] = useState<kakao.maps.Map | null>(null);
    const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
    const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
    const [showCategories, setShowCategories] = useState(false);
    const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    const loadedMap = initMap('map', latitude, longitude, 4);
                    if (loadedMap) {
                        setMap(loadedMap);
                        setCenter({ lat: latitude, lng: longitude });
                        kakao.maps.event.addListener(loadedMap, 'center_changed', () => {
                            const currentCenter = loadedMap.getCenter();
                            setCenter({ lat: currentCenter.getLat(), lng: currentCenter.getLng() });
                        });
                    }
                    setLocationPermission(true);
                },
                error => {
                    console.error("현재 위치를 가져오는데 실패했습니다", error);
                    setLocationPermission(false);
                }
            );
        } else {
            console.error("Kakao API 데이터 로딩 실패");
            setLocationPermission(false);
        }
    }, []);

    useEffect(() => {
        if (locationPermission === false) {
            alert("지도를 사용하려면 상단에서 위치 정보 제공에 동의 후 새로고침을 해주세요.");
        }
    }, [locationPermission]);

    useEffect(() => {
        markers.forEach(marker => marker.setMap(map));

        return () => markers.forEach(marker => marker.setMap(null));
    }, [markers, map]);

    const handleCategorySearch = (category: string) => {
        if (map && center) {
            searchPlaces(map, category, center).then(newMarkers => {
                setMarkers(newMarkers);
            }).catch(error => console.error(error));
        }
    };

    const handleFloatingButtonClick = () => {
        setShowCategories(!showCategories);
    };

    return (
        <MapContainer>
            <div id="map" style={{ width: '100%', height: '100%' }}></div>
            <InstructionText>
                '카테고리'를 클릭해 장소를 확인하세요!
            </InstructionText>
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 10 }}>
                <FloatingButton onClick={handleFloatingButtonClick}>
                    카테고리
                </FloatingButton>
            </div>
            <ButtonContainer className={showCategories ? 'show' : ''}>
                <CategoryButton onClick={() => handleCategorySearch('반려동물 병원')} label="반려동물 병원" highlightColor="#F4BA3E" />
                <CategoryButton onClick={() => handleCategorySearch('반려동물 샵')} label="반려동물 샵" highlightColor="#D247E6" />
                <CategoryButton onClick={() => handleCategorySearch('산책로')} label="산책로" highlightColor="#AD7969" />
            </ButtonContainer>
        </MapContainer>
    );
};

export default KakaoMapComponent;
