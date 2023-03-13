import Koa from "koa";
import { koaBody } from "koa-body";
import routing from "./routers/index.js";
import logger from "koa-logger";
import { ArgumentError, NotFoundError } from "./middleware/errorHandler.js";
import { IncomingWebhook } from "@slack/webhook";
import { slackNofi } from "./utilies/slackNotification.js";

const url = process.env.SLACK_WEBHOOK_URL;
// const webhook = new IncomingWebhook(url);

const app = new Koa();

app.use(koaBody());

/** @type {import('koa').Middleware} */
const errorMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error(error);
    if (error instanceof NotFoundError) {
      ctx.throw(404, { message: "this is 404 error" });//這邊的error code是給前端看的
    }
    if (error instanceof ArgumentError) {
      ctx.throw(400, {message: "傳遞的參數有誤"})
    } 
    else {
      // 可能可以 在這邊 就發送到slack ，當上述錯誤類型都不是的話
      // 錯誤時 傳訊息到slack
      ctx.status = 500 // 這裡設定成status = 500 , slackNofi判斷使用 
      slackNofi(ctx);
      ctx.throw(500, { message: "unknown error" });
    }
  }
};

app.use(errorMiddleware);

routing(app);


app.on("error", async (err, ctx) => {
  console.dir("xxx", { depth: 5 });
  console.error("hihi app on error", err.message);
  console.log("ctx msg =", ctx);
  // 寫cloud watch
  
});

app.listen(3000, () => {
  console.log("============================");
  console.log("running server: http://localhost:3000/");
  console.log("============================");
});
