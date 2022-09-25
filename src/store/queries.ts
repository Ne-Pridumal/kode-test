import axios from "axios"
import { Dispatch } from "react"
import { IPerson } from "../types/IPerson"
import { setPeople, WorkspaceActionType } from "./routers/workspace"

export const peopleQuery = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await axios.get('https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__dynamic=true')
      dispatch(setPeople(response.data.items))
    }
    catch (e) {
      alert(e)
      dispatch(setPeople(null))
    }
  }
}
