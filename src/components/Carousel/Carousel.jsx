/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
    BiSolidLeftArrowCircle,
    BiSolidRightArrowCircle,
} from "react-icons/bi";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Img from "../LazyLoadImg/Img";
import Ratings from "../Ratings/Ratings";

import "./style.scss";

const Carousel = ({ data, loading, endpoint }) => {
    const { poster } = useSelector((store) => store.home.url);
    const { genres } = useSelector((store) => store.home);
    const carouselRef = useRef();
    const navigate = useNavigate();
    const { mediaType } = useParams();
    let myArray = Array.from({ length: 20 }, (_, index) => index + 1);

    const navigateCarousel = (direction) => {
        const carousel = carouselRef.current;
        const scroll =
            direction === "left"
                ? carousel.scrollLeft - (carousel.offsetWidth + 20)
                : carousel.scrollLeft + (carousel.offsetWidth + 20);

        carousel.scrollTo({
            left: scroll,
            behavior: "smooth",
        });
    };
    return (
        <div className="carousel">
            <ContentWrapper>
                <BiSolidLeftArrowCircle
                    className="arrow left"
                    onClick={() => navigateCarousel("left")}
                />
                <BiSolidRightArrowCircle
                    className="arrow right"
                    onClick={() => navigateCarousel("right")}
                />

                {loading ? (
                    <div className="loadingSkeleton">
                        {myArray.map((i) => (
                            <div className="skeletonItem" key={i}>
                                <div className="poster skeleton"></div>
                                <div className="textBlock ">
                                    <div className="title skeleton"></div>
                                    <div className="date skeleton"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="carouselItems" ref={carouselRef}>
                        {data?.map((item) => {
                            const imgUrl = item?.poster_path
                                ? poster + item?.poster_path
                                : "/no-poster.png";
                            return (
                                <div
                                    key={item?.id}
                                    className="carouselItem"
                                    onClick={() => {
                                        navigate(
                                            `/${
                                                mediaType ||
                                                endpoint ||
                                                item?.media_type
                                            }/${item?.id}`
                                        );
                                    }}
                                >
                                    <div className="poster">
                                        <Img src={imgUrl} />
                                        <Ratings
                                            rating={item?.vote_average.toPrecision(
                                                2
                                            )}
                                        />
                                        <div className="genres">
                                            {item?.genre_ids
                                                .slice(0, 2)
                                                .map((item) => (
                                                    <span
                                                        key={item}
                                                        className="genre"
                                                    >
                                                        {genres?.[item]?.name}
                                                    </span>
                                                ))}
                                        </div>
                                    </div>
                                    <div className="textBox">
                                        <div className="title">
                                            {item?.title || item?.name}
                                        </div>
                                        <div className="date">
                                            {dayjs(item?.release_date).format(
                                                "MMM D, YYYY"
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Carousel;
