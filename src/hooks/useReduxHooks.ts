import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/routers";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
