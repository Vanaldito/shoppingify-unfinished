import { createConnection } from "mysql";

const db = createConnection({
  host: process.env.MYSQL_HOST as string,
  database: process.env.MYSQL_NAME as string,
  user: process.env.MYSQL_USERNAME as string,
  password: process.env.MYSQL_PASSWORD as string,
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("Connected to database");
});

export default db;
