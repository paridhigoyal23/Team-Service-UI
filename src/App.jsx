import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import DashboardPage from './pages/Dashboard.jsx';
import TeamMembersPage from './pages/TeamMembers.jsx';
import WFOPage from './pages/WFO.jsx';
import TrainingPage from './pages/Training.jsx';
import RootLayout from './pages/Root.jsx';
import './App.css';

const router=createBrowserRouter([
   {path:'/Team-Service-UI/', element:<RootLayout/>,
      children:[
          {path:'', element:<DashboardPage/>},
          {path:'teammembers', element:<TeamMembersPage/>},
          {path:'wfo', element:<WFOPage/>},
          {path:'training', element:<TrainingPage/>}
        ],
      },
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
