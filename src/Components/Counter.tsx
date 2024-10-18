import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { decrement, increment } from "../Slices/CounterSlice";

const Counter = () => {
  const dispatch = useDispatch();
  const { value } = useSelector((state: RootState) => state.counter);
  return (
    <div>
      <p>{value}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};
export default Counter;
