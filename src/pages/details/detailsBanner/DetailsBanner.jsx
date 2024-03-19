/* eslint-disable react/prop-types */
import React from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import useFetch from "../../../hooks/useFetch";
import Genre from "../../../components/Genre/Genre";
import Img from "../../../components/LazyLoadImg/Img";
import Ratings from "../../../components/Ratings/Ratings";
import { PlayIcon } from "../../../components/Playbtn/Playbtn";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

import "./style.scss";

const DetailsBanner = ({ credits, setPopupOn, handleVideoId }) => {
    const { mediaType, id: movie_id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${movie_id}`);
    const { url } = useSelector((store) => store.home);

    const writer = credits?.filter((credit) => credit.job === "Writer");
    const director = credits?.filter((credit) => credit.job === "Director");

    // Converting movie or series minutes times into hour-minutes formate
    const mintohr = (totalMin) => {
        let hr = Math.floor(totalMin / 60);
        let min = totalMin % 60;
        return hr + "h " + min + "m";
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                data && (
                    <div className="detailsBannerContent">
                        <div className="backgroundImg">
                            <Img src={url.backdrop + data.backdrop_path} />
                        </div>
                        <div className="opacityLayer"></div>
                        <ContentWrapper>
                            <div className="content">
                                <div className="left">
                                    <Img
                                        className="posterImg"
                                        src={
                                            data.poster_path
                                                ? url.backdrop +
                                                  data.poster_path
                                                : "/no-poster.png"
                                        }
                                    />
                                </div>
                                <div className="right">
                                    <div className="title">
                                        {`${data.title || data.name} (${dayjs(
                                            data.release_date
                                        ).format("YYYY")})`}
                                    </div>
                                    <div className="subtitle">
                                        {data.tagline}
                                    </div>
                                    <Genre genres={data.genres} />
                                    <div className="ratingSection">
                                        <Ratings
                                            rating={data.vote_average.toPrecision(
                                                2
                                            )}
                                            textColor="#FFFFFF"
                                            trailColor="#020c1b"
                                        />
                                        <div
                                            className="playBtn"
                                            onClick={() => {
                                                setPopupOn(true);
                                                handleVideoId();
                                            }}
                                        >
                                            <PlayIcon />
                                            <span className="text">
                                                Watch Trailer
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overview">
                                        <span className="title">Overview </span>
                                        <span className="content">
                                            {data.overview}
                                        </span>
                                    </div>
                                    <div className="movieDetails">
                                        {data.status && (
                                            <span className="status detailSection">
                                                <span className="title">
                                                    Status:
                                                </span>
                                                <span className="content">
                                                    {data.status}
                                                </span>
                                            </span>
                                        )}
                                        {data.release_date && (
                                            <div className="releaseDate detailSection">
                                                <span className="title">
                                                    Release Date:
                                                </span>
                                                <span className="content">
                                                    {dayjs(
                                                        data.release_date
                                                    ).format("MMM D, YYYY")}
                                                </span>
                                            </div>
                                        )}
                                        {data.runtime && (
                                            <div className="runtime detailSection">
                                                <span className="title">
                                                    Runtime:
                                                </span>
                                                <span className="content">
                                                    {mintohr(data.runtime)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    {director?.[0]?.name?.length > 0 && (
                                        <div className="director">
                                            <span className="title">
                                                Director:
                                            </span>
                                            <span className="content">
                                                {director[0].name}
                                            </span>
                                        </div>
                                    )}
                                    {writer?.[0]?.name?.length > 0 && (
                                        <div className="writer">
                                            <span className="title">
                                                Writer:
                                            </span>
                                            <span className="content">
                                                {writer[0].name}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ContentWrapper>
                    </div>
                )
            ) : (
                <div className="detailsBannerLoader">
                    <ContentWrapper>
                        <div className="leftLoader skeleton"></div>
                        <div className="rightLoader">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;
