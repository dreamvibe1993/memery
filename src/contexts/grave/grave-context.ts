import { createContext } from "react";
import { useGetGraveReturnType } from "../../utils/hooks/graves/useGetGrave/useGetGrave";

export const GraveContext = createContext({
  grave: undefined,
  isLoading: false,
  isError: false,
  refreshGrave: () => {},
} as useGetGraveReturnType);
