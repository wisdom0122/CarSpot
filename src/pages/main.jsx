import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Charge from "../components/charge";

import SpotList from '../assets/spotList.json';

import * as parkingApi from '../apis/parkingApi.js';


import cash from "../images/fee_icon.png";
import more from "../images/more_icon.png";
import home from "../images/home_icon.png";
import icon from '../images/parkingIcon.png';
import red_car from "../images/car_mark_red.png";
import find_way from "../images/find_way_icon.png";
import green_car from "../images/car_mark_green.png";
import yellow_car from "../images/car_mark_yellow.png";


function Main() {
    const mapRef = useRef();
    
    let markers = []; // 마커들의 정보들을 담을 배열
    let infoWindows = []; // 공영 주차장 정보들을 담을 배열

    //map 중심 좌표(position)에 따라 가까운 spot api data 요청함
    const [apiData, setApiData] = useState([]);
    const [visible,setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState({ lat: 37.5005, lng: 127.038 });
    

    useEffect(() => {
        const { naver } = window;

        const mapOptions = {
            center: new naver.maps.LatLng(37.540765, 126.946055), //지도 처음 위치
            zoom: 18,
        };

        const map = new naver.maps.Map(mapRef.current, mapOptions);

        
        // 다중 마커 표시
        for (let key = 0; key < SpotList.length; key++) {
            let position = new naver.maps.LatLng(SpotList[key].lat, SpotList[key].lng);

            let marker = new naver.maps.Marker({
                map: map,
                position: position,
                title: key,
                icon: {
                    url: icon, // 현재 사용 중인 마커 이미지
                },
            });

            let infoWindow = new naver.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:10px;">The Letter is <b>"' + key + '"</b>.</div>',
            });

            markers.push(marker);
            infoWindows.push(infoWindow);
        }

        // 마커 클릭 시 주차장 정보 on/off
        const openInfoBox = seq => {
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
            naver.maps.Event.addListener(markers[i], 'click', openInfoBox(i)); // 클릭한 마커 핸들러
        }
        
        for (let i = 0; i < markers.length; i++) {
            naver.maps.Event.addListener(markers[i], "click", openInfoBox(i)); // 클릭한 마커 핸들러
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        parkingApi.getDataFromApi(position, ({ ApiData } = {}) => {
            setApiData(prev => [...prev, ...ApiData]);
            setLoading(false);
        });
    }, [position]);


    return (  
        <Page>
            <Menu>
                <div className="menuItem">
                    <img src={green_car} />
                    <h2>CarSpot</h2>
                </div>
                <div className="menuItem">
                    <img src={home} />
                    <h2>지도 홈</h2>
                </div>
                <div className="menuItem">
                    <img src={find_way}  />
                    <h2>길찾기</h2>
                </div>
                <div className="menuItem">
                    <img src={cash} 
                    style={{
                        width : "45px",
                        height : "45px"
                    }}
                    onClick={()=>{
                        setVisible(!visible);
                    }}/>
                    <h2>요금계산</h2>
                    
                </div>
                <div className="menuItem">
                    <img src={more} 
                        style={{
                            width : "35px",
                            height : "35px"
                        }} />
                    <h2>더보기</h2>
                </div>
            </Menu>
            {visible && <Charge />}
            <Map ref={mapRef}>
            </Map>
            <h5>공영주차장 정보안내시스템</h5>      
        </Page>
    )
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
    h5{
        margin: 0;
        font-size: 30px;
        font-weight: bold;
        color: black;
        opacity:0.7;
        position: absolute;
        right: 25px;
        top: 15px;
    }
   
`;

const Menu = styled.div`
    width : 100px;
    padding: 20px 0;
    background-color: #E8DFCA;
    opacity:0.8;
    .menuItem{
        display: flex;
        flex-direction: column;
        width: 100px;
        height: 100px;
        margin: 0 auto 25px auto;
        justify-content: center;
    }
    img{
        display: flex;
        margin: 0 auto;
        width: 40px;
        height: 40px;
    }
    h2{
        margin: 5px 0 0 0;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        font-size: 15px;
    }
`;

const Map = styled.div`
    width: 100vw;
    margin: 0;
    padding: 0;
    flex-grow: 1;
    height: 100vh;
`;

export default Main;
