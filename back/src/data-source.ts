import { DataSource } from "typeorm";
import { Item } from "./models/item";


export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  entities: [Item],
  synchronize: true,
});
