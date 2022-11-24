import { useEffect, useRef, useState } from "react";
import icon from "../images/parkingIcon.png";
import redIcon from "../images/car_mark_red.png"
import yellowIcon from "../images/car_mark_yellow.png"
import greenIcon from "../images/car_mark_green.png"
import styled from "styled-components";
import SpotList from "../SpotList.json";

function Main() {
  const mapRef = useRef();
  let markers = []; // 마커들의 정보들을 담을 배열
  let infoWindows = []; // 공영 주차장 정보들을 담을 배열

  useEffect(() => {
    const { naver } = window;

    const mapOptions = {
      center: new naver.maps.LatLng(37.540765, 126.946055), //지도 처음 위치
      zoom: 18,
    };

    const map = new naver.maps.Map(mapRef.current, mapOptions);

    // 다중 마커 표시
    for (let key = 0; key < SpotList.length; key++) {
      let position = new naver.maps.LatLng(
        SpotList[key].lat,
        SpotList[key].lng
      );

      // marker 색상 지정
      const iconColor = SpotList[key].id%2==0 ? redIcon : yellowIcon;
      const iconSize = new naver.maps.Size(230, 230);

      let marker = new naver.maps.Marker({
        map: map,
        position: position,
        title: key,
        icon: {
          url: iconColor, // 현재 사용 중인 마커 이미지
          size: new naver.maps.Size(230, 230),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(11, 35)
        },
      });
      marker.setZIndex();
      console.log(iconSize.toString());

      let infoWindow = new naver.maps.InfoWindow({
        content:
          '<div style="width:150px;text-align:center;padding:10px;">The Letter is <b>"' +
          key +
          '"</b>.</div>',
      });

      markers.push(marker);
      infoWindows.push(infoWindow);
    }

    // 마커 클릭 시 주차장 정보 on/off
    const openInfoBox = (seq) => {
      return function (e) {
        let marker = markers[seq];
        let infoWindow = infoWindows[seq];

        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
          map.setCenter(marker.getPosition()); // 화면의 중심점을 클릭한 마커로 변경한다.
        }
      };
    };

    for (let i = 0; i < markers.length; i++) {
      naver.maps.Event.addListener(markers[i], "click", openInfoBox(i)); // 클릭한 마커 핸들러
    }
  }, []);

  return <Map ref={mapRef}></Map>;
}

const Map = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default Main;
