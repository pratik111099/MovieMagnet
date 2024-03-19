import React, { useState } from "react";

import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/Carousel/Carousel";
import SwitchTab from "../../../components/switchTab/SwitchTab";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

import "./style.scss";

const TopRated = () => {
    const [activetab, setActivetab] = useState("movie");
    const { data, loading } = useFetch("/" + activetab + "/top_rated");

    const onTabChange = (tab) => {
        tab === "Movies" ? setActivetab("movie") : setActivetab("tv");
    };

    return (
        <div className="topRated">
            <ContentWrapper>
                <div className="topRatedHeader">
                    <span className="topRatedTitle">Top Rated</span>
                    <SwitchTab
                        tabs={["Movies", "Tv Shows"]}
                        onTabChange={onTabChange}
                    />
                </div>
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint={activetab}
            />
        </div>
    );
};

export default TopRated;
