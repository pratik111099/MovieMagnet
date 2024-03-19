/* eslint-disable react/prop-types */
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import "./style.scss";

const Ratings = ({ rating, textColor, trailColor }) => {
    return (
        <div className="ratings">
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}
                styles={buildStyles({
                    textColor: textColor,
                    trailColor: trailColor,
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    );
};

export default Ratings;
