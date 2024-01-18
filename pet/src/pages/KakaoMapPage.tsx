import React from 'react';
import KakaoMapComponent from '../components/map/KakaoMapComponent'; // KakaoMapComponent를 임포트합니다.

const KakaoMapPage: React.FC = () => {
  return (
    <div>
      <h1>지도 페이지</h1>
      <KakaoMapComponent /> {/* KakaoMapComponent를 렌더링합니다. */}
    </div>
  );
};

export default KakaoMapPage;
