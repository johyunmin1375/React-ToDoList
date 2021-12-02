import { useState, useCallback } from "react";
import { MdAdd } from "react-icons/md";
import './TodoInsert.scss';

const TodoInsert = () => {
    const [value, setValue] = useState('');

    // 컴포넌트가 리렌더링될 때 함수를 새로 만드는 것이 아닌 재사용 가능한 useCallback Hook 사용
    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    return(
        <form className="TodoInsert">
            <input placeholder="할 일을 입력하세요" value={value} onChange={onChange} />
            <button type="submit">
                <MdAdd/>
            </button>
        </form>
    );
};

export default TodoInsert;