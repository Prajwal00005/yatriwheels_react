import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { increaseCounter, decreaseCounter } from "./slice";
import { testThunk } from "./slice";
import axios from "axios";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";

// export default function Test() {
//     const [count, setCount] = useState<number>(0);


//     return <div >
//         <IncreaseButton onClick={() => {
//             setCount((prev) => ++prev);
//         }} />
//         <DisplayCount count={count} />
//         <DecreaseButton onClick={() => {
//             setCount((prev) => --prev);
//         }} />
//     </div>;
// }
// interface IncreaseButtonProps {
//     onClick: () => void
// }
// function IncreaseButton({ onClick }: IncreaseButtonProps) {
//     return <button onClick={onClick}>Increase</button>
// }

// interface IncreaseButtonProps {
//     onClick: () => void
// }
// function DecreaseButton({ onClick }: IncreaseButtonProps) {
//     return <div className="bg-repeat-round">
//         <DecreaseButton1 onClick={onClick} />

//     </div>
// }

// interface DecreaseButton1Props {
//     onClick: () => void
// }
// function DecreaseButton1({ onClick }: IncreaseButtonProps) {
//     return <button onClick={onClick}>Decrease</button>
// }

// interface DisplayCountProps {
//     count: number;
// }
// function DisplayCount({ count }: DisplayCountProps) {

//     return <div>{count}</div>
// }


export default function Test() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, data } = useSelector((state: RootState) => state.test)


    useEffect(() => {
        dispatch(testThunk());
    }, [dispatch])

    if (loading) {
        return <>Loading</>;
    }

    if (!data) {
        return <>error while fetcing data</>
    }

    return <div >
        <IncreaseButton />
        <DisplayCount />
        <DecreaseButton />
    </div>;
}

function IncreaseButton() {
    const dispatch = useDispatch<AppDispatch>();

    function onClick() {
        dispatch(increaseCounter())
    }
    return <button onClick={onClick}>Increase</button>
}


function DecreaseButton() {
    return <div className="bg-repeat-round">
        <DecreaseButton1 />

    </div>
}


function DecreaseButton1() {
    const dispatch = useDispatch<AppDispatch>();

    function onClick() {
        dispatch(decreaseCounter())
    }
    return <button onClick={onClick}>Decrease</button>
}


function DisplayCount() {
    const { count } = useSelector((state: RootState) => state.test);

    return <div>{count}</div>
}