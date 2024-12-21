import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
import BaseLayout from '@/layouts/base-layout';

import GenerateRecipe from '@/pages/generate-recipe';
import SavedRecipes from '@/pages/saved-recipes';

import './index.css';

const BaseLayoutWrapper = () => (
  <BaseLayout>
    <Outlet />
  </BaseLayout>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/generate" replace />,
  },
  {
    path: '/',
    element: <BaseLayoutWrapper />, 
    children: [
      {
        path: 'generate',
        element: <GenerateRecipe />,
      },
      {
        path: 'saved-recipes',
        element: <SavedRecipes />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
