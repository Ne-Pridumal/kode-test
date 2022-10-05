import { IPerson } from "../../types/IPerson"

export enum DetailsActions {
  SET_DEFAULT_VALUE = 'details/SET_DEFAULT_VALUE'
}


type DetailsState = Partial<IPerson>

const initState: DetailsState = {
  id: undefined,
  avatarUrl: undefined,
  birthday: undefined,
  department: undefined,
  firstName: undefined,
  lastName: undefined,
  phone: undefined,
  position: undefined,
  userTag: undefined
}

interface setDefaultValue {
  type: DetailsActions.SET_DEFAULT_VALUE,
  payload: IPerson
}

export type DetailsActionType = setDefaultValue

export const detailsReducer = (state = initState, action: DetailsActionType) => {
  const { payload, type } = action
  switch (type) {
    case DetailsActions.SET_DEFAULT_VALUE:
      return { ...state, ...payload }

    default:
      return state
  }
}

export const setDefaultDetailsValue = (payload: IPerson): setDefaultValue => ({
  type: DetailsActions.SET_DEFAULT_VALUE,
  payload
})
