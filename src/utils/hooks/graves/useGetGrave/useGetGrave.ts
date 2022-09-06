import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_V1_GRAVES } from "../../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../../configs/urls/app/app-urls";
import { Grave } from "../../../../types/Grave";
import { client } from "../../../api/client/client";
import debounce from "../../../optimization/debouncer/debouncer";

export type useGetGraveReturnType = {
  grave: Grave | undefined;
  isLoading: boolean;
  isError: boolean;
  refreshGrave: () => void;
};

export const useGetGrave = () => {
  const params = useParams<{ id: string }>();

  const [grave, setGrave] = useState<Grave>();
  const [error, setError] = useState<Error>();

  const refreshGrave = useCallback((): void => {
    if (!params.id) return;
    setGrave(undefined);
    debounce(() => {
      client(`${ORIGIN}${API_V1_GRAVES}/${params.id}`)
        .then((data: { grave: Grave }) => setGrave(data.grave))
        .catch((e) => {
          console.error(e);
          setError(e);
        });
    });
  }, [params.id]);

  useEffect(() => {
    refreshGrave();
  }, [refreshGrave]);

  return { grave, isLoading: !grave && !error, isError: !!error, refreshGrave };
};
