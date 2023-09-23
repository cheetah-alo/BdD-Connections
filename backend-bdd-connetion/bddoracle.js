const oracledb = require("oracledb");

var pool = null;
try {
  oracledb.initOracleClient({ libDir: process.env.ORA_LIBDIR });
} catch (err) {
  console.error("Somenthing went wrong");
  console.error(err);
  process.exit(1);
}

async function getPoll(con) {
  return new Promise(async (resolve, reject) => {
    if (pool) resolve(pool);
    try {
      console.log("Connecting to Oracle");
      pool = await oracledb.createPool(con);
      resolve(pool);
    } catch (err) {
      reject(err);
    }
  });
}

async function q(sql, parametros) {
  let connection;
  try {
    await getPool({
      user: "C##DATOS",
      password: "DATOS",
      connectString: "localhost:1521/XE",
      poolAlias: "curso",
    });
    connection = await oracledb.getConnection("curso");
    const results = await connection.execute(sql, parametros, {
      outFormat: oracledb.OBJECT,
      // outFormat: oracledb.OUT_FORMAT_ARRAY
    });
    return results.rows;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        return err;
      } finally {
        if (connection) await connection.close();
      }
    }
  }
}

// Test the query function with a sample SQL query
query("SELECT * FROM Customers", [])
  .then((res) => {
    console.log(res); // Log the results to the console
  })
  .catch((err) => {
    console.log(err); // Log any errors to the console
  });
