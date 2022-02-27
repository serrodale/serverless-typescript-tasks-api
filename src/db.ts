import pgPromise, { IDatabase } from 'pg-promise';

/**
 * It is declared here so that it can be reused by
 * different calls to the same Lambda.
 */
let db: IDatabase<any>;

const getDb = () => {
  if (!db) {
    db = pgPromise()(process.env.DB_CONNECTION_URL);
  }

  return db;
};

export const query = async (query: string) => {
  return getDb().query(query);
};
