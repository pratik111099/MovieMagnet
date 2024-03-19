import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/LazyLoadImg/Img";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

import "./style.scss";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((store) => store.home);
    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        // Picking random image for background of hero banner
        const homeBackground =
            url?.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(homeBackground);
    }, [data, url]);

    // Navigate to search page for specific keyword from user
    const searchQueryHeadler = (value) => {
        if (value.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
        if (!value.key && value.type === "click" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background || ""} />
                </div>
            )}
            <div className="opacity-layer"></div>

            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of Movie, TV show and people to discover.
                        Explore Now
                    </span>
                    <div className="searchBar">
                        <input
                            type="text"
                            placeholder="Search a movie or tv show"
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHeadler}
                        />
                        <button onClick={searchQueryHeadler}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
