/* eslint-disable react/prop-types */
import React from "react";

import "./style.scss";

const Genre = ({ genres }) => {
    return (
        <ul className="genres">
            {genres.map((genre) => (
                <li className="genreItem" key={genre?.id}>
                    {genre?.name}
                </li>
            ))}
        </ul>
    );
};

export default Genre;
