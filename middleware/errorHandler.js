
// 找不到資源 404
export class NotFoundError extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
	}
}

// 參數格式不符合 400
export class ArgumentError extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
	}
}

// token無效 || 沒有權限存取資源 403
export class Unauthorized extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
	}
}

