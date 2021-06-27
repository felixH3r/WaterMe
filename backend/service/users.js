const usersDAO = require('../dao/users');

class UsersService {
  getUserSensors(usersDTO) {
    // console.log("UsersService: typeof usersDTO: " + typeof usersDTO);
    // console.log("UsersService: value usersDTO.query.username: " + usersDTO.query.username);
    const username = usersDTO.query.username;
    console.log("UsersService: typeof username: " + typeof username);
    console.log("UsersService: username: " + username);

    return usersDAO.getUserSensors(username);
  }
}

module.exports= new UsersService();
