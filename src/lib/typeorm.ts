import { DataSource } from "typeorm";
import { Employee } from "../entities/Employee";
import { Nomina } from "../entities/Nomina";
import { NominaEnc } from "../entities/NominaEnc";

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
            entities: [Employee, Nomina, NominaEnc], // 👈 Todas automáticamente
        });

        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
    }

    return dataSource;
};
