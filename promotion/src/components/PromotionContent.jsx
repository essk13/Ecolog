import { useEffect, useState, useRef } from "react";

import styled from "styled-components";
import color from "../common/thema";
import { Fade } from "react-awesome-reveal";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Carousel from 'react-bootstrap/Carousel'

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Controller } from 'swiper';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";


import image1 from "../asset/image/ecolog1.png";
import phonex from "../asset/image/phonex.png"

SwiperCore.use([Navigation, Pagination]);

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
  margin-bottom: 5px;
  line-height: 1.3;
  font-weight: bold;
  color: ${color.black.default};
  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

const ContentP = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: ${color.gray.dark};
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ContentImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
`;

const ContentImage = styled.img`
  width: 360px;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const SwiperContainer = styled.div`
  width: 540px;
`;


const PromotionContent = () => {

  const [index, setIndex] = useState(0);
  const [controlledSwiper, setControlledSwiper] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    AOS.init({
      duration : 1000
    });
  })

  return (
    <Container>
      <ContentContainer>
        <Content>
          <SubContent>
            <ContentTitle data-aos="fade-up">
              <ContentH1>
                플로깅
              </ContentH1>
              <ContentP>
                플로깅을 아시나요? <br />
                스웨덴어 '플로카 업(Plocka upp)' + '조깅(Jogging)' <br />
                나의 건강과 지구의 건강을 챙기는 플로깅! <br />
                에코로그에서 플로깅을 기록하고, <br />
                다른 사람에게 공유해보세요!<br />
              </ContentP>
            </ContentTitle>
            <Fade>
              <SwiperContainer>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  scrollbar={{ draggable: true }}
                  navigation
                  pagination={{ clickable: true }}
                  modules={[Controller]}
                  controller={{ control: controlledSwiper }}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                </Swiper>
              </SwiperContainer>
            </Fade>
          </SubContent>
        </Content>
        <Content>
          <SubContent>
            <Fade>
              <SwiperContainer>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  scrollbar={{ draggable: true }}
                  navigation
                  pagination={{ clickable: true }}
                  modules={[Controller]}
                  controller={{ control: controlledSwiper }}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                </Swiper>
              </SwiperContainer>
            </Fade>
            <ContentTitle data-aos="fade-up">
              <ContentH1>
                커뮤니티
              </ContentH1>
              <ContentP>
                온라인으로 연결된 곳이라면 지구 안 어디서든 무료! <br />
                나의 일상 혹은 다양한 환경 캠페인에 참여하고 <br />
                다른 사람들과 공유하세요. <br />
                건강한 지구를 위한 당신의 행동이 <br />
                다른 누군가의 모범이 될 수 있습니다. <br />
              </ContentP>
            </ContentTitle>
          </SubContent>
        </Content>
        <Content>
          <SubContent>
            <ContentTitle data-aos="fade-up">
              <ContentH1>
                에코지수 테스트
              </ContentH1>
              <ContentP>
                당신은 환경에 관심이 많나요? <br />
                당신의 환경에 대한 평소 생활 습관을 통해 <br />
                자신을 되돌아 볼 수 있습니다. <br />
                높은 점수를 획득하고 <br />
                다른 사람에게 공유해보세요!<br />
              </ContentP>
            </ContentTitle>
            <Fade>
              <SwiperContainer>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  scrollbar={{ draggable: true }}
                  navigation
                  pagination={{ clickable: true }}
                  modules={[Controller]}
                  controller={{ control: controlledSwiper }}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                </Swiper>
              </SwiperContainer>
            </Fade>
          </SubContent>
        </Content>
        <Content>
          <SubContent>
            <Fade>
              <SwiperContainer>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  scrollbar={{ draggable: true }}
                  navigation
                  pagination={{ clickable: true }}
                  modules={[Controller]}
                  controller={{ control: controlledSwiper }}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-fixed-width-300">
                    <ContentImageContainer>
                      <ContentImage src={phonex}>
                      </ContentImage>
                    </ContentImageContainer>
                  </SwiperSlide>
                </Swiper>
              </SwiperContainer>
            </Fade>
            <ContentTitle data-aos="fade-up">
              <ContentH1>
                아바타 꾸미기
              </ContentH1>
              <ContentP>
                에코로그의 플로깅 혹은 <br />
                다양한 환경 캠페인에 참여하면 <br />
                아바타와 공간을 살 수 있는 리워드를 지급합니다. <br />
                나만의 아바타를 사고 <br />
                나만의 공간을 꾸며보세요! <br />
              </ContentP>
            </ContentTitle>
          </SubContent>
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default PromotionContent;
