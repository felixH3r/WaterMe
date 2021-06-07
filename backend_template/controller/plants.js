const plantsService = require('../service/plants');

class PlantsController {
  async createPlants(req, res) {
    try {
      const plant_id = await plantsService.createPlants(req.body);
      res.status(200).jsonp();
    } catch (err) {
      console.error(err);
    }
  }
  async getPlants(req, res) {
    try {
      const plant = await plantsService.getPlants(req.body);
      res.status(200).jsonp(plant);
    } catch (err) {
      console.error(err);
    }
  }
  async getPlantData(req, res) {
    try {
      const plant = await plantsService.getPlantData(req);
      res.status(200).jsonp(plant);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new PlantsController();
