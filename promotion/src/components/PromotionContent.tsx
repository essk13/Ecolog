import { useEffect, useState, useRef } from "react";

import styled from "styled-components";
import image1 from "../asset/image/ecolog1.png";
import color from "../common/thema";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const Content = styled.div`
  padding: 80px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${color.gray.light};
  border-top: 8px solid rgb(255, 255, 255);
  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;

const SubContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1280px;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const ContentTitle = styled.div`
  color: white;
  flex: 0.8;
  padding: 0 75px;
  @media (max-width: 768px) {
    padding: 0;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
  }
`;

const ContentH1 = styled.h1`
  font-size: 46px;
  margin-bottom: 20px;
  line-height: 1.3;
  font-weight: bold;
  color: ${color.black.default};
  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

const ContentP = styled.p`
  font-size: 27px;
  line-height: 1.6;
  color: ${color.black.default};
  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 1.5;
  }
`;

const ContentImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
`;

const ContentImage = styled.img`
  width: 520px;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;


const PromotionContent = () => {

  return (
    <Container>
      <ContentContainer>
        <Content>
          <SubContent>
            <ContentTitle>
              <ContentH1>
                지구를 지키는 <br />
                우리의 <br />
                아름다운 기록 <br />
              </ContentH1>
            </ContentTitle>
            <ContentImageContainer>
              <ContentImage src={image1}></ContentImage>
            </ContentImageContainer>
          </SubContent>
        </Content>
        <Content>
          <SubContent>
            <ContentImageContainer>
              <ContentImage src={image1}></ContentImage>
            </ContentImageContainer>
            <ContentTitle>
              <ContentH1>
                플로깅 기록
              </ContentH1>
              <ContentP>
                플로깅을 아시나요? <br />
              </ContentP>
            </ContentTitle>
          </SubContent>
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default PromotionContent;
