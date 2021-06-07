const usersService = require('../service/users');

class UsersController {
  async getUserSensors(req, res) {
    try {
      console.log("UsersController: typeof req: " + typeof req.query.username);
      const sensors = await usersService.getUserSensors(req);
      res.status(200).jsonp(sensors);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new UsersController();
