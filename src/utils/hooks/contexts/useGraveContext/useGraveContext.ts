import { useContext } from "react";
import { GraveContext } from "../../../../contexts/grave/grave-context";

export const useGraveContext = () => {
  return useContext(GraveContext);
};
