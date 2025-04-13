export class ResponseBody {
	public Body?: any
	public Message?: string

	public constructor(message?: string, body?: any) {
		this.Body = body;
		this.Message = message;
	}
}
