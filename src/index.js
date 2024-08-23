// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

const DEBUG = false;

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
  // function must complete in 200ms or less
  const start = Date.now();
  // Get apropriate db1, db2, or db3 from central database
  const dbX = await central(id);
  // Use dbX value to get user data and vault data simultaneously
  const [userData, vaultData] = await Promise.all([dbs[dbX](id), vault(id)]);
  // if it is DEBUG mode, log elapsed time
  DEBUG && console.log("Time elsapsed:", Date.now() - start);
  // combine all specific data associated with the user with the given id
  // into a single object
  const combinedUserData = { id, ...userData, ...vaultData };
  // if it is DEBUG mode, log combined user data
  //   DEBUG && console.log("User data:", combinedUserData);
  // return a Promise that resolves to the object with combined user data
  return combinedUserData;
}

// Get user data for user with id = 10
const userData = getUserData(10);
// Resolve Promise
userData
  // log combined user data
  .then((userData) => console.log(userData))
  // log error, if any
  .catch((error) => console.log(error));
