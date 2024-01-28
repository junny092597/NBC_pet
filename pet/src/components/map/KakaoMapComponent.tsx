// KakaoMapComponent.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { initMap, searchPlaces, createMarkers } from './MapUtil';
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
  width: 80px;       // 버튼의 너비
  height: 80px;      // 버튼의 높이
  border-radius: 100%; // 원형 버튼
  background-color: #F6F7C4; // 버튼의 배경색
  color: black;      // 버튼의 글자색
  border: none;      // 테두리 제거
  cursor: pointer;   // 커서 모양 변경
  box-shadow: 0 2px 5px rgba(0,0,0,0.3); // 그림자 효과
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #45a049; // 호버 시 색상 변경
  }
`;

const KakaoMapComponent: React.FC = () => {
    const [map, setMap] = useState<kakao.maps.Map | null>(null);
    const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
    const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
    const [showCategories, setShowCategories] = useState(false);

    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        const loadedMap = initMap('map', latitude, longitude, 4);
                        if (loadedMap) {
                            setMap(loadedMap);
                        }
                        setLocationPermission(true);
                    },
                    error => {
                        console.error("현재 위치를 가져오는데 실패했습니다", error);
                        setLocationPermission(false);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
                setLocationPermission(false);
            }
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

 

    const handleMarkerClick = (marker: kakao.maps.Marker, infowindow: kakao.maps.InfoWindow) => {
        if (map) {
            if (infowindow.getMap()) {
                infowindow.close();
            } else {
                infowindow.open(map, marker);
            }
        }
    };

    const handleCategorySearch = (category: string) => {
        if (map && locationPermission === true) {
            markers.forEach(marker => marker.setMap(null)); // 기존 마커 제거
            searchPlaces(map, category).then(newMarkers => {
                setMarkers(newMarkers);
            }).catch(error => console.error(error));
        }
    };

    const handleFloatingButtonClick = () => {
        setShowCategories(!showCategories);
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '700px' }}>
            <div id="map" style={{ width: '100%', height: '100%' }}></div>

            {/* 플로팅 버튼 */}
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 10 }}>
          
            <FloatingButton onClick={handleFloatingButtonClick}>
           
                카테고리 {/* 텍스트를 사용하는 경우 */}
            </FloatingButton>
            </div>

            {/* 카테고리 버튼 컨테이너 */}
            <ButtonContainer className={showCategories ? 'show' : ''}>
                <CategoryButton onClick={() => handleCategorySearch('반려동물 병원')} label="반려동물 병원" highlightColor="#F4BA3E" />
                <CategoryButton onClick={() => handleCategorySearch('반려동물 샵')} label="반려동물 샵" highlightColor="#D247E6" />
                <CategoryButton onClick={() => handleCategorySearch('산책로')} label="산책로" highlightColor="#AD7969" />
            </ButtonContainer>
        </div>
    );
};

export default KakaoMapComponent;