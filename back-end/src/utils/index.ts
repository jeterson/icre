import { Router, Request, Response, NextFunction } from 'express';

type Wrapper = ((router: Router) => void);

type Handler = (req: Request, res: Response, nex: NextFunction) => Promise<void> | void;
interface Route {
    path: string;
    method: string;
    handler: Handler | Handler[];
}

export const applyMiddleware = (middleware: Wrapper[], router: Router) => {
    for (const f of middleware) {
        f(router);
    }
};

export const applyRoutes = (routes: Route[], router: Router) => {
    for (const route of routes) {
        const { method, path, handler } = route;
        (router as any)[method](path, handler);
    }
};
