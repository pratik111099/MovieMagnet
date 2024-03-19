import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedin,
    FaTwitter,
} from "react-icons/fa";

import ContentWrapper from "../ContentWrapper/ContentWrapper";

import "./footer.scss";

const Footer = () => {
    return (
        <div className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <p className="infoText">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                    assumenda autem necessitatibus, voluptate natus quis tempore
                    sit quo non impedit voluptatibus amet excepturi iusto. Rem
                    accusantium quasi natus mollitia numquam?
                </p>
                <ul className="socialMediaIcons">
                    <li className="icon">
                        <FaFacebookF />
                    </li>
                    <li className="icon">
                        <FaInstagram />
                    </li>
                    <li className="icon">
                        <FaTwitter />
                    </li>
                    <li className="icon">
                        <FaLinkedin />
                    </li>
                </ul>
            </ContentWrapper>
        </div>
    );
};

export default Footer;
