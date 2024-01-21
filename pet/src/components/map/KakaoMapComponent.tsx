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
`;

const StyledCategoryButton = styled(CategoryButton)`
  margin-bottom: 10px; 
  &:last-child {
    margin-bottom: 0; /
  }
`;

const KakaoMapComponent: React.FC = () => {
    const [map, setMap] = useState<kakao.maps.Map | null>(null);
    const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
    const [locationPermission, setLocationPermission] = useState<boolean | null>(null);

    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        const loadedMap = initMap('map', latitude, longitude, 3);
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
            alert("지도를 사용하려면 위치 정보 제공에 동의해야 합니다.");
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


    return (
      <div style={{ position: 'relative', width: '100%', height: '700px' }}>
          <div id="map" style={{ width: '100%', height: '100%' }}></div>
          <ButtonContainer>
          <CategoryButton onClick={() => handleCategorySearch('반려동물 병원')} label="반려동물 병원" highlightColor="#F4BA3E" />
  <CategoryButton onClick={() => handleCategorySearch('반려동물 샵')} label="반려동물 샵" highlightColor="#D247E6" />
  <CategoryButton onClick={() => handleCategorySearch('산책로')} label="산책로" highlightColor="#AD7969" />
          </ButtonContainer>
      </div>
  );
};

export default KakaoMapComponent;