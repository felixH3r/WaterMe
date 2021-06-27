const db = require('../db/db');
class PlantsDAO {
  async createPlants(name, demand, picture) {
    const [plant_id] = await db('plants').insert({
      name: name,
      demand:  demand,
      picture: picture})
      .returning('name');

      return plant_id;
  }
  async getPlants(name) {
    const [plant] = await db('plants').select('*')
      .where('name', name);

      return plant;
  }

  async getPlantData(id) {
    const [last_entry] = await db('sensordata').select('waterlevel','ts')
      .where('id', id)
      .orderBy('ts', 'desc')
      .limit(1);

    var last_time_watered = {};
    var pflanze = {};

    try {
      const [last_time_watered_ts] = await db('users').select('gegossen as ts')
        .where('sensor', id);
      last_time_watered.ts = last_time_watered_ts.ts;
      const [last_time_watered_waterlevel] = await db('sensordata').select('waterlevel')
        .where('id', id)
        .where('ts', last_time_watered.ts);
      last_time_watered.waterlevel = last_time_watered_waterlevel.waterlevel;

      const [pflanze_name] = await db('users').select('plant as name')
        .where('sensor', id);
        [pflanze] = await db('plants').select('*')
          .where('name', pflanze_name.name);
      // console.log(require('util').inspect(pflanze, { depth: null }));
      // const [pflanze_bedarf] = await db('plants').select('demand')
      //   .where('name', pflanze.name);

      // pflanze.bedarf = pflanze_bedarf.demand;
      var demandMinMap = new Map();
      demandMinMap.set('niedrig', 15);
      demandMinMap.set('mittel', 30);
      demandMinMap.set('hoch', 50);
      pflanze.minimum = demandMinMap.get(pflanze.demand);
      var demandMaxMap = new Map();
      demandMaxMap.set('niedrig', 55);
      demandMaxMap.set('mittel', 70);
      demandMaxMap.set('hoch', 100);
      pflanze.maximum = demandMaxMap.get(pflanze.demand);

      // console.log('SensorDAO: last_waterlevel: ' + last_entry.waterlevel + ' ts: ' + last_entry.ts);
      // console.log('SensorDAO: last_watered_waterlevel: ' + last_time_watered.waterlevel + ' ts: ' + last_time_watered.ts);
      var difference = {};
      const hours_difference = Math.floor((last_entry.ts - last_time_watered.ts) / 1000 / 60 /60 );


      difference.days = Math.floor(hours_difference / 24);
      difference.hours = Math.floor(hours_difference % 24);
      difference.waterlevel = (last_entry.waterlevel - last_time_watered.waterlevel);
      difference.waterlevel_per_hour = (difference.waterlevel / hours_difference);


      pflanze.minimum_erreicht_hours = (pflanze.minimum - last_entry.waterlevel) / difference.waterlevel_per_hour;
      pflanze.giessen_in_tagen = Math.floor(pflanze.minimum_erreicht_hours / 24);
      pflanze.giessen_in_stunden = Math.floor(pflanze.minimum_erreicht_hours % 24);
      pflanze.wasserstand = last_entry.waterlevel;
      pflanze.gegossen_am = new Date(last_time_watered.ts).toISOString().replace(/T/, ' ').replace(/\..+/, '');
      pflanze.sensor = id;

      // console.log('Pflanze: '+ pflanze.name + ', giessen in: ' + pflanze.giessen_in_tagen + ' Tagen, ' +pflanze.giessen_in_stunden +' Stunden.')

    } catch (e) {
      console.error(e);
    }

    return pflanze;
  }

}

module.exports=new PlantsDAO();
