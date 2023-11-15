import logo from './logo.svg';
import './App.css';

import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import restList from './util/restaurantListData'
import Header from './components/Header'
import Body from './components/Body'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import ErrorPage from './components/ErrorPage'
import RestaurantMenu from './components/RestaurantMenu'
import Cart from './components/Cart';

import { Provider } from 'react-redux'
import store from './app/store';

const LazyResMenuComp = lazy(() => import('./components/RestaurantMenu'))

function App() {
  return <div className='app'>
    <Provider store={store}>
      {/* outlet will be replaced with the specific element based on the path */}
      <Outlet />
    </Provider>
  </div>
}


export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
    <Header />
    <App />
    </>
    ,
    children: [
      {
        path: '/',
        element: <>
          <Body />
        </>
      },
      {
        path: '/about',
        element: <>
        <About />
        </>
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/restaurants/:resId',
        element: <Suspense fallback={<h1 style={{ display: 'flex', backgroundColor: 'red', width: "100px", height: '200px', alignItems: 'center', justifyContent: 'center' }}>Loading.....</h1>}>
          <LazyResMenuComp />
        </Suspense>
      },
      {
        path: '/cart',
        element: <Cart />
      },
    ],
    errorElement: <ErrorPage />
  },

])
export default App;
