import { errorHandler } from "./errorHandler.js";

const testlog = async (ctx, next) => {

  let res = ctx.res;
  console.log(`<----${ctx.url}`);
  await next();

  res.on("finish", () => {
    console.log(`---> ${ctx.method} , ${ctx.status}`);
  });
}

// const testlog = function (ctx,next, err) {
//   let res = ctx.res;
//   console.log(`<----${ctx.url}`);
//   next();

//   res.on("finish", () => {
//     console.log(`---> ${ctx.method} , ${ctx.status}`);
//   });
// };

export default testlog;
