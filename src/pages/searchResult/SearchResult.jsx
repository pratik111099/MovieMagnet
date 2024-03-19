import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import MovieCard from "../../components/MovieCard/MovieCard";
import Loader from "../../components/Loader/Loader";
import { fetchData } from "../../utils/api";

import "./style.scss";

const SearchResult = () => {
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [searchResults, setSearchResults] = useState(null);
    const { query } = useParams();

    // Fetching initial data after page load
    const fetchInitialData = () => {
        setLoading(true);
        fetchData(`/search/multi?query=${query}`).then((res) => {
            setSearchResults(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    // Fetch data after we scrolling down for infinate scroll
    const fetchNextData = () => {
        fetchData(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                if (res?.results) {
                    setSearchResults({
                        ...searchResults,
                        results: [...searchResults?.results, ...res?.results],
                    });
                } else {
                    setSearchResults(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    return (
        <div className="searchResult">
            <ContentWrapper>
                <div className="searchHeader">
                    Search results of &apos;{query}&apos;
                </div>
                {!loading ? (
                    <>
                        {searchResults?.results?.length > 0 ? (
                            <InfiniteScroll
                                className="searchList"
                                dataLength={
                                    searchResults?.results?.length || []
                                }
                                next={fetchNextData}
                                hasMore={pageNum <= searchResults?.total_pages}
                                loader={
                                    <Loader
                                        type="spinningBubbles"
                                        color="#ffffff"
                                        height={"10%"}
                                        width={"10%"}
                                    />
                                }
                            >
                                {searchResults.results.map((result) => {
                                    if (result?.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={result.id}
                                            item={result}
                                            mediaType={result?.media_type}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <div className="noResult">
                                <img src="/no-results.png" alt="" />
                                <span>Sorry, No Result Found🙁</span>
                            </div>
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

export default SearchResult;
