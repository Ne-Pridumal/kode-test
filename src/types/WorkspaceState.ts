import { EWorkspaceDepartments } from "./Department";
import { EFilter } from "./EFilter";
import { IPerson } from "./IPerson";

export enum WorkspaceStateLoading {
  loading = 'LOADING',
  success = 'SUCCESS',
  crashed = 'CRASHED',
}
export interface WorkspaceState {
  people: IPerson[] | null,
  state: WorkspaceStateLoading,
  department: EWorkspaceDepartments,
  filter: EFilter,
  searchResult: IPerson[] | null,
  searchInput: string,
  displayFilter: boolean,
}
