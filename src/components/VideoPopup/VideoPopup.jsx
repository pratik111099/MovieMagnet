/* eslint-disable react/prop-types */
import React from "react";
import ReactPlayer from "react-player/youtube";

import "./style.scss";

const VideoPopup = ({ videoId, setVideoId, popupOn, setPopupOn }) => {
    return (
        popupOn && (
            <div className="popupBox" id="popupBox">
                <div className="videoPopup" id="videoPopup">
                    <div
                        className="closeBtn"
                        onClick={() => {
                            setVideoId(null);
                            setPopupOn(false);
                        }}
                    >
                        Close
                    </div>

                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${videoId}`}
                        controls
                        width="100%"
                        height="100%"
                        className="player"
                    />
                </div>
            </div>
        )
    );
};

export default VideoPopup;
