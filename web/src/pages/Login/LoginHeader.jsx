import { useState } from "react";
import "./LoginHeader.css";
import logo from "../../assets/fakturera-logo.png";
import flagSE from "../../assets/flag-se.png";
import flagGB from "../../assets/flag-gb.png";
import { useTranslation } from "../../providers/TranslationProvider";

export default function Header() {
  const { language, setLanguage, translations } = useTranslation();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  function setLang(language) {
    setLanguage(language);
    setLangOpen(false);
  }

  const selectedFlag = language === "sv" ? flagSE : flagGB;

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
            <a href="#">{translations["nav.home"]}</a>
            <a href="#">{translations["nav.order"]}</a>
            <a href="#">{translations["nav.our-customers"]}</a>
            <a href="#">{translations["nav.about-us"]}</a>
            <a href="#">{translations["nav.contact-us"]}</a>
          </nav>

          <div id="login-lang-wrapper">
            <div id="login-lang-button" onClick={() => setLangOpen(!langOpen)}>
              <p>{language === "sv" ? "Svenska" : "English"}</p>
              <img src={selectedFlag} alt={language} />
            </div>

            {langOpen && (
              <div id="login-lang-dropdown">
                <div id="login-lang-option" onClick={() => setLang("sv")}>
                  <span>Svenska</span>
                  <img src={flagSE} alt="SE" />
                </div>
                <div id="login-lang-option" onClick={() => setLang("en")}>
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
