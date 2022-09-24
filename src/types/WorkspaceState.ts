import { EWorkspaceDepartments } from "./Department";
import { EFilter } from "./EFilter";
import { IPerson } from "./IPerson";

export enum WorkspaceStateLoading {
  loading = 'LOADING',
  success = 'SUCCESSS',
  crashed = 'CRASHED',
}
export interface WorkspaceState {
  people: IPerson[] | null,
  state: WorkspaceStateLoading,
  search: string,
  department: EWorkspaceDepartments,
  filter: EFilter
}
