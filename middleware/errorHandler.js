export class NotFoundError extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
	}
}


export const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
};
