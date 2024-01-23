// Author: dlofrodloh, sasa
// Date: 30 december 2021
// Title of source code: How to process data received from an AJAX request in React
// Type: source code
// Web address: https://stackoverflow.com/questions/70536711/how-to-process-data-received-from-an-ajax-request-in-react

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
        .then((d) => {
          setData(d);
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
