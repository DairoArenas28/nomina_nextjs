import { DataSource } from "typeorm";
import * as Entities from "@/src/entities";

let dataSource: DataSource;


export const getDataSource = async () => {
    if (!dataSource) {
        dataSource = new DataSource({
            type: "postgres",
            url: process.env.DATABASE_URL,
            synchronize: true,
            entities: Object.values(Entities), // 👈 Todas automáticamente
        });

        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
    }

    return dataSource;
};
