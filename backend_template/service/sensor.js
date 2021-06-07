const sensorDAO = require('../dao/sensor');
var util = require('util');

class SensorService {
  async createSensorData(sensorDTO) {
    // console.log(sensorDTO);
    const {id, waterlevel} = sensorDTO;
    var last_waterlevel = await sensorDAO.getLastWaterlevel(id);
    if (!last_waterlevel) {
      last_waterlevel={};
      last_waterlevel.waterlevel=0;
    }
    // console.log("sensorService: last_waterlevel inspect:" + util.inspect(last_waterlevel, { depth: null }) + " - value: " + last_waterlevel.waterlevel);

    return sensorDAO.createSensorData(id, waterlevel, parseFloat(last_waterlevel.waterlevel));
  };
  getSensorData(sensorDTO) {
    const id = sensorDTO.query.id;
    console.log(id);
    return sensorDAO.getSensorData(id);
  };

  getNextTimeToWater(sensorDTO) {
    const id = sensorDTO.query.id;
    console.log(id);
    return sensorDAO.getNextTimeToWater(id);
  };

}

module.exports= new SensorService();
