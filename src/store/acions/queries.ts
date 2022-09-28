import axios from "axios"
import { EWorkspaceDepartments } from "../../types/Department"
import { EFilter } from "../../types/EFilter"
import { WorkspaceStateLoading } from "../../types/WorkspaceState"
import { filterByParam, setDepartment, setPeople, setWorkspaceState } from "../routers/workspace"

export const allPeopleQuery = () => {
  return async (dispatch: any) => {
    try {
      dispatch(setWorkspaceState(WorkspaceStateLoading.loading))
      const response = await axios.get('https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users', {
        params: { __dynamic: true }
      })
      dispatch(setPeople(response.data.items))
      dispatch(filterByParam(EFilter.alphabet))
      dispatch(setWorkspaceState(WorkspaceStateLoading.success))
    }
    catch (e) {
      dispatch(setPeople(null))
      dispatch(setWorkspaceState(WorkspaceStateLoading.crashed))
    }
  }
}

export const peopleDepartmentQuery = (department: EWorkspaceDepartments) => {
  return async (dispatch: any) => {
    try {
      dispatch(setWorkspaceState(WorkspaceStateLoading.loading))
      const response = await axios.get('https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users', {
        params: { __dynamic: true, __example: department }
      })
      dispatch(setPeople(response.data.items))
      dispatch(setDepartment(department))
      dispatch(filterByParam(EFilter.alphabet))
      dispatch(setWorkspaceState(WorkspaceStateLoading.success))
    }
    catch (e) {
      dispatch(setPeople(null))
      dispatch(setWorkspaceState(WorkspaceStateLoading.crashed))
    }
  }
}
