import { action, observable } from "mobx";
import debounce from "../../../../utils/optimization/debouncer/debouncer";
import { PaginationParams } from "../../common/classes/PaginationParams/PaginationParams";
import { QueryParams } from "../../common/classes/QueryParams/QueryParams";

export const ListLoaderProps = {
  hasMore: observable,
  list: observable,
  isLoading: observable,
  isError: observable,
  isEmpty: observable,
  error: observable,
  pagination: observable,
  queries: observable,

  load: action.bound,
  returnUniqueEntries: action.bound,
  setEmptiness: action.bound,
  setLoadingStart: action.bound,
  setLoadingFinish: action.bound,
  setError: action.bound,
  strip: action.bound,
  reload: action.bound,
  setHasMore: action.bound,
  setList: action.bound,
};

export class ListsLoader<T extends { _id: string }> {
  pagination: PaginationParams;
  queries: QueryParams;
  list: T[] = [];
  hasMore: boolean = true;
  isEmpty?: boolean;
  isLoading: boolean = false;
  isError: boolean = false;
  error?: Error;

  constructor(pagination: PaginationParams, queries: QueryParams) {
    this.pagination = pagination;
    this.queries = queries;
  }

  async loader(client: () => Promise<any>) {
    if (!this.hasMore) {
      return console.warn("There is no more items.");
    }
    if (this.list.length < 1) {
      this.pagination.setFirstPage();
    }
    debounce(async () => {
      try {
        this.setLoadingStart();
        const data = await client();
        const newItems = this.strip(data);
        const uniqueItems = this.returnUniqueEntries([
          ...this.list,
          ...newItems,
        ]);
        this.setEmptiness(!!!uniqueItems.length);
        this.setHasMore(data.has_more);
        this.setList(uniqueItems);
        if (newItems.length > 0) {
          this.pagination.setNextPage();
        }
      } catch (e) {
        this.setError(e);
      } finally {
        this.setLoadingFinish();
      }
    }, 300);
  }

  setList(list: T[]) {
    this.list = list;
  }

  setHasMore(isMore: boolean) {
    this.hasMore = isMore;
  }

  private returnUniqueEntries(arr: T[]): T[] {
    return arr.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t._id === value._id)
    );
  }

  private setEmptiness(isEmpty: boolean) {
    this.isEmpty = isEmpty;
  }

  async reload(): Promise<void> {
    this.pagination.setFirstPage();
    this.setList([]);
    this.setHasMore(true);
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

  private strip(data: any): Array<any> {
    if (data?.graves) data = data.graves;
    return data;
  }
}
