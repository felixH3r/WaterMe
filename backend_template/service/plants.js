const plantsDAO = require('../dao/plants');

class PlantsService {
  createPlants(plantsDTO) {
    console.log(plantsDTO);
    const {name, demand, picture} = plantsDTO;
    return plantsDAO.createPlants(name, demand, picture);
  }
  getPlants(plantsDTO) {
    console.log(plantsDTO);
    const {name} = plantsDTO;
    return plantsDAO.getPlants(name);
  }
  getPlantData(plantsDTO) {
    console.log(plantsDTO);
    const id = plantsDTO;
    return plantsDAO.getPlantData(id);
  }
}

module.exports= new PlantsService();
