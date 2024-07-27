import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import React from 'react';
import './App.css';
import RootLayout from './pages/Root/Root';
import Dashboard from './pages/Dashboard/Dashboard';
import TeamMembers from './pages/TeamMembers/TeamMembers'
import Training from './pages/Training/Training';
import WFO from './pages/WFO/WFO';
import LoginPage from './pages/Login/Login'; 

const router = createBrowserRouter([
  {
    path: '/login', 
    element: <LoginPage />,
  },
  {
    path: '/Team-Service-UI/',
    element: <RootLayout />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'teammembers', element: <TeamMembers /> },
      { path: 'wfo', element: <WFO /> },
      { path: 'training', element: <Training /> }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;


