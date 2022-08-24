import { useCallback, useEffect, useState } from "react";
import { API_V1_GRAVES } from "../../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../../configs/urls/app/app-urls";
import { Grave } from "../../../../types/Grave";
import { client } from "../../../api/client/client";
import debounce from "../../../optimization/debouncer/debouncer";
import graveStore from "../../../../store/mobx/graves/graves";

export type UseGetGravesType = {
  data?: Array<Grave>;
  isLoading: boolean;
  isError?: Error;
};

const strip = (data: any): Array<Grave> => {
  if (data?.graves) data = data.graves;
  return data;
};

export const useSearchGraves = (word: string): UseGetGravesType => {
  const { setGravesList } = graveStore;

  const [data, setData] = useState<Array<Grave>>([]);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetcher = useCallback(
    async (word: string) => {
      if (!word) return;
      setLoading(true);
      try {
        let gravesData = await client(
          `${ORIGIN}${API_V1_GRAVES}/search?name=${word}`
        );
        // const newGraves = strip(gravesData);
        // setData((prev) => [...new Set([...prev, ...newGraves])]);
        // setGravesList(newGraves);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [word]
  );

  useEffect(() => {
    debounce(() => {
      fetcher(word);
    }, 500);
  }, [word, fetcher]);

  return {
    data,
    isLoading: (!error && !data) || loading,
    isError: error,
  };
};
