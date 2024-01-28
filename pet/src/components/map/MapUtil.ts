import { SetStateAction } from "react";

// 카테고리별 마커 이미지 경로
const markerImagePaths: { [key: string]: string } = {
  '반려동물 병원': process.env.PUBLIC_URL + 'HospitalCat.png',
  '반려동물 샵': process.env.PUBLIC_URL + 'Shopcat.png',
  '산책로': process.env.PUBLIC_URL + 'ParkCat.png'
};

const categoryKeywords: { [category: string]: string[] } = {
  '반려동물 병원': ['동물 병원', '반려 동물 병원','애완동물 병원','수의사'],
  '반려동물 샵': ['애견 용품','반려 동물 샵','애완동물 샵'],
  '산책로': ['공원','산책']
};

let ps: kakao.maps.services.Places;

export const initMap = (mapContainerId: string, lat: number, lng: number, level: number): kakao.maps.Map | null => {
  const container = document.getElementById(mapContainerId);
  if (!container) {
    console.error(`Map container with id '${mapContainerId}' not found.`);
    return null;
  }

  const options = {
    center: new kakao.maps.LatLng(lat, lng),
    level: level
  };
  const map = new kakao.maps.Map(container, options);
  ps = new kakao.maps.services.Places();
  return map;
};

export const getCurrentLocation = (callback: (position: GeolocationPosition) => void, errorCallback: (error: GeolocationPositionError) => void): void => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback, errorCallback);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

export const searchPlaces = (
  map: kakao.maps.Map | null,
  category: string
): Promise<kakao.maps.Marker[]> => {
  return new Promise((resolve, reject) => {
    getCurrentLocation(position => {
      const { latitude, longitude } = position.coords;
      const keywords = categoryKeywords[category];
      if (!Array.isArray(keywords)) {
        console.error(`Invalid category: ${category}`);
        reject(new Error(`Invalid category: ${category}`));
        return;
      }

      const searchPromises = keywords.map(keyword => {
        return new Promise<kakao.maps.Marker[]>((resolve, reject) => {
          ps.keywordSearch(keyword, (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const markers = createMarkers(map, data, category, handleMarkerClick);
              resolve(markers);
            } else {
              console.error(`Search failed for keyword: ${keyword}`);
              resolve([]); // 오류 발생 시 빈 배열 반환
            }
          }, {
            location: new kakao.maps.LatLng(latitude, longitude),
            radius: 3000
          });
        });
      });

      Promise.all(searchPromises).then(results => {
        const combinedMarkers = results.flat();
        resolve(combinedMarkers);
      }).catch(error => {
        console.error(error);
        reject(error);
      });
    }, error => {
      console.error("Error getting current location:", error);
      reject(error);
    });
  });
};

export const createMarkers = (
  map: kakao.maps.Map | null,
  places: any[],
  category: string,
  handleMarkerClick: (
    marker: kakao.maps.Marker,
    infowindow: kakao.maps.InfoWindow
  ) => void
): kakao.maps.Marker[] => {
  if (!map) {
    return [];
  }

  const markers: kakao.maps.Marker[] = [];

  places.forEach((place) => {
    const imageSrc = markerImagePaths[category]; // 카테고리에 맞는 이미지 경로
    const imageSize = new kakao.maps.Size(35, 35); // 마커 이미지 크기 설정
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 생성

    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
      image: markerImage // 마커에 이미지 설정
    });

    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    kakao.maps.event.addListener(marker, 'click', () => {
      if (map) {
        infowindow.setContent(`
          <div style="padding:5px;font-size:12px;">
            ${place.place_name}<br>
            <a href="#" onclick="searchOnGoogle('${place.place_name}')">검색하기</a>
          </div>
        `);
        infowindow.open(map, marker);
      }
    });

    markers.push(marker);
  });

  return markers;
};

// searchOnGoogle 함수 전역 스코프로 내보내기
(window as any).searchOnGoogle = (query: string) => {
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  window.open(googleSearchUrl, "_blank");
};

// handleMarkerClick 함수 구현
function handleMarkerClick(marker: kakao.maps.Marker, infowindow: kakao.maps.InfoWindow) {
  // handleMarkerClick 함수의 로직을 여기에 구현합니다.
}
