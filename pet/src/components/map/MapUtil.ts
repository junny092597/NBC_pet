// MapUtil.ts
import { SetStateAction } from "react";

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
              const markers = createMarkers(map, data, handleMarkerClick);
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
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x)
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
