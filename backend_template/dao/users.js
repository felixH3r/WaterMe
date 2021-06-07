const db = require('../db/db');
class UsersDAO {
  async getUserSensors(username) {
    console.log("UsersDAO: typeof username: " + typeof username);
    console.log("UsersDAO: username: " + username);
    const [sensors] = await db('users').select(db.raw(['ARRAY_AGG(sensor) as sensors']))
      .where('username', username);

      console.log("UsersDAO: typeof sensors: " + typeof sensors);
      return sensors;
  }

}

module.exports=new UsersDAO();
