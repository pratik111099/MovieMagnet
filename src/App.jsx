import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchData } from "./utils/api";
import { getApiConfiguration, getGenres } from "./Redux/homeSlice";
import Header from "./components/Header/Header";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Footer from "./components/Footer/Footer";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
    const dispatch = useDispatch();
    const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

    useEffect(() => {
        getMovieData();
        getGenreData();
    }, []);

    const getMovieData = () => {
        fetchData("/configuration").then((res) => {
            const url = {
                backdrop: res?.images?.secure_base_url + "original",
                poster: res?.images?.secure_base_url + "original",
                profile: res?.images?.secure_base_url + "original",
            };
            dispatch(getApiConfiguration(url));
        });
    };

    const getGenreData = async () => {
        const allGenre = {};
        const movieGenre = await fetchData("/genre/movie/list");
        const tvGenre = await fetchData("/genre/tv/list");
        movieGenre?.genres?.map((genre) => (allGenre[genre.id] = genre));
        tvGenre?.genres?.map((genre) => (allGenre[genre.id] = genre));
        dispatch(getGenres(allGenre));
    };

    if (isLoading) return <div>Loading......</div>;
    return isAuthenticated ? (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchResult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    ) : (
        loginWithRedirect()
    );
}

export default App;
