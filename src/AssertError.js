export class AssertError extends Error {

	constructor({message, data}) {
		super(message);
		this.data = data;
	}

}
