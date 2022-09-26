import { Dispatch } from 'react'
import { RootState } from '.'
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
  SET_SEARCH_RESULT = 'workspace/SET_SEARCH_RESULT'
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
  payload: IPerson[] | null
}

export type WorkspaceActionType = setPeople | setState | setFilter | setDepartment | setSearchResult

const initState: WorkspaceState = {
  people: null,
  state: WorkspaceStateLoading.loading,
  department: EWorkspaceDepartments.all,
  filter: EFilter.alphabet,
  searchResult: null,
}

export const workspaceReducer = (state = initState, action: WorkspaceActionType): WorkspaceState => {
  const { type, payload } = action
  switch (type) {
    case WorkspaceAction.SET_PEOPLE:
      return { ...state, people: payload }

    case WorkspaceAction.SET_STATE:
      return { ...state, state: payload }

    case WorkspaceAction.SET_FILTER:
      return { ...state, filter: payload.filter, people: payload.sortedPeople }

    case WorkspaceAction.SET_DEPARTMENT:
      return { ...state, department: payload }

    case WorkspaceAction.SET_SEARCH_RESULT:
      return { ...state, searchResult: payload }

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
export const setSearchResult = (search: string) => (dispatch: Dispatch<WorkspaceActionType>, getState: () => RootState) => {
  const state = getState()
  let filteredPeople
  if (state.workspace.people) {
    filteredPeople = state.workspace.people?.filter((person: IPerson) => {
      const personFullName = `${person.firstName} ${person.lastName}`
      if (personFullName.includes(search) || person.phone.includes(search)) {
        return person
      }
    })
  }
  else {
    filteredPeople = state.workspace.people
  }

  dispatch({
    type: WorkspaceAction.SET_SEARCH_RESULT,
    payload: filteredPeople
  })
}
export const filterByParam = (param: EFilter) => (dispatch: Dispatch<WorkspaceActionType>, getState: () => RootState) => {
  const state = getState()
  const people = state.workspace.people
  if (!people) {
    throw new Error('no people')
  }
  let sortedPeople
  if (param === EFilter.alphabet) {
    sortedPeople = people.sort((a: IPerson, b: IPerson) => {
      const aPersonFullName = a.firstName + a.lastName
      const bPersonFullName = b.firstName + b.lastName
      return (
        aPersonFullName > bPersonFullName
          ? 1
          : bPersonFullName > aPersonFullName
            ? -1
            : 0
      )
    })
  }
  if (param === EFilter.birthday) {
    sortedPeople = people.sort((a: IPerson, b: IPerson) => a.birthday > b.birthday
      ? 1
      : b.birthday > a.birthday
        ? -1
        : 0)
  }
  else {
    sortedPeople = people
  }
  console.log({ 'sortedPeople': sortedPeople })
  dispatch({
    type: WorkspaceAction.SET_FILTER,
    payload: {
      filter: param,
      sortedPeople
    }
  })
}
