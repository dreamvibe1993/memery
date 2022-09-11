import { observable, action, makeAutoObservable } from "mobx";

const PaginationProps = {
    page: observable,
    limit: observable,
    setPage: action.bound,
    setNextPage: action.bound,
    setFirstPage: action.bound,
    setLimit: action.bound,
    setName: action.bound,
  };
  export class PaginationParams {
    page: number;
    limit: number;
  
    constructor(page: number, limit: number) {
      makeAutoObservable(this, PaginationProps);
      this.page = page;
      this.limit = limit;
    }
  
    setPage(page: number): void {
      this.page = page;
    }
    setNextPage(): void {
      this.page += 1;
    }
    setFirstPage(): void {
      this.page = 1;
    }
    setLimit(limit: number): void {
      if (this.limit === limit) return;
      this.limit = limit;
    }
  }