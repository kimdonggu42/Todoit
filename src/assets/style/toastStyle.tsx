import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastAlert = styled(ToastContainer)`
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
