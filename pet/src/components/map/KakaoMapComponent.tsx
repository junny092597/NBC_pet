import React, { useEffect, useState } from 'react';
import { initMap, searchPlaces, createMarkers, getCurrentLocation } from './MapUtil';
import CategoryButton from './CategoryButton'; 

const KakaoMapComponent: React.FC = () => {
  const [map, setMap] = useState<kakao.maps.Map>();

  useEffect(() => {
    getCurrentLocation(position => {
      const { latitude, longitude } = position.coords;
      const Map = initMap('map', latitude, longitude, 3);
      setMap(map);
    }, error => {
      console.error("Error getting current location:", error);
    });
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
