import { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

export const handleCors = (router: Router) => {
    return router.use(cors());
}

export const handleBodyParser = (router: Router) => {
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(bodyParser.json());
}