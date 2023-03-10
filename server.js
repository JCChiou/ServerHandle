import Koa from "koa";
import { koaBody } from "koa-body";
import routing from "./routers/index.js";
import logger from "koa-logger";
import { errorHandler } from "./middleware/errorHandler.js";
import { NotFoundError } from "./middleware/errorHandler.js";

const app = new Koa();

app.use(koaBody());

/** @type {import('koa').Middleware} */
const errorMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error(error);
    if (error instanceof NotFoundError) {
      ctx.throw(404, 'Not Found', {message: "this is 404"})
    }
  }
}

app.use(errorMiddleware);

// app.use(async (ctx, next) => {
//   try {
//     console.log('before next')
//     await next();
//     console.log('after next , pass first try catch');
//     // await Promise.reject(new Error("something error"));
//   } catch (err) {
//     console.log("攔截錯誤訊息：", err.message);
//     // ctx.app.emit("error", err, ctx)
//     // ctx.throw(500, err.message)
   
//     ctx.status =  500;
//     ctx.body = {
//       message: err.message
//     };
//     ctx.throw(400, " error hello world")
//   }
// });

// app.use((ctx, next) => {
//   ctx.throw(400,"123")
//   ctx.status = 200
//   console.log('Setting status')
//   // need to return here, not using async-await
//   return next()
// })

routing(app);


app.on("error", async (err, ctx) => {
  console.error("hihi app on error",err.message);
  // console.error("app on error", err, ctx);
});

app.listen(3000, () => {
  console.log("============================");
  console.log("running server: http://localhost:3000/");
  console.log("============================");
});
