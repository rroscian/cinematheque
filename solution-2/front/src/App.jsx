
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Films from './components/Films'
import Onefilm from './components/Onefilm'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Home />
      </div>
    ),
    children: [
      {
        index: true, // Utilisez "index: true" pour définir la route par défaut
        element: (
          <main>
            <Films />
          </main>
        ),
      },
      {
        path: 'pagefilm/:_id',
        element: (
          <main>
            <Onefilm />
          </main>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}/>
}

export default App
