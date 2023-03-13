
const testlog = async (ctx, next) => {

  let res = ctx.res;
  console.log(`<----${ctx.url}`);
  await next();

  res.on("finish", () => {
    console.log(`---> ${ctx.method} , ${ctx.status}`);
  });
}

export default testlog;
