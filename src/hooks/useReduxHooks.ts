import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "../store/routers";
import * as QueriesActions from '../store/queries'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => {
  const dispatch = useDispatch()
  return bindActionCreators(QueriesActions, dispatch)
}
