import axios from "axios"
import { EWorkspaceDepartments } from "../../types/Department"
import { EFilter } from "../../types/EFilter"
import { IPerson } from '../../types/IPerson'
import { WorkspaceState, WorkspaceStateLoading } from "../../types/WorkspaceState"
import { RootState } from "../routers"
import { setDefaultDetailsValue } from "../routers/details"
import { setDepartment, setPeople, setWorkspaceState } from "../routers/workspace"
import { filterByParam } from "./workspaceActions"
import { WORKSPACE_STORAGE_NAME } from '../../types/consts'

interface IResponse {
  items: IPerson[]
}
interface ILocalStorage {
  people: IPerson[]
}

const saveDateLocaly = (name: string, timeMS: number, data: object) => {
  const timer = Date.now() + timeMS
  const localData = { ...data, timer }
  localStorage.setItem(name, JSON.stringify(localData))
}

export const allPeopleQuery = () => {
  return async (dispatch: any, useState: () => RootState) => {
    const state = useState().workspace
    try {
      dispatch(setWorkspaceState(WorkspaceStateLoading.loading))
      const response = await axios.get<IResponse>(
        'https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users', {
        params: { __dynamic: true, __example: 'all' }
      })
      dispatch(setDepartment(EWorkspaceDepartments.all))
      dispatch(setPeople(response.data.items))
      dispatch(filterByParam(state.filter))
      dispatch(setWorkspaceState(WorkspaceStateLoading.success))

      saveDateLocaly(WORKSPACE_STORAGE_NAME, 300000, { people: response.data.items })
      return;
    }
    catch (e) {
      const localDataString = localStorage.getItem(WORKSPACE_STORAGE_NAME)
      dispatch(setWorkspaceState(WorkspaceStateLoading.crashed))
      dispatch(setDepartment(EWorkspaceDepartments.all))
      if (!localDataString) {
        dispatch(setPeople(null))
        return;
      }
      const localData: ILocalStorage = JSON.parse(localDataString)
      dispatch(setPeople(localData.people))
      return;
    }
  }
}

export const peopleDepartmentQuery = (department: EWorkspaceDepartments) => {
  return async (dispatch: any, useState: () => RootState) => {
    const state = useState().workspace
    try {
      dispatch(setWorkspaceState(WorkspaceStateLoading.loading))
      const response = await axios.get<IResponse>('https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users', {
        params: { __dynamic: true, __example: department }
      })
      dispatch(setDepartment(department))
      dispatch(setPeople(response.data.items))
      dispatch(filterByParam(state.filter))
      dispatch(setWorkspaceState(WorkspaceStateLoading.success))

      saveDateLocaly(WORKSPACE_STORAGE_NAME, 300000, { people: state.people })
      return;
    }
    catch (e) {
      const localDataString = localStorage.getItem(WORKSPACE_STORAGE_NAME)
      dispatch(setWorkspaceState(WorkspaceStateLoading.crashed))
      dispatch(setDepartment(department))
      if (!localDataString) {
        dispatch(setPeople(null))
        return;
      }
      const localData: ILocalStorage = JSON.parse(localDataString)
      console.log(localData)
      let filterdByDepartmentList
      if (department !== EWorkspaceDepartments.all) {
        filterdByDepartmentList = localData?.people
          ? localData.people.filter(p => p.department === `${department}`)
          : null
      }
      else {
        filterdByDepartmentList = localData.people
      }
      dispatch(setPeople(filterdByDepartmentList))
      return;
    }
  }
}

export const peopleIdQuery = (id: string) => {
  return async (dispatch: any, useState: () => RootState) => {
    try {
      dispatch(setWorkspaceState(WorkspaceStateLoading.loading))
      const response = await axios.get<IResponse>('https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users', {
        params: { id, __dynamic: true }
      })
      dispatch(setDefaultDetailsValue(response.data.items[0]))
      dispatch(setWorkspaceState(WorkspaceStateLoading.success))
    }
    catch (e) {
      const localDataString = localStorage.getItem(WORKSPACE_STORAGE_NAME)
      dispatch(setWorkspaceState(WorkspaceStateLoading.crashed))
      if (!localDataString) {
        dispatch(setPeople(null))
        return;
      }
      const localData: ILocalStorage = JSON.parse(localDataString)
      const person = localData.people.find(p => p.id === id)
      if (person) {
        dispatch(setDefaultDetailsValue(person))
      }
      return;
    }
  }
}
