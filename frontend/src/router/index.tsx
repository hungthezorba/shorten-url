import App from "@/App";
import { RedirectPage } from "@/pages/redirect-page";
import { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/:hash',
    element: <RedirectPage/>
  }
]