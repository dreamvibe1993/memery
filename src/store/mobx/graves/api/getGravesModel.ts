import { action, makeAutoObservable, observable } from "mobx";
import { API_V1_GRAVES } from "../../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../../configs/urls/app/app-urls";
import { Grave } from "../../../../types/Grave";
import { client } from "../../../../utils/api/client/client";
import debounce from "../../../../utils/optimization/debouncer/debouncer";
import { GraveStore } from "../graves";

export type GetGravesProps = {
  query: string;
};

const GetGravesModelProps = {
  page: observable,
  limit: observable,
  name: observable,
  hasMoreToLoad: observable,
  hasMoreToSearch: observable,
  gravesList: observable,
  searchList: observable,
  isLoading: observable,
  isError: observable,
  isEmpty: observable,
  graveStore: observable,

  getGraves: action.bound,
  loadGraves: action.bound,
  searchGraves: action.bound,
  returnUniqueEntries: action.bound,
  setEmptiness: action.bound,
  emptyGravesList: action.bound,
  emptySearchList: action.bound,
  setThereIsMore: action.bound,
  setNextPage: action.bound,
  setFirstPage: action.bound,
  setLimit: action.bound,
  setLoadingStart: action.bound,
  setLoadingFinish: action.bound,
  setError: action.bound,
  strip: action.bound,
};

export class GetGravesModel {
  private page: number = 1;
  private limit: number = 0;
  private name?: string = "";
  private hasMoreToLoad: boolean = true;
  private hasMoreToSearch: boolean = true;
  private gravesList: Grave[] = [];
  private searchList: Grave[] = [];
  isLoading: boolean = false;
  isError: boolean = false;
  isEmpty: boolean | undefined = undefined;
  private graveStore: GraveStore;

  constructor(graveStore: GraveStore) {
    makeAutoObservable(this, GetGravesModelProps);
    this.graveStore = graveStore;
  }

  private async loadGraves() {
    if (!this.hasMoreToLoad) {
      return console.warn("There is no more graves.");
    }
    if (this.gravesList.length < 1) {
      this.setFirstPage();
    }
    try {
      this.setLoadingStart();
      const data = await client(
        `${ORIGIN}${API_V1_GRAVES}/paginate?page=${this.page}&limit=${this.limit}`
      );
      const newGraves = this.strip(data);
      const uniqueGraves = this.returnUniqueEntries([
        ...this.gravesList,
        ...newGraves,
      ]);
      this.setEmptiness(!!!uniqueGraves.length);
      this.hasMoreToLoad = data.has_more;
      this.gravesList = uniqueGraves;
      this.graveStore.setGravesList(this.gravesList);
    } catch (e) {
      this.setError();
    } finally {
      this.setLoadingFinish();
    }
  }

  private async searchGraves() {
    if (!this.hasMoreToSearch) {
      return console.warn("There is no more graves for search!");
    }
    if (this.searchList.length < 1) {
      this.setFirstPage();
    }
    try {
      this.setLoadingStart();
      const data = await client(
        `${ORIGIN}${API_V1_GRAVES}/paginate?page=${this.page}&limit=${this.limit}&name=${this.name}`
      );
      const foundGraves = this.strip(data);
      const uniqueGraves = this.returnUniqueEntries([
        ...this.searchList,
        ...foundGraves,
      ]);
      this.hasMoreToSearch = data.has_more;
      this.searchList = uniqueGraves;
      this.graveStore.setSearchList(this.searchList);
    } catch (e) {
      this.setError();
    } finally {
      this.setLoadingFinish();
    }
  }

  private returnUniqueEntries(arr: Grave[]): Grave[] {
    return arr.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t._id === value._id)
    );
  }

  private setEmptiness(isEmpty: boolean) {
    this.isEmpty = isEmpty;
  }

  private emptyGravesList(): void {
    this.gravesList = [];
  }

  private emptySearchList(): void {
    this.searchList = [];
  }

  private setThereIsMore(what: "toLoad" | "toSearch"): void {
    if (what === "toLoad") {
      this.hasMoreToLoad = true;
    }
    if (what === "toSearch") {
      this.hasMoreToSearch = true;
    }
  }

  setNextPage(): void {
    this.page += 1;
    this.getGraves({ name: this.name });
  }

  getGraves(props: { name?: string }): void {
    const { name } = props;
    this.name = name;
    const searchMode = !!this.name;

    debounce(() => {
      if (searchMode) {
        this.emptyGravesList();
        this.setThereIsMore("toLoad");
        this.searchGraves();
      } else {
        this.emptySearchList();
        this.setThereIsMore("toSearch");
        this.loadGraves();
      }
    }, 300);
  }

  setFirstPage(): void {
    this.page = 1;
  }

  setLimit(limit: number): void {
    if (this.limit === limit) return;
    this.limit = limit;
    this.getGraves({ name: this.name });
  }

  private setLoadingStart(): void {
    this.isLoading = true;
  }

  private setLoadingFinish(): void {
    this.isLoading = false;
  }

  private setError(): void {
    this.isError = true;
  }

  private strip(data: any): Array<Grave> {
    if (data?.graves) data = data.graves;
    return data;
  }
}
