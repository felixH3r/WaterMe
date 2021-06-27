const plantsService = require('../service/plants');
const usersService = require('../service/users');

class DataController {
  async getPlantData(req, res) {
    try {
      var data = [];
      console.log("DataController: typeof req: " + typeof req.query.username);
      const obj = await usersService.getUserSensors(req);
      const sensors = obj['sensors'];
      // console.log("DataController: sensors: " + sensors );
      // console.log("DataController: typeof sensors: " + typeof sensors );
      // console.log("DataController: length of sensors: " + sensors.length );
      for (const sensor of sensors) {
          console.log("Sensor-ID: " + sensor);
          const plantdata = await plantsService.getPlantData(sensor);
          if (typeof plantdata != undefined && plantdata != null) {
              data.push(plantdata);
          }

      }

      res.status(200).jsonp(data);
    } catch (err) {
      console.error(err);
    }
  }

}

module.exports = new DataController();
