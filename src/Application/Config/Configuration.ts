import * as environment from 'dotenv';
environment.config({ path: "./src/Application/config/.env" });

export class Configuration {
	public static readonly ConnectionString: string = process.env.connection as string ?? "";
	public static readonly BackendPort: number = Number.parseInt(process.env.BackendPort as string ?? "3000");
	public static readonly Locale: string = process.env.Locale as string ?? "";
}
