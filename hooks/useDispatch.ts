import { useDispatch as _useDispatch } from "react-redux";
import { AppDispatch } from "../store";

const useDispatch = () => _useDispatch<AppDispatch>();

export default useDispatch;
