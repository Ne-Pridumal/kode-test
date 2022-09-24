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

type actionType = setPeople | setState | setSearch | setFilter | setDepartment

const initState: WorkspaceState = {
  people: null,
  state: WorkspaceStateLoading.loading,
  search: '',
  department: EWorkspaceDepartments.all,
  filter: EFilter.alphabet
}

export const workspaceReducer = (state = initState, action: actionType): WorkspaceState => {
  const { type, payload } = action
  switch (type) {
    case WorkspaceAction.SET_PEOPLE:
      return { ...state, people: payload }

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
