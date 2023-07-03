import GlobalStyle from "./assets/style/globalStyle";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TodoMain from "./pages/main/TodoMain";
import Spinner from "./components/Spinner";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { ToastAlert } from "./assets/style/toastStyle";

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
