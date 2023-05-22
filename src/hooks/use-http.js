import { useState, useCallback } from "react";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (request, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const respon = await fetch(request.url, {
        method: request.method ? request.method : "GET",
        body: request.body ? request.body : null,
        headers: request.headers ? request.headers : {},
      });

      if (!respon.ok) {
        throw new Error("error");
      }
      const data = await respon.json();
      applyData(data);
    } catch (error) {
      setError("Failed to fetch data");
    }
    setIsLoading(false);
  }, []);
  return {
    sendRequest,
    isLoading,
    error,
  };
};

export default useHttp;
