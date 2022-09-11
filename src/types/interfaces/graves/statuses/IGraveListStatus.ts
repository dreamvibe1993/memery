export interface IGraveListStatus {
  isEmpty?: boolean;
  isLoading: boolean;
  isError: boolean;
  error?: Error;
}
