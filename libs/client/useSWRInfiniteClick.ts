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
      setInfiniteData([...data.infiniteData]);
    }
  }, [data]);

  useEffect(() => {
    if (page === data?.totalPages) {
      if (ref?.current) {
        ref.current.style.display = "none";
      }
    }
  }, [page, data?.totalPages, ref]);

  useEffect(() => {
    ref?.current?.addEventListener("click", handleClick);
  }, [ref, handleClick]);

  return infiniteData;
};

export default useSWRInfiniteClick;
