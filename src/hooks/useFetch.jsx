import { useEffect } from "react";
import { useState } from "react";
import { makeRequest } from "../../makeRequest";

const useFetch = (url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await makeRequest.get(url);
        setData(res.data.data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
