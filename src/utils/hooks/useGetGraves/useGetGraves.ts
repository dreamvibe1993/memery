import useSWR from "swr";
import { API_V1_GRAVES } from "../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../configs/urls/app/app-urls";
import { Grave } from "../../../types/Grave";
import { client, ClientAction } from "../../api/client/client";

export type UseGetGravesType = {
  data?: Array<Grave>;
  isLoading: boolean;
  isError?: Error;
};

const strip = (data: any) => {
    if (data?.graves) data = data.graves
    return data
}

export const useGetGraves = (): UseGetGravesType => {
  let { data, error } = useSWR<Array<Grave> | undefined, Error>(
    `${ORIGIN}${API_V1_GRAVES}`,
    client as ClientAction<Grave[] | undefined>
  );

  data = strip(data)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
