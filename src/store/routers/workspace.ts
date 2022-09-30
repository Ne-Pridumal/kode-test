import { EWorkspaceDepartments } from '../../types/Department'
import { EFilter } from '../../types/EFilter'
import { IPerson } from '../../types/IPerson'
import { WorkspaceState, WorkspaceStateLoading } from '../../types/WorkspaceState'

export enum WorkspaceAction {
  SET_PEOPLE = 'workspace/SET_PEOPLE',
  SET_STATE = 'workspace/SET_STATE',
  SET_SEARCH = 'workspace/SET_SEARCH',
  SET_DEPARTMENT = 'workspace/SET_DEPARTMENT',
  SET_FILTER = 'workspace/SET_FILTER',
  SET_SEARCH_RESULT = 'workspace/SET_SEARCH_RESULT',
  SET_FILTER_DISPLAY = 'workspace/SET_FILTER_DISPLAY'
}

interface setPeople {
  type: WorkspaceAction.SET_PEOPLE,
  payload: IPerson[] | null
}
interface setState {
  type: WorkspaceAction.SET_STATE,
  payload: WorkspaceStateLoading
}
interface setFilter {
  type: WorkspaceAction.SET_FILTER,
  payload: {
    filter: EFilter,
    sortedPeople: IPerson[]
  }
}
interface setDepartment {
  type: WorkspaceAction.SET_DEPARTMENT,
  payload: EWorkspaceDepartments
}
interface setSearchResult {
  type: WorkspaceAction.SET_SEARCH_RESULT,
  payload: {
    filteredPeople: IPerson[] | null,
    searchInput: string
  }
}
interface setFilterDiplay {
  type: WorkspaceAction.SET_FILTER_DISPLAY,
  payload: boolean
}

export type WorkspaceActionType = setPeople | setState | setFilter | setDepartment | setSearchResult | setFilterDiplay

const initState: WorkspaceState = {
  people: null,
  state: WorkspaceStateLoading.loading,
  department: EWorkspaceDepartments.all,
  filter: EFilter.alphabet,
  searchResult: null,
  searchInput: '',
  displayFilter: false,
}

export const workspaceReducer = (state = initState, action: WorkspaceActionType): WorkspaceState => {
  const { type, payload } = action
  switch (type) {
    case WorkspaceAction.SET_PEOPLE:
      return { ...state, people: payload }

    case WorkspaceAction.SET_STATE:
      return { ...state, state: payload }

    case WorkspaceAction.SET_FILTER:
      return {
        ...state,
        filter: payload.filter,
        people: payload.sortedPeople,
      }

    case WorkspaceAction.SET_DEPARTMENT:
      return { ...state, department: payload }

    case WorkspaceAction.SET_SEARCH_RESULT:
      return {
        ...state,
        searchResult: payload.filteredPeople,
        searchInput: payload.searchInput
      }

    case WorkspaceAction.SET_FILTER_DISPLAY:
      return { ...state, displayFilter: payload }
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
export const setDepartment = (department: EWorkspaceDepartments): setDepartment => ({
  type: WorkspaceAction.SET_DEPARTMENT,
  payload: department
})
export const setFilterDiplay = (state: boolean): setFilterDiplay => ({
  type: WorkspaceAction.SET_FILTER_DISPLAY,
  payload: state
})
