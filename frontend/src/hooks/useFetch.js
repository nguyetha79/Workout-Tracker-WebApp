import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      return;
    }

    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, {
        signal: abortCont.signal,
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      })
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 1000);

    return () => abortCont.abort();
  }, [url, user]);

  return { data, isPending, error };
};

export default useFetch;
