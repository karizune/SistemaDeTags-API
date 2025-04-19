import express from 'express';
import { Configuration } from './Application/Config/Configuration';
import { ProductRoutes } from './Route/ProductRoutes';
import { Dependencies } from './Application/DependencyInjection/Dependencies';
import cors from 'cors';

const server: express.Express = express();
server.use(cors()); // Habilita CORS para todas as rotas
server.use(express.json());
server.use(new ProductRoutes(Dependencies.ProductController).GetRoutes())

server.listen(Configuration.BackendPort, () => {
	return console.log(`Server is running at http://localhost:${Configuration.BackendPort}`);
});
