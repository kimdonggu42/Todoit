import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { ToastAlert } from "./assets/style/toastStyle";
import { GlobalStyle } from "./assets/style/globalStyle";
import { AuthContextProvider } from "./context/AuthContext";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <AuthContextProvider>
        <BrowserRouter>
          <Router />
          <ToastAlert hideProgressBar={false} autoClose={2000} pauseOnFocusLoss={true} />
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}
