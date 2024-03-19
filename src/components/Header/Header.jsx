import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import { IoIosArrowDown } from "react-icons/io";
import { SlMenu } from "react-icons/sl";
import { useAuth0 } from "@auth0/auth0-react";

import ContentWrapper from "../ContentWrapper/ContentWrapper";

import "./header.scss";

const Header = () => {
    const [mobileView, setMobileView] = useState(false);
    const [searchView, setSearchView] = useState(false);
    const [headerView, setHeaderView] = useState("top");
    const [logoutbtn, setLogoutbtn] = useState("hide");
    const [prevScroll, setPrevScroll] = useState(0);
    const [query, setQuery] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth0();

    // useEffect for when we move to next page then scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    // useEffect for traking user scrolling
    useEffect(() => {
        document.addEventListener("scroll", controlHeader);
        return () => document.removeEventListener("scroll", controlHeader);
    }, [prevScroll]);

    // handler for changing header view
    const controlHeader = () => {
        if (window.scrollY > 200) {
            if (prevScroll > window.scrollY) {
                setHeaderView("show");
            } else {
                setHeaderView("hide");
            }
        } else {
            setHeaderView("top");
        }
        setPrevScroll(window.scrollY);
    };

    // handler for search input
    const searchQueryHandler = (value) => {
        if (value.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setSearchView(false);
        }
    };

    // handler for navigate to explore page depending on click
    const movieTvshowHandler = (value) => {
        if (value === "movie") {
            navigate(`/explore/${value}`);
        } else {
            navigate(`/explore/${value}`);
        }
        setMobileView(false);
    };

    // handler for search input
    const handleSearchView = () => {
        setSearchView(true);
        setMobileView(false);
    };

    const handleMobileView = () => {
        setMobileView(true);
        setSearchView(false);
    };

    return (
        <header
            className={`header ${mobileView && "mobileView"} ${headerView}`}
        >
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                    <img src="/logo.png" alt="" />
                    <h2>MovieMagnet</h2>
                </div>
                <ul className="menuItems">
                    <li
                        className="menuItem"
                        onClick={() => movieTvshowHandler("movie")}
                    >
                        Movie
                    </li>
                    <li
                        className="menuItem"
                        onClick={() => movieTvshowHandler("tv")}
                    >
                        TV Show
                    </li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={handleSearchView} />
                    </li>
                    <li
                        className="user"
                        onClick={() => {
                            logoutbtn === "hide"
                                ? setLogoutbtn("")
                                : setLogoutbtn("hide");
                        }}
                    >
                        <p>{user?.name}</p>
                        <img src={user?.picture} alt="" />
                        <IoIosArrowDown />
                        <div
                            className={`logoutBtn ${logoutbtn}`}
                            id="logoutId"
                            onClick={(e) => {
                                logout();
                            }}
                        >
                            Logout
                        </div>
                    </li>
                </ul>
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={handleSearchView} />
                    {mobileView ? (
                        <VscChromeClose onClick={() => setMobileView(false)} />
                    ) : (
                        <SlMenu onClick={handleMobileView} />
                    )}
                </div>
            </ContentWrapper>
            {searchView && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search a movie or tv show"
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose
                                onClick={() => setSearchView(false)}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;
