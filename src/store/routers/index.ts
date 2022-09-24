import { combineReducers } from "redux";
import { workspaceReducer } from "./workspace";

const rootReducer = combineReducers({
  workspace: workspaceReducer,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
