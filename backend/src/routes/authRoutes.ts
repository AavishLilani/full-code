import { Hono } from "hono";

export const authRouter = new Hono();
authRouter.get("/signin",async(c)=>{
    const body= await c.req.json()
    console.log(body)
    return c.json(body)
})
authRouter.post("/signup",async(c)=>{
    return c.text("Signup route")
})