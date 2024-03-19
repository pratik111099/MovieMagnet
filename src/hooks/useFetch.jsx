import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading("Loading....");
        setData(null);
        setError(null);

        fetchData(url)
            .then((data) => {
                setLoading(false);
                setData(data);
            })
            .catch((error) => {
                setLoading(false);
                setError("Something went wrong!!!");
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
