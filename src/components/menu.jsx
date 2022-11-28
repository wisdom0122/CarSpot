import React from 'react';
import styled from 'styled-components';

import cash from '../images/fee_icon.png';
import more from '../images/more_icon.png';
import home from '../images/home_icon.png';
import find_way from '../images/find_way_icon.png';
import green_car from '../images/car_mark_green.png';

const Menu = ({ setVisible }) => {
    return (
        <MenuPage>
            <MenuItem>
                <img src={green_car} />
                <h2>CarSpot</h2>
            </MenuItem>
            <MenuItem>
                <img src={home} />
                <h2>지도 홈</h2>
            </MenuItem>
            <MenuItem>
                <img src={find_way} />
                <h2>길찾기</h2>
            </MenuItem>
            <MenuItem>
                <img
                    src={cash}
                    style={{
                        width: '45px',
                        height: '45px',
                    }}
                    onClick={() => {
                        setVisible((prev) => !prev);
                    }}
                />
                <h2>요금계산</h2>
            </MenuItem>
            <MenuItem>
                <img
                    src={more}
                    style={{
                        width: '35px',
                        height: '35px',
                    }}
                />
                <h2>더보기</h2>
            </MenuItem>
        </MenuPage>
    );
};

const MenuPage = styled.div`
    width: 100px;
    padding: 20px 0;
    background-color: #e8dfca;
    opacity: 0.8;
`;

const MenuItem = styled.div`
    display: flex;
    flex-direction: column;
    width: 100px;
    height: 100px;
    margin: 0 auto 25px auto;
    justify-content: center;
    img {
        display: flex;
        margin: 0 auto;
        width: 40px;
        height: 40px;
    }
    h2 {
        margin: 5px 0 0 0;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        font-size: 15px;
    }
`;

export default Menu;
