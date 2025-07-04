import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Routes/Home.jsx';
import Login from './Routes/Login.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import PrivateRoute from './Routes/Private/PrivateRoute.jsx';
import "./scss/index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "/", element: <PrivateRoute><Home /></PrivateRoute>},
      {path: "/login", element: <Login />},
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
