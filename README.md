# 뷰티플로거

**건강한 지구를 만드는 아름다운 달리기 ‘쓰레깅(플로깅)’**

> ’플로깅’ 또는 ‘용기내 챌린지’ 에 대해 들어보신 적 있으신가요?
>
> 지구의 생태계가 훼손되기까지 약 70년 밖에 걸리지 않았습니다. 이러한 문제를 해결하기 위해 단체뿐만 아니라 개개인들도 달리면서 쓰레기를 줍는 ‘플로깅’ 과 같은 캠페인을 진행하고 있습니다.
>
> 사용자와 지구의 건강을 동시에 책임지는 뷰티플로깅에 동참하세요.

<br>

### 목차

- :book: [주요 기능](#:book: 주요 기능)
- :books: [세부 기능](#:books: 세부 기능)
- :computer: [개발 환경](#:computer: 개발 환경)
- :classical_building: [아키텍쳐](#:classical_building: 아키텍처)
- :bookmark_tabs: [산출물](#:bookmark_tabs: 산출물)
- :family: [팀 소개](#:family: 팀 소개 (쓰레깅))

<br>

## :book: 주요 기능

- 원활한 플로깅을 위한 기록, 조회 등 기능 제공
- 환경 캠페인 이슈와 실천 여부를 공유하기 위한 커뮤니티 기능 제공
- 환경에 좋은 생활 습관을 가졌는지 알아볼 수 있는 설문 테스트 제공
- 환경 보호 활동으로 보상을 얻어 마이룸 / 아바타를 꾸밀 수 있는 기능 제공

<br>

## :books: 세부 기능

| 구분 | 기능                       | 설명                                                         | 비고 |
| ---- | -------------------------- | ------------------------------------------------------------ | ---- |
| 1    | 회원 관리                  | 회원가입 및 회원 정보 조회 및 수정을 할 수 있다.             |      |
| 2    | 팔로우 / 언팔로우          | 다른 회원을 팔로우하여 환경 운동을 함께 할 파트너를 만들 수 있다. |      |
| 3    | 플로깅                     | 위치 기반 이동 경로, 시간, 거리, 칼로리를 기록할 수 있고, 사진과 함께 지구 상태 등을 결과를 조회 및 공유할 수 있다. |      |
| 4    | 지역별 플로깅 진행 현황    | 지도 상에 지역별 플로깅 진행 현황을 UI를 통해 파악할 수 있다. |      |
| 5    | 플로깅 랭킹                | 주간 / 월간 / 누적 등 기간 별, 지역 / 지인 별 랭킹을 조회하고 리워드를 얻을 수 있다. |      |
| 6    | 주변 쓰레기통 조회         | 쓰레기 배출을 위해 쓰레기통의 위치를 조회하고 등록할 수 있다. |      |
| 7    | 환경 캠페인 커뮤니티       | 환경 운동 현황을 게시글로 공유하고, 캠페인을 함께 할 사람을 모집할 수 있다. |      |
| 8    | 생활 습관 설문조사 및 공유 | 환경을 지키는 생활 습관에 대한 설문조사를 진행하고 결과를 공유하여 사람들의 흥미를 유발할 수 있다. |      |
| 9    | AR 분리수거 정보 제공      | 분리수거 마크를 통해 AR로 분리수거 정보를 제공받을 수 있다.  |      |
| 10   | 메타버스 아바타, 방 꾸미기 | 플로깅 및 환경 캠페인 참여를 통해 받은 리워드를 사용해 아바타와 방을 꾸밀 수 있다. |      |
| 11   | 지인 회원과의 교류         | 다른 회원의 방에 방문하고 환경 운동 기록을 공유할 수 있다.   |      |

<br>

## :computer: 개발 환경

1. 형상관리 : GitLab

2. 이슈관리 : Jira

3. 커뮤니케이션 : Mattermost, Notion, Discord

4. 디자인 : Figma

5. OS : Windows 10

6. DB : MySQL 8.0.28, Redis 6.2

7. Server

   가) AWS EC2, AWS S3, Ubuntu 20.04, Jenkins 2.303.2, nginx 1.18.0

   나) Tool : Putty

8. Front-End

   가) HTML5, CSS3, TypeScript 4.6.2

   나) React-Native 0.65.1

   다) React-Redux 7.2.6, Redux-Saga 1.1.3, React-Router-Dom 6.2.2

   라) MaterialUI 5.5.0, Styled-Components 5.3.3, Node-Sass 7.0.1

   마) Node.js 16.14.2, npm 8.5.5

   바) AR.js + Three.js

9. Back-End

   가) Java JDK 8

   나) SpringBoot 2.4.5, Spring JPA, Spring Security

   다) Lombok 1.18.20, Swagger 2.9.2, jwt 3.18.2

10. Metaverse

    가) Unity

    나) Photon Server

11. IDE

    가) IntelliJ 21.3.2

    나) MySQL Workbench 8.0.28

    다) Visual Studio Code 1.65.2

    바) Android Studio

<br>

## :classical_building: 아키텍처

![diagram](https://user-images.githubusercontent.com/87461594/163529463-ec963eb1-148b-4813-801a-bfce80b186bb.png)

<br>

## :bookmark_tabs: 산출물

1. 와이어프레임

![wireframe](https://user-images.githubusercontent.com/87461594/163529466-ba846406-c920-40a2-8246-78d28c285b8d.png)

<br>

## :family: 팀 소개 (쓰레깅)

박승원

이진곤

지수연

이수환

이재희

이종현
