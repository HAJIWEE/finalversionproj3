const { STRING } = require("sequelize");
const BaseController = require("./baseController");

class userController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Create user
  async insertOne(req, res) {
    const { username, imageUrl, UUID, Role } = req.params;
    try {
      // Create new user
      const newUser = await this.model.create({
        user_id: UUID,
        username: username,
        dpurl: imageUrl,
        role: Role,
      });
      // Respond with new sighting
      return res.json(newUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOne(req, res) {
    try {
      const { UUID } = req.params;
      console.log(req.params);
      const CurrUser = await this.model.findOne({
        where: { user_id: UUID },
      });
      // Respond with new sighting
      return res.json(CurrUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve specific sighting
  // async getOne(req, res) {
  //   const { sightingId } = req.params;
  //   try {
  //     const sighting = await this.model.findByPk(sightingId);
  //     return res.json(sighting);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }
}

module.exports = userController;