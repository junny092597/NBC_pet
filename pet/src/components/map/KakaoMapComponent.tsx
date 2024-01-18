import React, { useEffect, useState } from 'react';
import { initMap, searchPlaces, createMarkers, getCurrentLocation } from './MapUtil';
import CategoryButton from './CategoryButton'; 

const KakaoMapComponent: React.FC = () => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  useEffect(() => {
    // 카카오 맵 API 로드 상태 확인
    if (window.kakao && window.kakao.maps) {
      // 카카오 맵 API가 로드되었을 때 실행할 로직
      getCurrentLocation(position => {
        const { latitude, longitude } = position.coords;
        const loadedMap = initMap('map', latitude, longitude, 3);
        setMap(loadedMap);
      }, error => {
        console.error("현재 위치를 가져오는데 실패했습니다", error);
      });
    } else {
      console.error("api 데이터 로딩 실패");
    }
  }, []);

  const handleCategorySearch = (category: string) => {
    if (map) {
      searchPlaces(map, category, (markers) => {
        createMarkers(map, markers);
      });
    }
  };

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <div>
        <CategoryButton onClick={() => handleCategorySearch('반려동물 병원')} label="반려동물 병원" />
        <CategoryButton onClick={() => handleCategorySearch('반려동물 샵')} label="반려동물 샵" />
        <CategoryButton onClick={() => handleCategorySearch('산책로')} label="산책로" />
      </div>
    </div>
  );
};

export default KakaoMapComponent;
