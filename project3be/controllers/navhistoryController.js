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
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = navhistoryController;
