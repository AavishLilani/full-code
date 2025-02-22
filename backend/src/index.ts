import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { authRouter } from './routes/authRoutes';

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>()
app.use("*",cors())
app.route("/auth",authRouter)

export default app
