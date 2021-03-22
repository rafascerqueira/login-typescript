import { Connection, createConnection } from "typeorm";

const connection = async (): Promise<Connection> => await createConnection();

export default connection;
