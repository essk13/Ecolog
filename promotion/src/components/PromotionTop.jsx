import { useEffect, useState, useRef } from "react";

import styled from "styled-components";
import color from "../common/thema";
import Typed from "typed.js";
import BackgroundSrc from "../asset/image/bg.png";
import './Home.css';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  overflow-x: hidden;
  background-image: url(${BackgroundSrc});
`;

const ContainerBox = styled.div`
  position: absolute;
  display:flex;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
  color: ${color.blue.ecolog};
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

  window.addEventListener("scroll", function() {
    const Mouse = this.document.getElementById("mouse")
    if (this.window.scrollY > 150) {
      Mouse?.classList.add("home-mouse-active")
      Mouse?.classList.add("home-mouse-none")
    } else {
      Mouse?.classList.remove("home-mouse-none")
      Mouse?.classList.remove("home-mouse-active")
    }
  })

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["????????????", "???????????????", "?????? ????????????", "????????? ????????????"],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <Container style={{ height: window.innerHeight * 0.9 }}>
      <ContainerBox style={{ height: window.innerHeight * 0.9 }}>
        <HomeTextFrame>
          <TextDiv>
            <TextBox>?????? ?????? ??????????????????</TextBox>
            <TextChangeFrame>
            <TextBoxOpacity
                  style={{ opacity: 1, color: color.white.default, marginTop: 12 }}
                >
                  <TextKeyword
                    ref={el}
                    style={
                      overIndex === currentIndex + 1 ||
                      (overIndex === 0 && currentIndex === maxIndex)
                        ? { marginLeft: -40, color: color.blue.ecolog }
                        : { color: color.blue.ecolog }
                    }
                  ></TextKeyword>
                  <TextEnd>??????</TextEnd>
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
                ????????? ??????????????????? 
            </TextBox>
          </TextDiv>
        </HomeTextFrame>
      </ContainerBox>
      <p className="home-mouse">
        <span id="mouse"></span>
      </p>
    </Container>
  );
};

export default PromotionTop;