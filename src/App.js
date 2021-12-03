import { useState, useRef, useCallback } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoTemplate from './components/TodoTemplate';
import TodoList  from './components/TodoList';

function createBulkTodos(){
  const array = [];
  for(let i = 1; i <= 2500; i++){
    array.push({
      id:i,
      text: `할 일${i}`,
      checked : false,
    });
  }
  return array;
}

const App = () =>{
  const [todos, setTodos] = useState(createBulkTodos);
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text : '리액트의 기초 알아보기',
  //     checked : true,
  //   },
  //   {
  //     id: 2,
  //     text : '컴포넌트 스타일링해 보기',
  //     checked : true,
  //   },
  //   {
  //     id: 3,
  //     text : '일정 관리 앱 만들어 보기',
  //     checked : false,
  //   }
  // ]);

  //고유 값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nexId = useRef(2501);

  const onInsert = useCallback(
    text => {
      const todo = {
        id : nexId.current,
        text,
        checked : false,
      };
      setTodos(todos.concat(todo));
      nexId.current +=1; // nextId 1씩 더하기
    },
    [todos],
  );

  // todos 배열에서 id로 항목 지우기
  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !==id));
    },
    [todos],
  );

  // 수정 기능
  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
          // todo.id와 현재 파라미터로 사용된 id 값이 같을 때 처음 받아 왔던 상태 그래도 반환
          todo.id === id ? { ...todo, checked: !todo.checked} : todo,
          ),
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos ={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
}

export default App;
