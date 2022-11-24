import { useEffect, useRef, useState } from 'react';
import green_car from "../images/car_mark_green.png";
import cash from "../images/fee_icon.png";
import find_way from "../images/find_way_icon.png";
import more from "../images/more_icon.png";
import home from "../images/home_icon.png";

import styled from 'styled-components';
import Charge from '../components/charge';

function Main() {
    const mapRef = useRef();

    useEffect(() => {
        const { naver } = window;

        const mapOptions = {
            center: new naver.maps.LatLng(37.540765, 126.946055), //지도 처음 위치
            zoom: 18,
        }

        const map = new naver.maps.Map(mapRef.current, mapOptions);
    }, []);

    const [visible,setVisible] = useState(false);

    return (  
        <Page>
            <Menu>
                <div class="menuItem">
                    <img src={green_car} />
                    <h2>CarSpot</h2>
                </div>
                <div class="menuItem">
                    <img src={home} />
                    <h2>지도 홈</h2>
                </div>
                <div class="menuItem">
                    <img src={find_way}  />
                    <h2>길찾기</h2>
                </div>
                <div class="menuItem">
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
                <div class="menuItem">
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
    margin: 0;
    padding: 0;
    flex-grow: 1;
    height: 100vh;

`;


export default Main;