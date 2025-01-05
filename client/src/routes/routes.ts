import { Link } from '../types';
import { Pages } from '../constants';
import { hashRoute } from '../utils';

type Route = {
  label: string;
  key: string;
  path: string;
};

export type RouteDefinitions = {
  [index: string]: Route;
};

const routes: RouteDefinitions = {
  [Pages.Home]: {
    label: 'Home',
    key: 'home',
    path: hashRoute(Pages.Home),
  },
};

export const linkFromRoutes = (routes: RouteDefinitions): Array<Link> =>
  Object.entries(routes).map(([page, route]: [string, Route]) => ({
    label: route.label,
    key: route.key,
    path: route.path,
    page,
  }));

export const links: Array<Link> = linkFromRoutes(routes);
