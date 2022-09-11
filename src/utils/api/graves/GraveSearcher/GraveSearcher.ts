import { action, makeAutoObservable, observable } from "mobx";
import { API_V1_GRAVES } from "../../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../../configs/urls/app/app-urls";
import { GraveStore } from "../../../../store/mobx/graves/graves";
import { Grave } from "../../../../types/Grave";
import { IGraveListData } from "../../../../types/interfaces/graves/statuses/IGraveListData";
import { IGraveListStatus } from "../../../../types/interfaces/graves/statuses/IGraveListStatus";
import debounce from "../../../optimization/debouncer/debouncer";
import { client } from "../../client/client";

const GraveSearcherProps = {
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
  reload: action.bound,
};

export class GraveSearcher implements IGraveListStatus, IGraveListData {
  list: Grave[] = [];
  hasMore: boolean = true;
  isEmpty?: boolean | undefined;
  isLoading: boolean = false;
  isError: boolean = false;
  error?: Error | undefined;

  name: string = "";
  page: number = 1;
  limit: number = 0;

  constructor() {
    makeAutoObservable(this, GraveSearcherProps);
  }

  private async searchGraves() {
    if (!this.hasMore) {
      return console.warn("There is no more graves for search!");
    }
    if (this.list.length < 1) {
      this.setFirstPage();
    }
    try {
      this.setLoadingStart();
      const data = await client(
        `${ORIGIN}${API_V1_GRAVES}/paginate?page=${this.page}&limit=${this.limit}&name=${this.name}`
      );
      const foundGraves = this.strip(data);
      const uniqueGraves = this.returnUniqueEntries([
        ...this.list,
        ...foundGraves,
      ]);
      this.hasMore = data.has_more;
      this.list = uniqueGraves;
    } catch (e) {
      this.setError(e);
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

  private setThereIsMore(): void {
    this.hasMore = true;
  }

  setName(name: string): void {
    this.name = name;
    debounce(async () => {
      await this.searchGraves();
    });
  }

  setNextPage(): void {
    this.page += 1;
  }

  async reload(): Promise<void> {
    this.setFirstPage();
    this.setThereIsMore();
  }

  setFirstPage(): void {
    this.page = 1;
  }

  setLimit(limit: number): void {
    if (this.limit === limit) return;
    this.limit = limit;
  }

  private setLoadingStart(): void {
    this.isLoading = true;
  }

  private setLoadingFinish(): void {
    this.isLoading = false;
  }

  private setError(e: any): void {
    this.isError = true;
    this.error = e;
  }

  private strip(data: any): Array<Grave> {
    if (data?.graves) data = data.graves;
    return data;
  }
}
