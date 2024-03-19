import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import MovieCard from "../../components/MovieCard/MovieCard";
import Loader from "../../components/Loader/Loader";
import useFetch from "../../hooks/useFetch";
import { fetchData } from "../../utils/api";
import { sortByData } from "./utils";

import "./style.scss";

let filters = {};

const Explore = () => {
    const [data, setData] = useState(null);
    const [genre, setGenre] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const { mediaType } = useParams();

    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

    // Filter movie or tv series data
    const onChange = (select, action) => {
        if (action.name === "sortBy") {
            setSortBy(select);
            if (action.action !== "clear") {
                filters.sort_by = select.value;
            } else {
                delete filters.sort_by;
            }
        }
        if (action.name === "genres") {
            setGenre(select);
            if (action.action !== "clear") {
                const genreId = select.map((item) => item.id);
                filters.with_genres = JSON.stringify(genreId).slice(1, -1);
            } else {
                delete filters.with_genres;
            }
        }
        setPageNum(1);
        fetchInitialData();
    };

    // Fetching initial data when dom load
    const fetchInitialData = () => {
        setLoading(true);
        fetchData(
            `/discover/${mediaType === "movie" ? "movie" : "tv"}`,
            filters
        ).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    // Fetch data after we scrolling down for infinate scroll
    const fetchNextPageData = () => {
        fetchData(`/discover/${mediaType}?page=${pageNum}`, filters).then(
            (res) => {
                if (res?.results) {
                    setData({
                        ...data,
                        results: [...data.results, ...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };

    useEffect(() => {
        filters = {};
        setData(null);
        setGenre(null);
        setSortBy(null);
        setPageNum(1);
        fetchInitialData();
    }, [mediaType]);

    return (
        <div className="explore">
            <ContentWrapper>
                <div className="exploreHeader">
                    <span className="title">
                        Explore {mediaType === "movie" ? "Movies" : "TV Shows"}
                    </span>
                    <div className="exploreFilters">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            placeholder="Select Genres"
                            onChange={onChange}
                            className="react-select-container genresFilters"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortBy"
                            value={sortBy}
                            closeMenuOnSelect={true}
                            options={sortByData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort By"
                            className="react-select-container sortby"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>

                {!loading ? (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className="movieList"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={
                                    <Loader
                                        type="spinningBubbles"
                                        color="#ffffff"
                                        height={"10%"}
                                        width={"10%"}
                                    />
                                }
                            >
                                {data.results.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={item?.id + index}
                                            item={item}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                ) : (
                    <Loader
                        type="spinningBubbles"
                        color="#ffffff"
                        height={"15%"}
                        width={"15%"}
                    />
                )}
            </ContentWrapper>
        </div>
    );
};

export default Explore;
