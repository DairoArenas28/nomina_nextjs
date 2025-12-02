import { DataSource } from "typeorm";
import { Employee } from "../entities/Employee";

let dataSource: DataSource;


export const getDataSource = async () => {
    if (!dataSource) {
        dataSource = new DataSource({
            type: "postgres",
            url: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            },
            synchronize: true,
            entities: [Employee], // 👈 Todas automáticamente
        });

        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
    }

    return dataSource;
};
