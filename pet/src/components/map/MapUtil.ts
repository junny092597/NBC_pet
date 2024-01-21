import { SetStateAction } from "react";

// 카테고리별 마커 이미지 경로
const markerImagePaths: { [key: string]: string } = {
  '반려동물 병원': 'src/assets/images/HospitalCat.png',
  '반려동물 샵': 'src/assets/images/ShopCat.png',
  '산책로': 'src/assets/images/ParkCat.png'
};

const categoryKeywords: { [category: string]: string[] } = {
  '반려동물 병원': ['동물 병원'],
  '반려동물 샵': ['애견 용품'],
  '산책로': ['공원']
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

      Promise.all(keywords.map(keyword => {
        return new Promise<kakao.maps.Marker[]>((resolve, reject) => {
          ps.keywordSearch(keyword, (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const markers = createMarkers(map, data, category, handleMarkerClick); // 카테고리 인자 추가
              resolve(markers);
            } else {
              reject(new Error(`Search failed for keyword: ${keyword}`));
            }
          }, {
            location: new kakao.maps.LatLng(latitude, longitude),
            radius: 3000
          });
        });
      })).then(results => {
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
  category: string, // 카테고리 인자 추가
  handleMarkerClick: (
    marker: kakao.maps.Marker,
    infowindow: kakao.maps.InfoWindow
  ) => void
): kakao.maps.Marker[] => {
  if (!map) {
    return [];
  }

  const markers: kakao.maps.Marker[] = [];

  const imageSrc = markerImagePaths[category]; // 카테고리에 따른 이미지 경로
  const imageSize = new kakao.maps.Size(24, 35); // 마커 이미지 크기 설정
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 생성

  places.forEach((place) => {
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

// searchOnGoogle 함수
(window as any).searchOnGoogle = (query: string) => {
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  window.open(googleSearchUrl, "_blank");
};

// handleMarkerClick 함수
function handleMarkerClick(marker: kakao.maps.Marker, infowindow: kakao.maps.InfoWindow) {
  // handleMarkerClick 함수 로직 구현
}
