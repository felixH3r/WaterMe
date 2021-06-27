const db = require('../db/db');


class SensorDAO {
  async createSensorData(id, waterlevel, last_waterlevel) {
    console.log("last_waterlevel: " + last_waterlevel);
    const timestamp = new Date().toISOString();
    if (waterlevel - last_waterlevel >= 15) {
      console.log('Pflanze wurde gegossen');
      const [user_ts] = await db('users')
        .where('sensor', id)
        .update('gegossen', timestamp)
        .returning('gegossen');
    } else {
      console.log('Pflanze wurde nicht gegossen');
    }
    const [sensor_data_id] = await db('sensordata').insert({
      id: id,
      ts:  timestamp,
      waterlevel: waterlevel})
      .returning('id');

      return sensor_data_id;
  }

  async getSensorData(id) {
    const [sensor_data] = await db('sensordata').select('*')
      .where('id', id)
      .orderBy('ts', 'desc')
      .limit(1);
      console.log(sensor_data);
      return sensor_data;
  }

  async getLastWaterlevel(id) {
    const [waterlevel_data] = await db('sensordata').select('waterlevel')
      .where('id', id)
      .orderBy('ts', 'desc')
      .limit(1);
      //console.log(waterlevel_data);
      return waterlevel_data;
  }

  async getNextTimeToWater(id) {
    const [last_entry] = await db('sensordata').select('waterlevel', 'ts')
      .where('id', id)
      .orderBy('ts', 'desc')
      .limit(1);
    // var last_time_watered = Object.create(Object.prototype, {
    //   waterlevel: {value: null, writeable: true, configurable: true},
    //   ts: {value: null, writeable: true, configurable: true, enumerable: true,}
    // });
    var last_time_watered = {};
    var pflanze = {};

    const [last_time_watered_ts] = await db('users').select('gegossen as ts')
      .where('sensor', id);
    last_time_watered.ts = last_time_watered_ts.ts;
    const [last_time_watered_waterlevel] = await db('sensordata').select('waterlevel')
      .where('id', id)
      .where('ts', last_time_watered.ts);
    [pflanze] = await db('users').select('plant as name')
      .where('sensor', id);
    const [pflanze_bedarf] = await db('plants').select('demand')
      .where('name', pflanze.name);
    pflanze.bedarf = pflanze_bedarf.demand;
    var demandMap = new Map();
    demandMap.set('niedrig', 15);
    demandMap.set('mittel', 30);
    demandMap.set('hoch', 50);
    pflanze.minimum = demandMap.get(pflanze.bedarf);


    last_time_watered.waterlevel = last_time_watered_waterlevel.waterlevel;
    console.log('SensorDAO: last_waterlevel: ' + last_entry.waterlevel + ' ts: ' + last_entry.ts);
    console.log('SensorDAO: last_watered_waterlevel: ' + last_time_watered.waterlevel + ' ts: ' + last_time_watered.ts);
    var difference = {};
    const hours_difference = Math.floor((last_entry.ts - last_time_watered.ts) / 1000 / 60 / 60);

    difference.days = Math.floor(hours_difference / 24);
    difference.hours = Math.floor(hours_difference % 24);
    difference.waterlevel = (last_entry.waterlevel - last_time_watered.waterlevel);
    difference.waterlevel_per_hour = (difference.waterlevel / hours_difference);

    pflanze.minimum_erreicht_hours = (pflanze.minimum - last_entry.waterlevel) / difference.waterlevel_per_hour;
    pflanze.giessen_in_days = Math.floor(pflanze.minimum_erreicht_hours / 24);
    pflanze.giessen_in_hours = Math.floor(pflanze.minimum_erreicht_hours % 24);
    pflanze.gegossen_am = new Date(last_time_watered.ts).toString();

    console.log('SensorDAO: timestamp-difference: ' + difference.days + " Days " + difference.hours+ " Hours");
    console.log('SensorDAO: waterlevel-difference: ' + difference.waterlevel + " -> " + difference.waterlevel_per_hour+ " per hour");
    console.log('SensorDAO: bedarf: ' + pflanze.minimum + " - Minimum erreicht in " + pflanze.minimum_erreicht_hours);
    console.log('SensorDAO: Giessen in: ' + pflanze.giessen_in_days + " Tagen " + pflanze.giessen_in_hours + " Stunden.");
    return pflanze;
  }

}



module.exports=new SensorDAO();
