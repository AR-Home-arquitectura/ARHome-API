import { Envs } from './config';
import { MongoDatabase } from './data/mongodb';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    dbName: Envs.MONGO_DB_NAME,
    mongoUrl: Envs.MONGO_URL,
  });

  const server = new Server({
    port: Envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}
