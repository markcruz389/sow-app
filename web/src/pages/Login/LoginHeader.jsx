import { useState } from "react";
import "./LoginHeader.css";
import logo from "../../assets/fakturera-logo.png";
import flagSE from "../../assets/flag-se.png";
import flagGB from "../../assets/flag-gb.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang] = useState("SE");

  const selectedFlag = selectedLang === "SE" ? flagSE : flagGB;

  return (
    <header id="login-header">
      <div id="login-header-content">
        <div id="login-hamburger" onClick={() => setOpen(!open)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div id="login-header-logo">
          <img src={logo} alt="Logo" />
        </div>

        <div id="login-header-right">
          <nav id={`login-nav`} className={open ? "nav open" : "nav"}>
            <a href="#">Hem</a>
            <a href="#">Beställ</a>
            <a href="#">Våra Kunder</a>
            <a href="#">Om oss</a>
            <a href="#">Kontakta oss</a>
          </nav>

          <div id="login-lang-wrapper">
            <div id="login-lang-button" onClick={() => setLangOpen(!langOpen)}>
              <p>{selectedLang === "SE" ? "Svenska" : "English"}</p>
              <img src={selectedFlag} alt={selectedLang} />
            </div>

            {langOpen && (
              <div id="login-lang-dropdown">
                <div id="login-lang-option">
                  <span>Svenska</span>
                  <img src={flagSE} alt="SE" />
                </div>
                <div id="login-lang-option">
                  <span>English</span>
                  <img src={flagGB} alt="UK" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
