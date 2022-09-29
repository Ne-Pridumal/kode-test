import { Dispatch } from "redux"
import { EFilter } from "../../types/EFilter"
import { IPerson } from "../../types/IPerson"
import { RootState } from "../routers"
import { WorkspaceAction, WorkspaceActionType } from "../routers/workspace"


export const filterBySearch = (search: string | undefined) => (dispatch: Dispatch<WorkspaceActionType>, getState: () => RootState) => {
  const state = getState()
  let filteredPeople, searchInput
  if (state.workspace.people && search) {
    searchInput = search
    filteredPeople = state.workspace.people.filter((person: IPerson) => {
      const personFullName = `${person.firstName} ${person.lastName}`
      if (personFullName.includes(search) || person.phone.includes(search)) {
        return person
      }
    })
  }
  else {
    searchInput = ''
    filteredPeople = null
  }

  dispatch({
    type: WorkspaceAction.SET_SEARCH_RESULT,
    payload: { filteredPeople, searchInput },
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
  dispatch({
    type: WorkspaceAction.SET_FILTER,
    payload: {
      filter: param,
      sortedPeople
    }
  })
}
