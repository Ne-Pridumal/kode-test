import axios from "axios"
import { Dispatch } from "react"
import { EWorkspaceDepartments } from "../types/Department"
import { IPerson } from "../types/IPerson"
import { WorkspaceStateLoading } from "../types/WorkspaceState"
import { setPeople, setWorkspaceState, WorkspaceActionType } from "./routers/workspace"

export const allPeopleQuery = () => {
  return async (dispatch: Dispatch<WorkspaceActionType>) => {
    try {
      dispatch(setWorkspaceState(WorkspaceStateLoading.loading))
      const response = await axios.get('https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users', {
        params: { __dynamic: true }
      })
      dispatch(setPeople(response.data.items))
      dispatch(setWorkspaceState(WorkspaceStateLoading.success))
    }
    catch (e) {
      dispatch(setPeople(null))
      dispatch(setWorkspaceState(WorkspaceStateLoading.crashed))
    }
  }
}
export const peopleDepartmentQuery = (department: EWorkspaceDepartments) => {
  return async (dispatch: Dispatch<WorkspaceActionType>) => {
    try {
      dispatch(setWorkspaceState(WorkspaceStateLoading.loading))
      const response = await axios.get('https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users', {
        params: { __dynamic: true, __example: department }
      })
      dispatch(setPeople(response.data.items))
      dispatch(setWorkspaceState(WorkspaceStateLoading.success))
    }
    catch (e) {
      dispatch(setPeople(null))
      dispatch(setWorkspaceState(WorkspaceStateLoading.crashed))
    }
  }
}
