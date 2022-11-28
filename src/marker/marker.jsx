const Marker = (naver, SpotList, map) => {
    for (let key = 0; key < SpotList.length; key++) {
        let position = new naver.maps.LatLng(
            SpotList[key].lat,
            SpotList[key].lng
        );

        let marker = new naver.maps.Marker({
            map: map,
            position: position,
            title: key,
            icon: {
                url: './images/parkingIcon.png',
            },
        });
    }
};

export default Marker;
