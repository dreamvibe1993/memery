import { action, makeObservable } from "mobx";
import { API_V1_GRAVES } from "../../../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../../../configs/urls/app/app-urls";
import { Grave } from "../../../../../types/Grave";
import { client } from "../../../../../utils/api/client/client";
import { PaginationParams } from "../../../common/classes/PaginationParams/PaginationParams";
import { QueryParams } from "../../../common/classes/QueryParams/QueryParams";
import { ListLoaderProps, ListsLoader } from "../../api/getGravesModel";

const SearcherProps = {
  load: action.bound,
};

export class Searcher extends ListsLoader<Grave> {
  constructor(pagination: PaginationParams, queries: QueryParams) {
    super(pagination, queries);
    makeObservable(this, { ...SearcherProps, ...ListLoaderProps });
  }
  load = async () =>
    this.loader(async () => {
      return client(
        `${ORIGIN}${API_V1_GRAVES}/paginate?page=${this.pagination.page}&limit=${this.pagination.limit}&name=${this.queries.name}`
      );
    });
}
