import JoiRouter from "koa-joi-router";
import testlog from "../middleware/testlog.js";
import { NotFoundError } from "../middleware/errorHandler.js";

const router = JoiRouter();

router.prefix("/api/v1");

const syncMiddleware = async (ctx, next) => {
  console.log('before syncMiddleware')
  await next()
  console.log('after syncMiddleware')
}

router.get("/", async (ctx) => {
  console.log("hello world");
  throw new NotFoundError("nono world");
  // ctx.throw(400, " error hello world")
  ctx.body = "Hello World";
});


router.post("/login", testlog, async (ctx) => {
  const body = ctx.request.body;
    if (body.userid == "user" && body.userpwd == "1234") {
      ctx.status = 200;
      ctx.body = true;
    } else {
      throw new Error("throw error");
    }
 
});

export default router;
