import GlobalStyle from "./assets/style/globalStyle";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainPage from "./pages/MainPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  const { user, isAuthReady }: any = useContext(AuthContext);

  return (
    <div className='App'>
      <GlobalStyle />
      {isAuthReady ? (
        <Routes>
          {/* 로그인 되어 있는 경우 home(todo)으로, 로그인 되어 있지 않다면 로그인 페이지로 리다이렉트 */}
          <Route path='/' element={user ? <MainPage /> : <Navigate to='/login' replace={true} />} />
          {/* 로그인 되어 있는 경우 home(todo)으로 리다이렉트(라우트 가드) */}
          <Route
            path='/login'
            element={user ? <Navigate to='/' replace={true} /> : <LoginPage />}
          />
          <Route
            path='/signup'
            element={user ? <Navigate to='/' replace={true} /> : <SignupPage />}
          />
        </Routes>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default App;
