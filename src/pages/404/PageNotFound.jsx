import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="noPageFound">
            <div className="wrapper">
                <span className="p404">404</span>
                <span className="oops">Oops!</span>
                <span className="pageNot">
                    We can&apos;t find page you&apos;r looking for!
                </span>
                <button className="btn" onClick={() => navigate("/")}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default PageNotFound;
