import { graveModel } from "../../../models/grave/grave";
import { Grave } from "../../../types/Grave";
import { mapDateTo } from "../date/mapDateToDDMMYYYY";

export const convertGraveToFrontDTO = (grave: any): Grave | null => {
  if (!grave) return null;
  for (let key in graveModel) {
    if (!grave[key]) {
      grave[key] = graveModel[key as keyof Grave];
    }
  }
  grave.born = mapDateTo("DDMMYYYY", grave?.born);
  grave.died = mapDateTo("DDMMYYYY", grave?.died);
  return grave;
};
