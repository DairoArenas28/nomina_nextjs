import { DataSource } from "typeorm";
import { Employee } from "../entities/Employee";
import { Nomina } from "../entities/Nomina";
import { NominaEnc } from "../entities/NominaEnc";
import { Concept } from "../entities/Concept";
import { NominaDet } from "../entities/NominaDet";

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
            entities: [Employee, Nomina, NominaEnc, NominaDet, Concept], // 👈 Todas automáticamente
        });

        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
    }

    return dataSource;
};
