// MapUtil.ts

const categoryKeywords: { [category: string]: string[] } = {
    '반려동물 병원': ['동물 병원', '수의사', '반려동물 진료소'],
    '반려동물 샵': ['애견 용품', '반려동물 상점'],
    '산책로': ['공원', '산책길']
  };
  
  let ps: kakao.maps.services.Places;
  
  export const initMap = (mapContainerId: string, lat: number, lng: number, level: number) => {
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
  
  export const getCurrentLocation = (callback: (position: GeolocationPosition) => void, errorCallback: (error: GeolocationPositionError) => void) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(callback, errorCallback);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  
  export const searchPlaces = (map: kakao.maps.Map, category: string, callback: (markers: any[]) => void) => {
    getCurrentLocation(position => {
      const { latitude, longitude } = position.coords;
      const keywords = categoryKeywords[category];
      if (!Array.isArray(keywords)) {
        console.error(`Invalid category: ${category}`);
        return;
      }
  
      Promise.all(keywords.map(keyword => {
        return new Promise((resolve, reject) => {
          ps.keywordSearch(keyword, (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              resolve(data);
            } else {
              reject(new Error(`Search failed for keyword: ${keyword}`));
            }
          }, {
            location: new kakao.maps.LatLng(latitude, longitude),
            radius: 500 // 검색 반경 설정 (예시)
          });
        });
      })).then(results => {
        const combinedResults = results.flat();
        callback(combinedResults);
      }).catch(error => {
        console.error(error);
      });
    }, error => {
      console.error("Error getting current location:", error);
    });
  };
  
  export const createMarkers = (map: kakao.maps.Map, places: any[]) => {
    places.forEach(place => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });
  
      const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      kakao.maps.event.addListener(marker, 'click', () => {
        infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
        infowindow.open(map, marker);
      });
    });
  };
  