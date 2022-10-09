const { STRING } = require("sequelize");
const BaseController = require("./baseController");

class navhistoryController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Create sighting
  async insertOne(req, res) {
    const { timenow, value } = req.body;

    try {
      // Create new sighting
      const newNavHist = await this.model.create({
        date: timenow,
        location: value,
      });
      // Respond with new sighting
      return res.json(newNavHist);
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

module.exports = navhistoryController;
