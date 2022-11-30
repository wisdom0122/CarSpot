import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import cash from '../images/fee_icon.png';

const Charge = ({ name }) => {
    const [discount, setDiscount] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [feeValue, setFeeValue] = useState('');
    console.log(inputValue);
    console.log(name.RATES);
    console.log(inputValue * name.RATES);
    const onChange = (e) => {
        setInputValue(e.target.value);
    };
    const onClick = (e) => {
        setFeeValue(inputValue * name.RATES * discount);
    };

    useEffect(() => {
        setInputValue('');
    }, [name]);

    return (
        <ChargeSection>
            <ChargePageStyle>
                <div className="title">
                    <img src={cash} />
                    <h1>주차 요금 계산</h1>
                </div>
                <Item>
                    <h1>주차장명 : </h1>
                    <input type="text" value={name.PRK_NM} />
                </Item>
                <Item>
                    <h1>이용날짜 : </h1>
                    <input type="date" />
                </Item>
                <Item>
                    <h1>이용시간 : </h1>
                    <input onChange={onChange} value={inputValue} type="text" placeholder="이용" />
                </Item>
                <Item_smallCar>
                    <h2>경차 요금할인 </h2>
                    <div class="smallCar">
                        <div class="smallCar_content">
                            <h3>해당</h3>
                            <label for="discount" className="discountBox">
                                <input
                                    type="checkbox"
                                    name="discount"
                                    onClick={() => {
                                        setDiscount(0.5);
                                    }}
                                />
                            </label>
                        </div>
                        {/* <div class="smallCar_content">
                            <h3>해당X</h3>
                            <input
                                type="radio"
                                name="discount"
                                onClick={() => {
                                    setDiscount(1);
                                }}
                            />
                        </div> */}
                    </div>
                </Item_smallCar>
                <Item_fee>
                    <h1>이용요금 : </h1>
                    <div className="total_fee">{feeValue}</div>
                    <button onClick={onClick}>계산</button>
                </Item_fee>
            </ChargePageStyle>
        </ChargeSection>
    );
};

const ChargeSection = styled.div`
    z-index: 20;
    border-radius: 15px;
    position: fixed;
    left: 110px;
    top: 10px;
    background-color: #fff;
    opacity: 0.8;
    border: 1px solid #000;
    padding: 10px;
`;

const ChargePageStyle = styled.div`
    background-color: #fff;
    font-weight: bold;
    text-align: center;
    justify-content: center;
    align-items: center;
    .title {
        display: flex;
        flex-direction: row;
        height: 60px;
        justify-content: center;
        align-items: center;
        /* border-bottom: 1px dotted gray; */
        h1 {
            margin-left: 10px;
            font-size: 28px;
            font-weight: bold;
        }
        img {
            width: 35px;
            height: 35px;
            object-fit: contain;
        }
    }
`;

const Item = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 20px;
    height: 50px;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid white;

    h1 {
        font-size: 20px;
        margin-right: 15px;
    }
    input {
        height: 30px;
        width: 150px;
        border-radius: 5px;
        border: none;
        ::placeholder {
            text-align: center;
        }
    }
    h2 {
        font-size: 20px;
        margin-right: 10px;
    }
`;

const Item_fee = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 20px;
    height: 50px;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid white;
    h1 {
        margin: 0 15px 0 0;
        font-size: 20px;
    }
    .total_fee {
        height: 30px;
        width: 110px;
        border-radius: 5px;
        background-color: white;
    }
    button {
        margin-left: 10px;
        background-color: #6b97bc;
        border: none;
        width: 45px;
        height: 25px;
        font-size: 15px;
        font-weight: 600;
    }
`;

const Item_smallCar = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 20px;
    height: 50px;
    border-bottom: 1px solid white;
    h2 {
        padding-left: 20px;
        font-size: 20px;
        width: 60%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .smallCar {
        height: 50px;
        display: flex;
        width: 40%;
        .smallCar_content {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            height: 50px;
            width: 100%;
            .discountBox {
                color: red;
            }
            h3 {
                font-size: 20px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
            input {
                margin-top: 5px;
                width: 20px;
                height: 20px;
            }
        }
    }
`;

export default Charge;
