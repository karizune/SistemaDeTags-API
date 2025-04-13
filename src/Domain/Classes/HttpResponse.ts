import { ErrorHandling } from "../../Application/CustomModules/ErrorHandling";
import { ResponseBody } from "./ResponseBody";

export class HttpResponse {
	public Status: number;
	public Body?: ResponseBody

	public constructor(status?: number, message?: string, body?: any) {
		this.Status = status ?? 0;

		if (message !== undefined || body !== undefined) {
			this.Body = new ResponseBody(message, body);
		}
	}

	public static Created(object?: any, message?: string): HttpResponse {
		return new HttpResponse(201, message ?? "Created.", object);
	}

	public static Ok(object?: any, message?: string): HttpResponse {
		return new HttpResponse(200, message ?? "Ok.", object);
	}

	public static BadRequest(message?: any, object?: any): HttpResponse {
		return new HttpResponse(400, message, object);
	}

	public static NotFound(): HttpResponse {
		return new HttpResponse(404);
	}

	public static Unauthorized(message?: string): HttpResponse {
		return new HttpResponse(401, message ?? "Acesso não autorizado.");
	}

	public static InternalServerError(message?: string): HttpResponse {
		message = message ?? "Ocorreu um erro ao processar a transação.";
		console.error(message);
		return new HttpResponse(500, message);
	}

	public static InternalServerErrorEx(ex: any, message?: string): HttpResponse {
		message = message ?? "Ocorreu um erro ao processar a transação.";
		console.error(message, ErrorHandling.TryGetErrorMessage(ex));
		return new HttpResponse(500, message, ErrorHandling.TryGetErrorMessage(ex));
	}
}
