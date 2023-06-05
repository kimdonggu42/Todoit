import styled from "styled-components";
import TodoList from "./TodoList";

const TodoMainContainer = styled.div`
  width: calc(100vw - 45rem);
  font-size: 1rem;
`;

function TodoMain() {
  return (
    <TodoMainContainer>
      TodoMain
      <TodoList />
    </TodoMainContainer>
  );
}

export default TodoMain;
