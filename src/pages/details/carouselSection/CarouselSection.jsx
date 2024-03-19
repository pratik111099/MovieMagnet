/* eslint-disable react/prop-types */
import React from "react";

import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import Carousel from "../../../components/Carousel/Carousel";

import "./style.scss";

const CarouselSection = ({ flag, data, loading }) => {
    return (
        <div className="carouselSection">
            <ContentWrapper>
                <div className="title">
                    {flag === "similarMovie"
                        ? "Similar Movies"
                        : "Recommendations"}
                </div>
            </ContentWrapper>
            <Carousel data={data} loading={loading} />
        </div>
    );
};

export default CarouselSection;
