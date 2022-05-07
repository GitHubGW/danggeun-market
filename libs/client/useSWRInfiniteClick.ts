import useSWR from "swr";
import { useState, useEffect, MutableRefObject, useCallback } from "react";

interface InfiniteClickResult {
  ok: boolean;
  message: string;
  infiniteData: any[];
  totalCounts: number;
  totalPages: number;
}

const useSWRInfiniteClick = <T extends {}>(url: string | null, ref?: MutableRefObject<HTMLSpanElement | null>) => {
  const [page, setPage] = useState<number>(1);
  const [infiniteData, setInfiniteData] = useState<T[]>([]);
  const { data } = useSWR<InfiniteClickResult>(url ? `${url}?page=${page}` : null);

  const handleClick = useCallback(() => {
    setPage((page) => page + 1);
  }, []);

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
    ref?.current?.addEventListener("click", handleClick);
  }, [ref, handleClick]);

  return infiniteData;
};

export default useSWRInfiniteClick;
