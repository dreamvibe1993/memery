import { action, makeAutoObservable, observable } from "mobx";
import { Grave } from "../../../types/Grave";
import { GraveSearcher } from "../../../utils/api/graves/GraveSearcher/GraveSearcher";
import { GetGravesModel } from "./api/getGravesModel";

const GraveStoreProps = {
  gravesList: observable,
  searchList: observable,
  api: observable,
  searcher: observable,

  setGravesList: action.bound,
  setSearchList: action.bound,
  dropGravesList: action.bound,
};

export class GraveStore {
  gravesList: Grave[] = [];
  searchList: Grave[] = [];
  api: GetGravesModel;
  searcher: GraveSearcher

  constructor() {
    makeAutoObservable(this, GraveStoreProps);
    this.api = new GetGravesModel(this);
    this.searcher = new GraveSearcher();
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
