import redCarMarker from '../assets/images/car_mark_red.png';
import yellowCarMarker from '../assets/images/car_mark_yellow.png';
import greenCarMarker from '../assets/images/car_mark_green.png';
import centerCarMarker from '../assets/images/centermarker.png';
import { Constants } from './constants/map';
import { createMarker, clearMarkers, createInfoWindow } from './mapService';

const { naver } = window;
let map;
let centerMarker;
let markers = [];
let infos = [];
let listeners = [];

//naver map을 생성하거나 return 해줌
export const createMap = (mapRef, setPosition) => {
    if (map == null) {
        const mapOptions = {
            center: Constants.initLocation,
            zoom: Constants.initZoom,
        };

        map = new naver.maps.Map(mapRef.current, mapOptions);

        mapDragEndHandler(map, setPosition);

        centerMarker = createMarker(map, Constants.initLocation, centerCarMarker);
    }

    return map;
};

// 11/29 jin
export const createMaker = (apiData, setSpotData) => {
    //모든 marker 를 닫고 maker정보를 날림
    [infos, markers, listeners] = clearMarkers(infos, markers, listeners);

    //api data 로 마커를 찍음
    for (let key = 0; key < apiData.length; key++) {
        let position = new naver.maps.LatLng(apiData[key].LAT, apiData[key].LNG);

        // marker 색상 지정  혼잡도(현재 주차중인 차량)
        const congestion = (apiData[key].CUR_PRK_CNT / apiData[key].CPCTY) * 100;
        const carMarkerSize = new naver.maps.Size(30, 30);

        const marker = createMarker(map, position, {
            url: carMarker(congestion),
            scaledSize: carMarkerSize,
        });

        const infoWindow = createInfoWindow(infoWindowContent(apiData[key]));

        markers.push(marker);
        infos.push(infoWindow);
    }

    for (let index = 0; index < markers.length; index++) {
        listeners[index] = naver.maps.Event.addListener(
            markers[index],
            'click',
            openInfoBox(markers[index], infos[index], apiData[index], setSpotData)
        ); // 클릭한 마커 핸들러
    }
};

export const ChangeCenterMarker = (position) => {
    centerMarker.setPosition(position);
};

const mapDragEndHandler = (map, setPosition) => {
    naver.maps.Event.addListener(map, 'dragend', () => {
        setPosition({
            lat: map.data.map.center.y,
            lng: map.data.map.center.x,
        });
    });
};

const openInfoBox = (marker, infoWindow, value, setSpotData) => {
    return function () {
        setSpotData(value);

        if (infoWindow.getMap()) {
            infoWindow.close();
        } else {
            infoWindow.open(map, marker);
            map.setCenter(marker.getPosition()); // 화면의 중심점을 클릭한 마커로 변경한다.
        }
    };
};

const carMarker = (congestion) => {
    let carMarkerColor = redCarMarker;

    if (congestion >= 50) {
        carMarkerColor = greenCarMarker;
    } else if (congestion >= 30) {
        carMarkerColor = yellowCarMarker;
    } else carMarkerColor = carMarkerColor;
    return carMarkerColor;
};

const infoWindowContent = (item) => {
    return [
        '<div class="InfoBox">',
        '<div class="PopDetail">',
        '<div class="InfoBoxHead">',
        `<h3>${item.PRK_NM}</h3>`,
        '</div>',
        '<div class="Container">',
        '<div class="Default">',
        '<div>02-1111-1111</div>',
        `<div>${item.ROAD_ADDR}</div>`,
        '</div>',
        '<div class="ParkingState">',
        '<div class="ParkingStateLeft">',
        '<div class="ParkingStateUp">전체 주차면</div>',
        `<div class="ParkingStateDown">${item.CPCTY}</div>`,
        '</div>',
        '<div class="ParkingStateRight">',
        '<div class="ParkingStateUp">주차 가능면</div>',
        `<div class="ParkingStateDown">${item.CUR_PRK_CNT}</div>`,
        '</div>',
        '</div>',
        '<div class="PayInfo">',
        `<div>요금 정보</div>`,
        `<div> 기본 요금(시간) : ${item.RATES}원/${item.TIME_RATES}분</div>`,
        `<div> 추가 요금(시간) : ${item.RATES}원/${item.TIME_RATES}분</div>`,
        '</div>',
        '</div>',
    ].join('');
};
