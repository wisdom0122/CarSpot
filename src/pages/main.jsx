import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import Charge from '../components/charge';
import Menu from '../components/menu';

import Info from '../assets/marker_info.json';

import * as parkingApi from '../apis/parkingApi.js';

import redCarMarker from '../images/car_mark_red.png';
import yellowCarMarker from '../images/car_mark_yellow.png';
import greenCarMarker from '../images/car_mark_green.png';

import '../infowindow/infowindow.css';

function Main() {
    const mapRef = useRef();

    //map 중심 좌표(position)에 따라 가까운 spot api data 요청함
    const [visible, setVisible] = useState(false);
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState({lng: 37.5005, lat: 127.038});

    useEffect(() => {
        // real  open api data
        if (apiData.length == 0) return;
        console.log(apiData);
        const {naver} = window;

        const mapOptions = {
            center: new naver.maps.LatLng(37.540765, 126.946055), //지도 처음 위치
            zoom: 18,
        };

        const map = new naver.maps.Map(mapRef.current, mapOptions);

        // 다중 마커 표시
        for (let key = 0; key < apiData.length; key++) {
            let position = new naver.maps.LatLng(
                apiData[key].LAT,
                apiData[key].LNG
            );

            // marker 색상 지정
            // const carMarkerColor = apiData[key].CPCTY % 2 == 0 ? yellowCarMarker : greenCarMarker;
            // console.log("apiData[key].CUR_PRK_CNT: " + apiData[key].CUR_PRK_CNT);
            // console.log("apiData[key].CPCTY: " + apiData[key].CPCTY);
            // 혼잡도(현재 주차중인 차량)
            const congestion =
                (apiData[key].CUR_PRK_CNT / apiData[key].CPCTY) * 100;
            // console.log("congestion: " + congestion);
            const carMarker = (congestion) => {
                let carMarkerColor = redCarMarker;
                //   console.log("type: "+ typeof apiData[key].CUR_PRK_CNT);
                //   console.log("typeChk: " + typeof apiData[key].CUR_PRK_CNT !== Object);
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
                    '</div>',
                    '<div class="Container">',
                    '<div class="Default">',
                    '<div>02-1111-1111</div>',
                    `<div>${apiData[key].ROAD_ADDR}</div>`,
                    '</div>',
                    '<div class="ParkingState">',
                    '<div class="ParkingStateLeft">',
                    '<div class="ParkingStateUp">전체 주차면</div>',
                    `<div class="ParkingStateDown">${apiData[key].CPCTY}</div>`,
                    '</div>',
                    '<div class="ParkingStateRight">',
                    '<div class="ParkingStateUp">주차 가능면</div>',
                    `<div class="ParkingStateDown">${apiData[key].CUR_PRK_CNT}</div>`,
                    '</div>',
                    '</div>',
                    '</div>',
                ].join(''),
            });

            const openInfoBox = (marker, infoWindow) => {
                return function (e) {
                    if (infoWindow.getMap()) {
                        infoWindow.close();
                    } else {
                        infoWindow.open(map, marker);
                        map.setCenter(marker.getPosition()); // 화면의 중심점을 클릭한 마커로 변경한다.
                    }
                };
            };

            naver.maps.Event.addListener(
                marker,
                'click',
                openInfoBox(marker, infoWindow)
            ); // 클릭한 마커 핸들러
        }

        naver.maps.Event.addDOMListener(mapRef.current, 'click', () => {
            setPosition({
                lat: map.data.map.center.y,
                lng: map.data.map.center.x,
            });
        });
    }, [apiData]);

    useEffect(() => {
        setLoading(true);
        parkingApi.getDataFromApi(position, ({ApiData} = {}) => {
            setApiData((prev) => [...prev, ...ApiData]);
            setLoading(false);
        });
    }, []);

    return (
        <Page>
            <Menu setVisible={setVisible} />

            {visible && <Charge />}
            <Map ref={mapRef}></Map>
            <h5>공영주차장 정보안내시스템</h5>
        </Page>
    );
}

const Page = styled.div`
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    /* width: 100vw; */
    /* height: 100vh; */
    display: flex;
    flex-direction: row;
    h5 {
        margin: 0;
        font-size: 30px;
        font-weight: bold;
        color: black;
        opacity: 0.7;
        position: absolute;
        right: 25px;
        top: 15px;
    }
`;

const Map = styled.div`
    width: 100vw;
    margin: 0;
    padding: 0;
    flex-grow: 1;
    height: 100vh;
    :focus {
        outline: none;
    }
`;

export default Main;
