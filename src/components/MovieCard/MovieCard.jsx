/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Img from "../LazyLoadImg/Img";
import Ratings from "../Ratings/Ratings";
import dayjs from "dayjs";

import "./style.scss";

const MovieCard = ({ item, mediaType }) => {
    const { poster } = useSelector((store) => store.home.url);
    const { genres } = useSelector((store) => store.home);
    const navigate = useNavigate();

    const imgUrl = item?.poster_path
        ? poster + item?.poster_path
        : "/no-poster.png";

    return (
        <div
            key={item?.id}
            className="carouselItem"
            onClick={() => {
                navigate(`/${mediaType}/${item.id}`);
            }}
        >
            <div className="poster">
                <Img src={imgUrl} />
                <Ratings rating={item?.vote_average.toPrecision(2)} />
                <div className="genres">
                    {item?.genre_ids.slice(0, 2).map((item) => (
                        <span key={item} className="genre">
                            {genres?.[item]?.name}
                        </span>
                    ))}
                </div>
            </div>
            <div className="textBox">
                <div className="title">{item?.title || item?.name}</div>
                <div className="date">
                    {dayjs(item?.release_date).format("MMM D, YYYY")}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
