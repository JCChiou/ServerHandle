import JoiRouter from "koa-joi-router";
import testlog from "../middleware/testlog.js";
import { NotFoundError } from "../middleware/errorHandler.js";
import { ArgumentError } from "../middleware/errorHandler.js";

const router = JoiRouter();
const Joi = JoiRouter.Joi;

router.prefix("/api/v1");

router.get("/", async (ctx) => {
  console.log("hello world");
  throw new NotFoundError("nono world");
  // ctx.throw(400, " error hello world")
  ctx.body = "Hello World";
});

router.post(
  "/login",
  {
    validate: {
      type: "json",
      body: { userid: Joi.string().min(1).max(7) },
      continueOnError: true
    },
  },
  testlog,
  async (ctx) => {
    if (ctx.invalid) {
      console.log("invalid input");
      throw new ArgumentError();
    }
    const body = ctx.request.body;

    if (body.userid == "user" && body.userpwd == "1234") {
      ctx.status = 200;
      ctx.body = true;
    } else {
      // throw new Error("throw error");
    }
  }
);

export default router;
