import redCarMarker from "../assets/images/car_mark_red.png";
import yellowCarMarker from "../assets/images/car_mark_yellow.png";
import greenCarMarker from "../assets/images/car_mark_green.png";
import centermarker from "../assets/images/centermarker.png";
import { Constants } from "../constants";
import { createMarker, clearMarkers } from "../services/mapService";

const { naver } = window;
let map;
let centerMarker;
let markers = [];
let infos = [];

const mapLeftClickHandler = () => {
  //선택된 마커들 선택 해제
};

const mapDragEndHandler = (map, setPosition) => {
  naver.maps.Event.addListener(map, "dragend", () => {
    setPosition({
      lat: map.data.map.center.y,
      lng: map.data.map.center.x,
    });
  });
};

//naver map을 생성하거나 return 해줌
export const createMap = (mapRef) => {
  if (map == null) {
    const mapOptions = {
      center: Constants.initLocation,
      zoom: Constants.initZoom,
    };

    map = new naver.maps.Map(mapRef.current, mapOptions);

    mapLeftClickHandler(mapRef);

    mapDragEndHandler(mapRef);

    centerMarker = createMarker(map, Constants.initLocation, {
      url: centermarker,
    });
  }

  return map;
};

// 수신한 데이터로 마커를 생성함
// 전에 수신한 데이터를 제거하고 새로 수신한 데이터로 마커를 재생성중임.
// 수신한 데이터를 보존하고 좌표값으로 가장 가까운곳을 계산해 마커를 찍는 방법이 필요
// 11/29 jin
export const createMaker = (apiData, setName) => {
  //모든 marker 를 닫고 maker정보를 날림
  clearMarkers(infos, markers);

  // markers = [];
  // infos = [];

  //api data 로 마커를 찍음
  for (let key = 0; key < apiData.length; key++) {
    let position = new naver.maps.LatLng(apiData[key].LAT, apiData[key].LNG);

    // marker 색상 지정  혼잡도(현재 주차중인 차량)
    const congestion = (apiData[key].CUR_PRK_CNT / apiData[key].CPCTY) * 100;
    const carMarker = (congestion) => {
      let carMarkerColor = redCarMarker;

      if (congestion >= 50) {
        carMarkerColor = greenCarMarker;
      } else if (congestion >= 30) {
        carMarkerColor = yellowCarMarker;
      } else carMarkerColor = carMarkerColor;
      return carMarkerColor;
    };
    const carMarkerSize = new naver.maps.Size(30, 30);

    let marker = new naver.maps.Marker({
      map: map,
      position: position,
      title: key,
      icon: {
        url: carMarker(congestion),
        scaledSize: carMarkerSize,
      },
    });
    marker.setZIndex();

    let infoWindow = new naver.maps.InfoWindow({
      content: [
        '<div class="InfoBox">',
        '<div class="PopDetail">',
        '<div class="InfoBoxHead">',
        `<h3>${apiData[key].PRK_NM}</h3>`,
        "</div>",
        '<div class="Container">',
        '<div class="Default">',
        "<div>02-1111-1111</div>",
        `<div>${apiData[key].ROAD_ADDR}</div>`,
        "</div>",
        '<div class="ParkingState">',
        '<div class="ParkingStateLeft">',
        '<div class="ParkingStateUp">전체 주차면</div>',
        `<div class="ParkingStateDown">${apiData[key].CPCTY}</div>`,
        "</div>",
        '<div class="ParkingStateRight">',
        '<div class="ParkingStateUp">주차 가능면</div>',
        `<div class="ParkingStateDown">${apiData[key].CUR_PRK_CNT}</div>`,
        "</div>",
        "</div>",
        '<div class="PayInfo">',
        `<div>요금 정보</div>`,
        `<div> 기본 요금(시간) : ${apiData[key].RATES}원/${apiData[key].TIME_RATES}분</div>`,
        `<div> 추가 요금(시간) : ${apiData[key].RATES}원/${apiData[key].TIME_RATES}분</div>`,
        "</div>",
        "</div>",
      ].join(""),
    });

    markers.push(marker);
    infos.push(infoWindow);
  }

  //마커 클릭 이벤트를 등록함
  const openInfoBox = (marker, infoWindow, value) => {
    return function () {
      setName(value);
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, marker);
        map.setCenter(marker.getPosition()); // 화면의 중심점을 클릭한 마커로 변경한다.
      }
    };
  };

  for (let index = 0; index < markers.length; index++) {
    naver.maps.Event.addListener(
      markers[index],
      "click",
      openInfoBox(markers[index], infos[index], apiData[index])
    ); // 클릭한 마커 핸들러
  }
};

export const ChangeCenterMarker = (position) => {
  centerMarker.setPosition(position);
};
