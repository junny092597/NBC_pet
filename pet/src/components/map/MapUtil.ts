import { SetStateAction } from "react";

const markerImagePaths: { [key: string]: string } = {
  '반려동물 병원': process.env.PUBLIC_URL + 'HospitalCat.png',
  '반려동물 샵': process.env.PUBLIC_URL + 'ShopCat.png',
  '산책로': process.env.PUBLIC_URL + 'ParkCat.png',
};

const categoryKeywords: { [category: string]: string[] } = {
  '반려동물 병원': ['동물 병원',],
  '반려동물 샵': ['애견 용품', ],
  '산책로': ['공원', ],
};

let ps: kakao.maps.services.Places | null = null;

export const initMap = (mapContainerId: string, lat: number, lng: number, level: number): kakao.maps.Map | undefined => {
  const container = document.getElementById(mapContainerId);
  if (!container) {
    console.error(`Map container with id '${mapContainerId}' not found.`);
    return;
  }

  const options = {
    center: new kakao.maps.LatLng(lat, lng),
    level: level,
  };
  const map = new kakao.maps.Map(container, options);
  ps = new kakao.maps.services.Places();
  return map;
};

export const searchPlaces = (map: kakao.maps.Map | undefined, category: string, center: { lat: number; lng: number }): Promise<kakao.maps.Marker[]> => {
  if (!map || !ps) return Promise.reject(new Error("Map or Places service is not initialized"));

  return new Promise((resolve, reject) => {
    const keywords = categoryKeywords[category];
    const searchPromises = keywords.map(keyword =>
      new Promise<kakao.maps.Marker[]>((resolve, reject) => {
        ps!.keywordSearch(keyword, (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const markers = data.map(place => {
              const markerImage = new kakao.maps.MarkerImage(markerImagePaths[category], new kakao.maps.Size(24, 24));
              const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x)),
                image: markerImage,
              });

              kakao.maps.event.addListener(marker, 'click', () => {
                const infowindow = new kakao.maps.InfoWindow({
                  content: `<div style="padding:5px;">${place.place_name}</div>`,
                });
                infowindow.open(map, marker);
              });

              return marker;
            });
            resolve(markers);
          } else {
            reject(new Error(`Search failed for keyword: ${keyword}`));
          }
        }, {
          location: new kakao.maps.LatLng(center.lat, center.lng),
          radius: 5000,
        });
      })
    );

    Promise.all(searchPromises).then(results => {
      const combinedMarkers = results.flat();
      resolve(combinedMarkers);
    }).catch(reject);
  });
};
