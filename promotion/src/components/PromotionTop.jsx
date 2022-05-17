import { useEffect, useState, useRef } from "react";

import styled from "styled-components";
import color from "../common/thema";
import Typed from "typed.js";
import BackgroundSrc from "../asset/image/bg.png";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  overflow-x: hidden;
  background-image: url(${BackgroundSrc});
`;

const HomeTextFrame = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* font-weight: 700; */
  margin-left: 60px;
  margin-bottom: 60px;
  z-index: 1;
  cursor: default;
  transition: all 0.35s;
  @media only screen and (min-width: 768px) {
    font-size: 60px;
  }
  @media only screen and (min-width: 1280px) {
    font-size: 80px;
  }
`;

const TextBox = styled.div`
  color: ${color.white.default};
  transition: all 0.3s;
`;

const TextChangeFrame = styled.div`
  margin: -20px 0px;
  position: relative;
  width: 900px;
  @media only screen and (min-width: 768px) {
    height: 100px;
  }
  @media only screen and (min-width: 1280px) {
    height: 120px;
  }
`;

const TextBoxOpacity = styled.div`
  margin-left: 40px;
  position: absolute;
  display: flex;
  color: ${color.green.default};
  opacity: 0;
  margin-top: 40px;
  transition: all 0.3s;
`;

const TextKeyword = styled.div`
  transition: all 0.3s;
`;

const TextEnd = styled.div``;

const PromotionTop = () => {
  const [overIndex, setOverIndex] = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = 3;
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["플로깅을", "커뮤니티를", "설문 테스트를", "아바타 꾸미기를"],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <Container style={{ height: window.innerHeight }}>
      <HomeTextFrame>
        <TextDiv>
          <TextBox>지금 바로 에코로그에서</TextBox>
          <TextChangeFrame>
          <TextBoxOpacity
                style={{ opacity: 1, color: color.white.default, marginTop: 12 }}
              >
                <TextKeyword
                  ref={el}
                  style={
                    overIndex === currentIndex + 1 ||
                    (overIndex === 0 && currentIndex === maxIndex)
                      ? { marginLeft: -40, color: color.green.default }
                      : { color: color.green.default }
                  }
                ></TextKeyword>
                <TextEnd>하며</TextEnd>
              </TextBoxOpacity>
          </TextChangeFrame>
          <TextBox
              style={
                overIndex === currentIndex + 1 ||
                (overIndex === 0 && currentIndex === maxIndex)
                  ? { marginLeft: 0 }
                  : { marginLeft: 80 }
              }
            >
              기록을 남겨보실래요? 
          </TextBox>
        </TextDiv>
      </HomeTextFrame>
    </Container>
  );
};

export default PromotionTop;