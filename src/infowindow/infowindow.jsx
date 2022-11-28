const InfoWindow = (naver) => {
    let infoWindow = new naver.maps.InfoWindow({
        content: [
            '<div class="InfoBox">',
            '<div class="PopDetail">',
            '<div class="InfoBoxHead">',
            '<h3>index</h3>',
            '</div>',
            '<div class="Container">',
            '<div class="Default">',
            '<div>02-1111-1111</div>',
            '<div>마포구 마포동</div>',
            '</div>',
            '<div class="ParkingState">',
            '<div class="fl">',
            '<div class="stit">전체 주차면</div>',
            '<div class="stxt">1111</div>',
            '</div>',
            '<div class="fr">',
            '<div class="stit">주차 가능면</div>',
            '<div class="stxt">1111</div>',
            '</div>',
            '</div>',
            '</div>',
        ].join(''),
    });
};

export default InfoWindow;
