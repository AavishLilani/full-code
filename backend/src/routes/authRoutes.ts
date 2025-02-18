import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";

export const authRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

authRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  })
 try{
  const body = await c.req.json();
  const userExists = await prisma.user.findFirst({
    where:{
        email:body.email
    }
  })
  if(userExists){
    return c.json({Error:"User Already Exists"},411)
  }
  const newUser = await prisma.user.create({
    data:{
        email:body.email,
        username:body.username,
        password:body.password
    }
  })
  if(newUser){
    const token = await sign({id:newUser.id,email:newUser.email
    },c.env.JWT_SECRET)
    return c.json({msg:"User Signed up Successfully",token})
  }
 }catch(error){
    return c.json({error})
 }
 
});

authRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  })
  try {
    const body = await c.req.json();
   
    const user = await prisma.user.findFirst({
      where: { email: body.email, password: body.password },
    });
    if (!user) {
      return c.json({ error: "Invalid credentials" });
    }
    const token = await sign(
      { id: user.id, username: user.email, name: user.username },
      c.env.JWT_SECRET
    );
    return c.json({ token: token });
  } catch (error) {
    return c.json({ error:"Some error" });
  }
});