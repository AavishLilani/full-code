import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { authRouter } from './routes/authRoutes';

const app = new Hono()
app.use("*",cors());
app.route("/auth/",authRouter)

export default app
