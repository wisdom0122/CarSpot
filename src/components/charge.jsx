import React from "react";
import styled from "styled-components";
import cash from "../images/fee_icon.png";

const Charge = () => {
  return (
    <ChargeSection>
      <ChargePageStyle>
        <div className="title">
          <img src={cash} />
          <h1>주차 요금 계산</h1>
        </div>
        <Item>
          <h1>주차장명 : </h1>
          <input type="text" />
        </Item>
        <Item>
          <h1>이용날짜 : </h1>
          <input type="date" />
        </Item>
        <Item>
          <h1>이용시간 : </h1>
          <input type="time" />
        </Item>
        <Item_smallCar>
          <h2>경차 요금할인 </h2>
          <div class="smallCar">
            <div class="smallCar_content">
              <h3>해당O</h3>
              <input type="radio" />
            </div>
            <div class="smallCar_content">
              <h3>해당X</h3>
              <input type="radio" />
            </div>
          </div>
        </Item_smallCar>
        <Item_fee>
          <h1>이용요금 : </h1>
          <div className="total_fee"></div>
        </Item_fee>
      </ChargePageStyle>
    </ChargeSection>
  );
};

// const test = (fee) => {
//   console.log("fee", fee * 0.5);
// };


const ChargeSection = styled.div`
  background-color: #F5EFE6;
  opacity:0.8;
  height: 100vh;
  width: 300px;
  ;
`

const ChargePageStyle = styled.div`
  background-color: #AEBDCA;
  margin-top: 150px;
  width: 300px;
  font-weight: bold;
  text-align: center;
  justify-content: center;
  align-items: center;
  .title{
    display: flex;
    flex-direction: row;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-bottom : 3px solid white ;
  h1{
    margin-left: 10px;
    font-size: 30px;
    font-weight: bold;

  }
  img{
    width: 35px;
    height: 35px;
    object-Fit:contain;
   
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
  border-bottom : 1px solid white ;
  h1 {
    font-size: 20px;
    margin-right: 15px;
  }
  input {
    height: 30px;
    width: 150px;
    border-radius: 5px;
    border: none;
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
  border-bottom : 1px solid white ;
  h1{
    margin: 0 15px 0 0;
    font-size: 20px;
  }
  .total_fee{
    height: 30px;
    width: 150px;
    border-radius: 5px;
    background-color:white;
  }
  `

const Item_smallCar = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  height: 70px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-bottom : 1px solid white ;
  h2 {
    font-size: 20px;
    width: 150px;
  }
  .smallCar {
    height: 70px;
    display: flex;
    flex-grow: 1;
    
  .smallCar_content{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    border-left : 1px solid white ;
  h3{
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    
  }
  input{
    margin-top: 5px;
    width: 23px; 
    height: 23px; 
  }
  }
  }
`

export default Charge;
