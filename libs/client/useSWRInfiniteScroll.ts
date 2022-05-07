import useSWR from "swr";
import { useState, useEffect } from "react";

interface InfiniteScrollResult {
  ok: boolean;
  message: string;
  infiniteData: any[];
}

const useSWRInfiniteScroll = <T extends {}>(url: string | null) => {
  const [page, setPage] = useState<number>(1);
  const [infiniteData, setInfiniteData] = useState<T[]>([]);
  const { data } = useSWR<InfiniteScrollResult>(url ? `${url}?page=${page}` : null);

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
        if (JSON.stringify(prev) === JSON.stringify(data.infiniteData)) {
          return [...prev];
        }
        return [...prev, ...data.infiniteData];
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
