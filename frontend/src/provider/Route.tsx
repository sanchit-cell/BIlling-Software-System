import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/LoginNew";
import Register from "../pages/Register";
import HomePage from "../pages/Home/indexNew"; 
import ErrorPage from "../pages/Error";
import Invoice from "../pages/Invoice";
import UserPage from "../pages/Users";
import OrdersPage from "../pages/Orders/indexNew";
import InventoryPage from "../pages/Inventory/indexNew";

export const Routes = createBrowserRouter([
    {
        path:'/',
        Component:App,
        children:[
            {
                path:'/',
                Component: HomePage
            },
            {
                path: '/invoice',
                Component: Invoice
            },
            {
                path: '/user',
                Component: UserPage
            },
            {
                path: '/orders',
                Component: OrdersPage
            },{
                path : "/inventory",
                Component: InventoryPage
            }
            
            ,{
                path:'*',
                Component: ErrorPage
            }
        ]
    },
    {
        path: '/login',
        Component: Login,
        
    },
    {
        path: '/register',
        Component: Register
    }
])
 