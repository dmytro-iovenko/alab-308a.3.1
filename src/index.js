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
  // Use dbX value to get user data and vault data simultaneously
  const [userData, vaultData] = await Promise.all([dbs[dbX](id), vault(id)]);

  console.log(dbX, userData, vaultData);
}

getUserData(10);

// {
//     id: number,
//     name: string,
//     username: string,
//     email: string,
//     address: {
//       street: string,
//       suite: string,
//       city: string,
//       zipcode: string,
//       geo: {
//         lat: string,
//         lng: string
//       }
//     },
//     phone: string,
//     website: string,
//     company: {
//       name: string,
//       catchPhrase: string,
//       bs: string
//     }
// }
