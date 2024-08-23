// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
  // Get apropriate db1, db2, or db3 from central database
  const dbX = await central(id);
  console.log(dbX);
}

getUserData(10);
