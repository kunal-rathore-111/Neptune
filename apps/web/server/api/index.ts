import { app } from '../src/index';

export default function handler(req: any, res: any) {
    return app(req, res);
}
