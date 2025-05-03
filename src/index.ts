import express, { Router } from 'express';
import cors from 'cors';

import { Configuration } from './Application/Config/Configuration';
import { ProductRoutes } from './Route/ProductRoutes';
import { Dependencies } from './Application/DependencyInjection/Dependencies';
import { CompanyRoutes } from './Route/CompanyRoutes';
import { UserRoutes } from './Route/UserRoutes';

const server: express.Express = express();
server.use(cors());
server.use(express.json());
server.use("/User", new UserRoutes(Dependencies.UserController).GetRoutes());
server.use("/Product", new ProductRoutes(Dependencies.ProductController).GetRoutes());
server.use("/Company", new CompanyRoutes(Dependencies.CompanyController).GetRoutes());

server.listen(Configuration.BackendPort, () => {
	console.log('servidor iniciado.')
});
