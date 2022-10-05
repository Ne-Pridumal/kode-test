import { combineReducers } from "redux";
import { detailsReducer } from "./details";
import { workspaceReducer } from "./workspace";

const rootReducer = combineReducers({
  workspace: workspaceReducer,
  details: detailsReducer,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
