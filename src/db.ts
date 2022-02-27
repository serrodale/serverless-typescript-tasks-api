import knex, { Knex } from "knex";

/**
 * It is declared here so that it can be reused by
 * different calls to the same Lambda.
 */
let db: Knex;

export const getDb = (tableName: string) => {
  if (!db) {
    db = knex({
      client: "pg",
      connection: process.env.DB_CONNECTION_URL,
    });
  }

  return db(tableName);
};
