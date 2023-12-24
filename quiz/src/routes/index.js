import PrivateRoutes from "../components/PrivateRoutes";
import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Answer from "../pages/Answers";
import Result from "../pages/Result";
import Quiz from "../pages/Quiz";
import Logout from "../pages/Logout";
import Topics from "../pages/Topics";

export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "logout",
                element: <Logout/>
            },
            {
                element: <PrivateRoutes />,
                children: [
                    {
                        path: "answers",
                        element: <Answer/>
                    },
                    {
                        path: "quiz/:id",
                        element: <Quiz/>
                    },
                    {
                        path: "result/:id",
                        element: <Result/>
                    },
                    {
                        path: "topics",
                        element: <Topics/>
                    }
                ]
            }
        ]
    }
]