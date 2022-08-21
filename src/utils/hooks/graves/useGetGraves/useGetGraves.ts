import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { API_V1_GRAVES } from "../../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../../configs/urls/app/app-urls";
import { Grave } from "../../../../types/Grave";
import { client, ClientAction } from "../../../api/client/client";
import debounce from "../../../optimization/debouncer/debouncer";

export type UseGetGravesType = {
  data?: Array<Grave>;
  isLoading: boolean;
  isError?: Error;
};

const strip = (data: any): Array<Grave> => {
  if (data?.graves) data = data.graves;
  return data;
};

export const useGetGraves = (): UseGetGravesType => {
  let { data, error } = useSWR<Array<Grave> | undefined, Error>(
    `${ORIGIN}${API_V1_GRAVES}`,
    client as ClientAction<Grave[] | undefined>
  );

  data = strip(data);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetGravesPaginated = (
  page: number = 1,
  limit: number = 10
): UseGetGravesType => {
  const [data, setData] = useState<Array<Grave>>([]);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetcher = useCallback(
    async (page: number = 1, limit: number = 10) => {
      if (!hasMore) return Promise.resolve();
      setLoading(true);
      try {
        let gravesData = await client(
          `${ORIGIN}${API_V1_GRAVES}/paginate?page=${page}&limit=${limit}`
        );
        setHasMore(gravesData.has_more);
        setData((prev) => [...new Set([...prev, ...strip(gravesData)])]);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    debounce(() => {
      fetcher(page, limit);
    });
  }, [fetcher, limit, page]);

  return {
    data,
    isLoading: (!error && !data) || loading,
    isError: error,
  };
};
