import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./index";

export const useAppDispatch = useDispatch; // 👈 TAMBAH ini
export const useAppSelector = useSelector.withTypes<RootState>();
