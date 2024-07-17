import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SubLayout from './components/layout/SubLayout';
import Products from './components/Products';
import Wishlist from './pages/Wishlist';
import ProductItem from './components/ProductItem';
import AdminPanel from './pages/AdminPanel';
import AdminLayout from './components/layout/AdminLayout';
import { store } from './reducers/store';
import { Provider } from 'react-redux';
import SignUp from './pages/SignUp';
import CartLayout from './components/layout/CartLayout';
import Cart from './pages/Cart';
import Orders from './components/Orders';
import Categories from './components/Categories';
import Subcategories from './components/Subcategories';
import AdminProduct from './components/AdminProduct';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signUp',
        element: <SignUp />,
    },
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/wishlist',
                element: <ProtectedRoute element={<Wishlist />} />,
            },
            {
                path: '/product/:productId',
                element: <ProductItem />,
            },
            {
                path: '/category',
                element: <SubLayout />,
                children: [
                    {
                        path: '/category/tshirts',
                        element: <Products />,
                    },
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute element={<AdminLayout />} />,
        children: [
            {
                path: '/admin',
                element: <AdminPanel />,
            },
            {
                path: '/orders',
                element: <Orders />,
            },
            {
                path: '/admincategory',
                element: <Categories />,
            },
            {
                path: '/adminsubcategory',
                element: <Subcategories />,
            },
            {
                path: '/adminproducts',
                element: <AdminProduct />,
            },
        ],
    },
    {
        element: <ProtectedRoute element={<CartLayout />} />,
        children: [
            {
                path: '/cart',
                element: <Cart />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider
                router={router}
                fallbackElement={<p>Web App is loading...</p>}
            />
        </Provider>
    </React.StrictMode>
);
