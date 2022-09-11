import { makeAutoObservable, observable } from 'mobx';
import { PaginationParams } from '../common/classes/PaginationParams/PaginationParams';
import { QueryParams } from '../common/classes/QueryParams/QueryParams';
import { Loader } from './classes/Loader/Loader';
import { Searcher } from './classes/Searcher/Searcher';

const GraveStoreProps = {
  pagination: observable,
  searcher: observable,
  loader: observable,
  queries: observable,
};
export class GraveStore {
  queries: QueryParams;
  pagination: PaginationParams;
  loader: Loader;
  searcher: Searcher;

  constructor() {
    makeAutoObservable(this, GraveStoreProps);
    this.pagination = new PaginationParams(1, 0);
    this.queries = new QueryParams();
    this.searcher = new Searcher(this.pagination, this.queries);
    this.loader = new Loader(this.pagination, this.queries);
  }
}

export default new GraveStore();
