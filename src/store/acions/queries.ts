import axios from "axios"
import { EWorkspaceDepartments } from "../../types/Department"
import { EFilter } from "../../types/EFilter"
import { IPerson } from '../../types/IPerson'
import { WorkspaceStateLoading } from "../../types/WorkspaceState"
import { RootState } from "../routers"
import { setDepartment, setPeople, setWorkspaceState } from "../routers/workspace"
import { filterByParam, filterBySearch } from "./workspaceActions"

interface IResponse {
  items: IPerson[]
}

export const allPeopleQuery = () => {
  return async (dispatch: any, useState: () => RootState) => {
    const { filter } = useState().workspace
    try {
      dispatch(setWorkspaceState(WorkspaceStateLoading.loading))
      const response = await axios.get<IResponse>(
        'https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users', {
        params: { __dynamic: true }
      })
      dispatch(setDepartment(EWorkspaceDepartments.all))
      dispatch(setPeople(response.data.items))
      dispatch(filterByParam(filter))
      dispatch(filterBySearch(undefined))
      dispatch(setWorkspaceState(WorkspaceStateLoading.success))
    }
    catch (e) {
      dispatch(setPeople(null))
      dispatch(setWorkspaceState(WorkspaceStateLoading.crashed))
    }
  }
}

export const peopleDepartmentQuery = (department: EWorkspaceDepartments) => {
  return async (dispatch: any, useState: () => RootState) => {
    const { filter } = useState().workspace
    try {
      dispatch(setWorkspaceState(WorkspaceStateLoading.loading))
      const response = await axios.get<IResponse>('https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users', {
        params: { __dynamic: true, __example: department }
      })
      dispatch(setDepartment(department))
      dispatch(setPeople(response.data.items))
      dispatch(filterByParam(filter))
      dispatch(filterBySearch(undefined))
      dispatch(setWorkspaceState(WorkspaceStateLoading.success))
    }
    catch (e) {
      dispatch(setPeople(null))
      dispatch(setWorkspaceState(WorkspaceStateLoading.crashed))
    }
  }
}

