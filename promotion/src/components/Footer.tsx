import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer__addr">
          <h1 className="footer__logo">에코로그</h1>
          <h2>Info</h2>
          <address>
            SSAFY 6기 자율 구미 1반 1팀 <br />
            버그 줍는 개발자들
            <a
              className="footer__btn"
              href="mailto:ssafyd101@gmail.com"
            >
              Email Us
            </a>
            <p>&copy; 2022 SSAFY. All rights reserved.</p>
          </address>
        </div>

        <ul className="footer__nav">
          <li className="nav__item">
            <h2 className="nav__title">Frontend</h2>

            <ul className="nav__ul">
              <li>
                <a href="https://github.com/snowwhitewolf">이종현</a>
              </li>
              <li>
                <a href="https://github.com/essk13">이수환</a>
              </li>
              <li>
                <a href="https://github.com/Hui-Story">이재희</a>
              </li>
            </ul>
          </li>

          <li className="nav__item">
            <h2 className="nav__title">Backend</h2>

            <ul className="nav__ul">
              <li>
                <a href="https://github.com/PWinwon">박승원</a>
              </li>
              <li>
                <a href="https://github.com/pondsuyeon">지수연</a>
              </li>
              <li>
                <a href="https://github.com/qazqww">이진곤</a>
              </li>
            </ul>
          </li>
        </ul>
      </footer>
    </div>
  );
}
