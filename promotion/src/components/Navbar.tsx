import React from "react";

import { AiOutlineDownload, AiFillYoutube } from "react-icons/ai";

import styled from "styled-components";
import color from "../common/thema";
import logoImg from "../asset/image/earth.png";

const Nav = styled.div`
  position: sticky;
  display: flex;
  width: 100%;
  height: 70px;
  top: 0;
  background-color: ${color.gray.apple};
  z-index: 10;
  justify-content: space-around;
  align-items: center;
  color: ${color.gray.light};
  font-size: 20px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const NavLink = styled.a`
  display: flex;
  text-decoration: none;
  color: ${color.gray.light};
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-left: 60px;
`;

const Navbar = () => {


  return (
    <Nav>
      <NavItem>
        <NavImage src={logoImg}>
        </NavImage>
          건강한 지구를 만드는 아름다운 기록
      </NavItem>
      <NavItem>
        <NavLink href="https://www.youtube.com/watch?v=tKhrWKvrn0s">
          광고보기&nbsp;<AiFillYoutube size="25" color="red"></AiFillYoutube> 
        </NavLink>
        <NavLink href="https://drive.google.com/file/d/1iKZrovvz4jbafk8mQnrWQyJiH5iS7Jyf/view?usp=sharing">
          에코로그&nbsp;<AiOutlineDownload size="25"></AiOutlineDownload> 
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default Navbar;