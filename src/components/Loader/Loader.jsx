/* eslint-disable react/prop-types */
import React from "react";
import ReactLoading from "react-loading";

import "./style.scss";

const Loader = ({ type, color, height, width }) => (
    <div className="loaderDiv">
        <ReactLoading
            type={type}
            color={"#ffffff" || color}
            height={height}
            width={width}
        />
    </div>
);

export default Loader;
