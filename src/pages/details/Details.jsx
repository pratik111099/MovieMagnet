import React, { useState } from "react";
import { useParams } from "react-router-dom";

import TopCast from "./topCast/TopCast";
import useFetch from "../../hooks/useFetch";
import VideoSection from "./videoSection/VideoSection";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import CarouselSection from "./carouselSection/CarouselSection";
import VideoPopup from "../../components/VideoPopup/VideoPopup";

import "./style.scss";

const Details = () => {
    const [popupOn, setPopupOn] = useState(false);
    const [videoId, setVideoId] = useState("");
    const { mediaType, id } = useParams();

    const { data: videos, loading: videosLoading } = useFetch(
        `/${mediaType}/${id}/videos`
    );
    const { data: credits, loading: creditsLoading } = useFetch(
        `/${mediaType}/${id}/credits`
    );
    const { data: similarMovie, loading: similarMovieLoading } = useFetch(
        `/${mediaType}/${id}/similar`
    );
    const { data: recommendations, loading: recommendationsLoading } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

    // Finding trailer for specific movie or tv series for videos data
    const handleVideoId = () => {
        if (videos?.results?.length > 0) {
            const value = videos?.results?.filter(
                (video) => video.type === "Trailer"
            );
            setVideoId(value?.[value?.length - 1]?.key);
        } else {
            setVideoId(videos?.results?.[0]?.key);
        }
    };

    return (
        <div className="detailsPage">
            <DetailsBanner
                credits={credits?.crew}
                handleVideoId={handleVideoId}
                setPopupOn={setPopupOn}
                style={{ height: 1200 }}
            />
            {credits?.cast?.length > 0 && (
                <TopCast
                    credits={credits?.cast}
                    creditsLoading={creditsLoading}
                />
            )}
            {videos?.results?.length > 0 && (
                <VideoSection
                    videos={videos?.results}
                    videoId={videoId}
                    popupOn={popupOn}
                    setVideoId={setVideoId}
                    setPopupOn={setPopupOn}
                    loading={videosLoading}
                />
            )}
            {similarMovie?.results?.length > 0 && (
                <CarouselSection
                    flag="similarMovie"
                    data={similarMovie?.results}
                    loading={similarMovieLoading}
                />
            )}
            {recommendations?.results?.length > 0 && (
                <CarouselSection
                    flag="recommendations"
                    data={recommendations?.results}
                    loading={recommendationsLoading}
                />
            )}
            <VideoPopup
                videoId={videoId}
                setVideoId={setVideoId}
                popupOn={popupOn}
                setPopupOn={setPopupOn}
            />
        </div>
    );
};

export default Details;
