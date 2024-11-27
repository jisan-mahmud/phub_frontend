import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Explore from '../pages/Explore';
import Profile from '../pages/Profile';
import Comments from '../pages/Comments';
import NewSnippet from '../pages/NewSnippet';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'explore',
        element: <Explore />,
      },
      {
        path: 'new',
        element: <NewSnippet />,
      },
      {
        path: 'profile',
        element: <Profile/>,
      },
      {
        path: 'snippets/:snippetId/comments',
        element: <Comments />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);