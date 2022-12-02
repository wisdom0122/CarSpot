const { naver } = window;

export const createMarker = (map, position, icon) => {
    return new naver.maps.Marker({
        map: map,
        position: position,
        icon: icon,
    });
};

export const createImageIcon = (imageUrl, scaledSize) => {
    scaledSize = scaledSize || new naver.maps.Size(30, 30);

    return new naver.maps.ImageIcon({
        url: imageUrl,
        scaledSize: scaledSize,
    });
};

export const clearMarkers = (infos, markers, listeners) => {
    for (let index = 0; index < markers.length; index++) {
        naver.maps.Event.removeListener(listeners[index]);
        infos[index].close();
        markers[index].setMap(null);
    }
    return [[], [], []];
};

export const createInfoWindow = (content) => {
    return new naver.maps.InfoWindow({
        content: content,
    });
};
