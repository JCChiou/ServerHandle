import Koa from "koa";
import { koaBody } from "koa-body";
import routing from "./routers/index.js";
import logger from "koa-logger";
import { errorHandler } from "./middleware/errorHandler.js";
import { NotFoundError } from "./middleware/errorHandler.js";
import { json } from "stream/consumers";

const app = new Koa();

app.use(koaBody());

/** @type {import('koa').Middleware} */
const errorMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error(error);
    if (error instanceof NotFoundError) {
      ctx.throw(404, {message: "this is 404 error"})
    }else {
      ctx.throw(401,{message: "login fail"})
    }
   
  }
}

app.use(errorMiddleware);


routing(app);


app.on("error", async (err, ctx, res) => {
  console.error("hihi app on error",err.message);
  console.log('ctx msg =', ctx.response)
  // console.error("app on error", err, ctx);
});

app.listen(3000, () => {
  console.log("============================");
  console.log("running server: http://localhost:3000/");
  console.log("============================");
});
