
import login from "./login.js";

export default (app) => {
  const routers = [login];

  routers.forEach((router) => {
      app.use(router.middleware());  
  });
};
