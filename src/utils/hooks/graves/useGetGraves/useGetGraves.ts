import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { API_V1_GRAVES } from "../../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../../configs/urls/app/app-urls";
import { Grave } from "../../../../types/Grave";
import { client, ClientAction } from "../../../api/client/client";
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

export type UseGetGravesPaginatedProps = {
  page?: number;
  limit?: number;
  name?: string;
};

export const useGetGravesPaginated = (
  props: UseGetGravesPaginatedProps
): UseGetGravesType => {
  const { name } = props;

  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetcher = useCallback(
    async (name?: string) => {
      setLoading(true);
      try {
        await graveStore.api.getGraves({ name });
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    debounce(() => {
      fetcher(name);
    });
  }, [fetcher, name]);

  return {
    isLoading: (!error && !graveStore.gravesList) || loading,
    isError: error,
  };
};
