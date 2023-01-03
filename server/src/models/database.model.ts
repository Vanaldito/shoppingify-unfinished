import { createConnection } from "mysql";
import processEnv from "../../environment";

const db = createConnection({
  host: processEnv.MYSQL_HOST as string,
  database: processEnv.MYSQL_NAME as string,
  user: processEnv.MYSQL_USERNAME as string,
  password: processEnv.MYSQL_PASSWORD as string,
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("Connected to database");
});

export default db;
