import { Connection, ConnectionStates, disconnect, createConnection } from 'mongoose';

export class Database {
	public Connect(uri: string): Connection {
		try {
			let connection: Connection = createConnection(uri).useDb("teste");
			console.log(`Conexão com MongoDB estabelecida com sucesso!`);

			return connection;
		} catch (ex: any) {
			console.error('Erro ao conectar ao MongoDB.', ex);
			throw ex;
		}
	}

	public async Disconnect(): Promise<void> {
		if (ConnectionStates.connected) {
			await disconnect();
			console.log('Conexão com MongoDB encerrada.');
		}
	}
}
