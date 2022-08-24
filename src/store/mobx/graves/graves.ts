import { action, makeAutoObservable, observable } from "mobx";
import { Grave } from "../../../types/Grave";
import { GetGravesModel } from "./api/getGravesModel";

const GraveStoreProps = {
  gravesList: observable,

  setGravesList: action.bound,
  setSearchList: action.bound,
  dropGravesList: action.bound,
};

export class GraveStore {
  gravesList: Grave[] = [];
  searchList: Grave[] = [];
  api: GetGravesModel;

  constructor() {
    makeAutoObservable(this, GraveStoreProps);
    this.api = new GetGravesModel(this);
  }
  setGravesList(graves: Grave[]): void {
    this.gravesList = graves;
  }
  setSearchList(graves: Grave[]): void {
    this.searchList = graves;
  }
  dropGravesList(): void {
    this.gravesList = [];
  }
}

export default new GraveStore();
