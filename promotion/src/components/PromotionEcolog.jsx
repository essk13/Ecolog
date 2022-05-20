import React, { useEffect } from "react";

import styled from "styled-components";
import color from "../common/thema";
import AOS from 'aos';
import 'aos/dist/aos.css';

import logoImage from "../asset/image/earth_normal.gif";
import slogun from "../asset/image/slogun.png"


const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 100px;
  background-color: ${color.gray.light};
`;

const LogoImage = styled.img`
  width: 400px;
  margin-right: 100px;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`
;
const SlogunImage = styled.img`
  width: 640px;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const PromotionEcolog = () => {
  useEffect(() => {
    AOS.init({
      duration : 1000
    });
  })

  return (
    <Container>
        <LogoImage src={logoImage} data-aos="fade-up">
        </LogoImage>
        <SlogunImage src={slogun} data-aos="fade-up">
        </SlogunImage>
    </Container>
  )
};

export default PromotionEcolog;