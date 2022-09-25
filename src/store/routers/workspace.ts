import { useDispatch } from 'react-redux'
import { EWorkspaceDepartments } from '../../types/Department'
import { EFilter } from '../../types/EFilter'
import { IPerson } from '../../types/IPerson'
import { WorkspaceState, WorkspaceStateLoading } from '../../types/WorkspaceState'

enum WorkspaceAction {
  SET_PEOPLE = 'workspace/SET_PEOPLE',
  SET_STATE = 'workspace/SET_STATE',
  SET_SEARCH = 'workspace/SET_SEARCH',
  SET_DEPARTMENT = 'workspace/SET_DEPARTMENT',
  SET_FILTER = 'workspace/SET_FILTER',
}

interface setPeople {
  type: WorkspaceAction.SET_PEOPLE,
  payload: IPerson[] | null
}
interface setState {
  type: WorkspaceAction.SET_STATE,
  payload: WorkspaceStateLoading
}
interface setSearch {
  type: WorkspaceAction.SET_SEARCH,
  payload: string
}
interface setFilter {
  type: WorkspaceAction.SET_FILTER,
  payload: EFilter
}
interface setDepartment {
  type: WorkspaceAction.SET_DEPARTMENT,
  payload: EWorkspaceDepartments
}

export type WorkspaceActionType = setPeople | setState | setSearch | setFilter | setDepartment

const initState: WorkspaceState = {
  people: null,
  state: WorkspaceStateLoading.loading,
  search: '',
  department: EWorkspaceDepartments.all,
  filter: EFilter.alphabet
}

export const workspaceReducer = (state = initState, action: WorkspaceActionType): WorkspaceState => {
  const { type, payload } = action
  switch (type) {
    case WorkspaceAction.SET_PEOPLE:
      if (payload !== null && payload.length > 0) {
        return { ...state, people: payload, state: WorkspaceStateLoading.success }
      }
      else {
        return { ...state, people: payload, state: WorkspaceStateLoading.crashed }
      }


    case WorkspaceAction.SET_STATE:
      return { ...state, state: payload }

    case WorkspaceAction.SET_SEARCH:
      return { ...state, search: payload }

    case WorkspaceAction.SET_FILTER:
      return { ...state, filter: payload }

    case WorkspaceAction.SET_DEPARTMENT:
      return { ...state, department: payload }
    default:
      return state
  }
}

export const setPeople = (people: IPerson[] | null): setPeople => ({
  type: WorkspaceAction.SET_PEOPLE,
  payload: people
})
export const setWorkspaceState = (state: WorkspaceStateLoading): setState => ({
  type: WorkspaceAction.SET_STATE,
  payload: state
})
export const setSearch = (search: string): setSearch => ({
  type: WorkspaceAction.SET_SEARCH,
  payload: search
})
export const setFilter = (filter: EFilter): setFilter => ({
  type: WorkspaceAction.SET_FILTER,
  payload: filter
})
export const setDepartment = (department: EWorkspaceDepartments): setDepartment => ({
  type: WorkspaceAction.SET_DEPARTMENT,
  payload: department
})
