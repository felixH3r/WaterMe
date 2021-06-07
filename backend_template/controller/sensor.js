const sensorService = require('../service/sensor');

class SensorController {
  async createSensorData(req, res) {
    try {
      const sensor_data_id = await sensorService.createSensorData(req.body);
      res.status(200).json();
    } catch (err) {
      console.error(err);
    }
  }
  async getSensorData(req, res) {
    try {
      const sensor_data = await sensorService.getSensorData(req);
      res.status(200).jsonp(sensor_data);
    } catch (err) {
      console.error(err);
    }
  }

  async getNextTimeToWater(req, res) {
    try {
      const data = await sensorService.getNextTimeToWater(req);
      res.status(200).jsonp(data);
    } catch (err) {
      console.error(err);
    }
  }

}

module.exports = new SensorController();
