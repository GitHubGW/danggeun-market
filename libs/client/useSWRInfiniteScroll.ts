import useSWR from "swr";
import { useState, useEffect } from "react";

const useSWRInfiniteScroll = <T extends {}>(url: string) => {
  const [page, setPage] = useState<number>(1);
  const [infiniteData, setInfiniteData] = useState<T[]>([]);
  const { data } = useSWR(`${url}?page=${page}`);

  const handleScroll = () => {
    const offsetHeight: number = document.documentElement.offsetHeight;
    const scrollTop: number = document.documentElement.scrollTop;
    const innerHeight: number = window.innerHeight;

    if (scrollTop + innerHeight >= offsetHeight) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    if (data) {
      setInfiniteData((prev) => {
        const result = [...prev, ...data.infiniteData];
        return result;
      });
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return infiniteData;
};

export default useSWRInfiniteScroll;
