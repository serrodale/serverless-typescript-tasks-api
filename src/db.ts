import knex, { Knex } from "knex";

/**
 * It is declared here so that it can be reused by
 * different calls to the same Lambda.
 */
let db: Knex;

export const getDb = () => {
  if (!db) {
    db = knex({
      client: "pg",
      connection: process.env.TS_JEST
        ? process.env.TESTING_DB_CONNECTION_URL
        : process.env.DB_CONNECTION_URL,
    });
  }

  return db;
};

export const getTable = (tableName: string) => {
  return getDb()(tableName);
};
