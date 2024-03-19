/* eslint-disable react/prop-types */
import React from "react";

import Img from "../../../components/LazyLoadImg/Img";
import { PlayIcon } from "../../../components/Playbtn/Playbtn";
import VideoPopup from "../../../components/VideoPopup/VideoPopup";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

import "./style.scss";

const VideoSection = ({
    videos,
    videoId,
    popupOn,
    setVideoId,
    setPopupOn,
    loading,
}) => {
    // Skeleton for movies videos
    const videoSkeleton = () => {
        return (
            <div className="video">
                <div className="thumbnail skeleton"></div>
                <div className="title">
                    <div className="skeleton"></div>
                    <div className="skeleton"></div>
                </div>
            </div>
        );
    };
    const handlePopupOn = (video) => {
        setVideoId(video?.key);
        setPopupOn(true);
    };
    return (
        <div className="videoSection">
            <ContentWrapper>
                <div className="title">Video Section</div>
                {!loading ? (
                    <div className="videoItems">
                        {videos?.map((video) => (
                            <div
                                key={video?.id}
                                className="videoItem"
                                onClick={() => {
                                    handlePopupOn(video);
                                }}
                            >
                                <div className="videoThumnail">
                                    <Img
                                        className="img"
                                        src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`}
                                    />
                                    <PlayIcon />
                                </div>
                                <div className="videoTitle">{video?.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videosLoader">
                        {videoSkeleton()}
                        {videoSkeleton()}
                        {videoSkeleton()}
                        {videoSkeleton()}
                    </div>
                )}
                <VideoPopup
                    videoId={videoId}
                    popupOn={popupOn}
                    setVideoId={setVideoId}
                    setPopupOn={setPopupOn}
                />
            </ContentWrapper>
        </div>
    );
};

export default VideoSection;
