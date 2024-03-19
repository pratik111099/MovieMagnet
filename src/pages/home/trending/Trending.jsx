import React, { useState } from "react";

import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/Carousel/Carousel";
import SwitchTab from "../../../components/switchTab/SwitchTab";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

import "./style.scss";

const Trending = () => {
    const [activetab, setActivetab] = useState("day");
    const { data, loading } = useFetch("/trending/all/" + activetab);

    const onTabChange = (tab) => {
        tab === "Day" ? setActivetab("day") : setActivetab("week");
    };

    return (
        <div className="trending">
            <ContentWrapper>
                <div className="trendingHeader">
                    <span className="title">Trending</span>
                    <SwitchTab
                        tabs={["Day", "Week"]}
                        onTabChange={onTabChange}
                    />
                </div>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    );
};

export default Trending;
