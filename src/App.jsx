import {createBrowserRouter,RouterProvider} from 'react-router-dom';

import './App.css';
import RootLayout from './pages/Root/Root';
import Dashboard from './pages/Dashboard/Dashboard';
import TeamMembers from './pages/TeamMembers/TeamMembers'
import Training from './pages/Training/Training';
import WFO from './pages/WFO/WFO';

const router=createBrowserRouter([
  {
    path:'/Team-Service-UI/', 
    element:<RootLayout />,
    children:[
      {index:true, element:<Dashboard />},
      {path:'teammembers', element:<TeamMembers />},
      {path:'wfo', element:<WFO />},
      {path:'training', element:<Training/>}
    ],
  },
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
