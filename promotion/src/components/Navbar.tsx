import React from "react";

import styled from "styled-components";
import color from "../common/thema";
import logoImg from "../asset/image/earth.png";

const Nav = styled.div`
  position: sticky;
  display: flex;
  width: 100%;
  height: 70px;
  top: 0;
  background-color: ${color.gray.light};
  z-index: 10;
  justify-content: space-around;
  align-items: center;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;s
`;

const NavImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;


const Navbar = () => {


  return (
    <Nav>
      <NavItem>
        <NavImage src={logoImg}>
        </NavImage>
          지구를 지키는 우리의 아름다운 기록
      </NavItem>
      <NavItem>
        <a href="https://drive.google.com/drive/folders/1x-O9MSxTCifQSHNWhfGB7Ui3AfFlYPE6?usp=sharing">
          에코로그 하러가기
        </a>
      </NavItem>
    </Nav>
  );
};

export default Navbar;