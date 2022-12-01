const { naver } = window;

export const createMarker = (mapRef, position, title, icon) => {
  return new naver.maps.Marker({
    mapRef,
    position,
    title,
    icon,
  });
};

export const createImageIcon = (imageUrl, scaledSize) => {
  scaledSize = scaledSize || new naver.maps.Size(30, 30);

  return new naver.maps.ImageIcon({
    url: imageUrl,
    scaledSize: scaledSize,
  });
};

export const clearMarkers = (infos, markers) => {
  for (let index = 0; index < markers.length; index++) {
    infos[index].close();
    markers[index].setMap(null);
  }
};

export const createInfoWindow = (content) => {
  return new naver.maps.InfoWindow({
    content: content,
  });
};
