/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";

import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

import "./style.scss";

const TopCast = ({ credits, creditsLoading }) => {
    const { url } = useSelector((store) => store.home);

    // Skeleton for top cast
    const castSkeleton = () => {
        return (
            <div className="cast">
                <div className="castDp skeleton"></div>
                <div className="castName">
                    <div className="skeleton"></div>
                    <div className="skeleton"></div>
                </div>
            </div>
        );
    };
    return (
        <div className="topCast">
            <ContentWrapper>
                <div className="title"> Top Cast</div>
                {!creditsLoading ? (
                    <div className="topCasts">
                        {credits?.map((credit, index) => {
                            return (
                                index < 6 && (
                                    <div className="cast" key={credit?.id}>
                                        <div className="castDp">
                                            <img
                                                src={
                                                    credit?.profile_path
                                                        ? url?.profile +
                                                          credit?.profile_path
                                                        : "/avatar.png"
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div className="castName">
                                            <div>{credit?.character}</div>
                                            <div>{credit?.name}</div>
                                        </div>
                                    </div>
                                )
                            );
                        })}
                    </div>
                ) : (
                    <div className="topCastLoader">
                        <div className="casts">
                            {castSkeleton()}
                            {castSkeleton()}
                            {castSkeleton()}
                            {castSkeleton()}
                            {castSkeleton()}
                            {castSkeleton()}
                        </div>
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default TopCast;
