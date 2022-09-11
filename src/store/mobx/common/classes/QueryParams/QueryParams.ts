import { observable, makeAutoObservable } from "mobx";

const QueryParamsProps = {
  name: observable,
};
export class QueryParams {
  name?: string;
  constructor(name?: string) {
    makeAutoObservable(this, QueryParamsProps);
    this.name = name;
  }

  setName(name: string): void {
    this.name = name;
  }
}
