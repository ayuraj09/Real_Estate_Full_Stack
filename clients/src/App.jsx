import HomePage from "./routes/homePage/homePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import {RequireAuth, Layout} from "./routes/layout/layout"
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import NewPostPage from "./routes/newPostPage/newPostPage";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";

function App() { 
  const router = createBrowserRouter([
    {
      path: "/", 
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/list",
          element:<ListPage/>,
          loader : listPageLoader,
        },
        {
          path:"/:id",
          element:<SinglePage/>,
          loader : singlePageLoader,
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        }
      ]
    },
    {
      path: "/",
      element: <RequireAuth/>,
      children:[
        {
          path:"/profile",
          element:<ProfilePage/>,
          loader : profilePageLoader
        },
        {
          path:"/add",
          element:<NewPostPage/>
        }, 
        {
          path:"/profile/update",
          element:<ProfileUpdatePage/>
        }
      ]
    }
  
  ]);

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
