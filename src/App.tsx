import GlobalStyle from "./assets/style/globalStyle";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TodoMain from "./pages/main/TodoMain";
import Spinner from "./components/Spinner";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const ToastAlert = styled(ToastContainer)`
  .Toastify__toast--success {
    color: white;
    font-size: 1rem;
    background-color: #00bc06;
  }

  .Toastify__progress-bar--success {
    background-color: #c4ebc0;
  }

  .Toastify__toast--error {
    color: white;
    font-size: 1rem;
    background-color: #e74d3e;
  }

  .Toastify__progress-bar--error {
    background-color: #faccc6;
  }

  .Toastify__toast-icon {
    display: none;
  }

  .Toastify__close-button {
    color: white;
  }
`;

function App() {
  const { user, isAuthReady }: any = useContext(AuthContext);

  return (
    <div className='App'>
      <GlobalStyle />
      {isAuthReady ? (
        <Routes>
          <Route path='/' element={user ? <TodoMain /> : <Navigate to='/login' replace={true} />} />
          <Route path='/login' element={user ? <Navigate to='/' replace={true} /> : <Login />} />
          <Route path='/signup' element={user ? <Navigate to='/' replace={true} /> : <Signup />} />
        </Routes>
      ) : (
        <Spinner />
      )}
      <ToastAlert hideProgressBar={false} autoClose={2000} pauseOnFocusLoss={true} />
    </div>
  );
}

export default App;
