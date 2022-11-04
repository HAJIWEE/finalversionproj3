const { CatchingPokemonSharp } = require("@mui/icons-material");
const { STRING, Op } = require("sequelize");
const BaseController = require("./baseController");

class listingController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Create listing
  async insertOne(req, res) {
    const {
      itemName,
      itemPrice,
      imageUrl,
      itemDescription,
      UUID,
      dpurl,
      usename,
    } = req.body;
    try {
      // Create new user
      const newListing = await this.model.create({
        itemName: itemName,
        itemPrice: itemPrice,
        itemImageUrl: imageUrl,
        itemDescription: itemDescription,
        sellerUserID: UUID,
        itemSalesStatus: "Available",
        sellerUserName: usename,
        sellerdpURL: dpurl,
      });
      // Respond with new sighting
      return res.json(newListing);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOne(req, res) {
    try {
      const { itemName } = req.params;
      console.log(itemName);
      const reqItem = await this.model.findOne({
        where: { itemName: itemName },
      });
      return res.json(reqItem);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async searchFor(req, res) {
    try {
      const { Param } = req.params;
      console.log(Param);
      const ItemList = await this.model.findAll({
        where: { itemName: Param },
      });
      console.log(ItemList);
      return res.json(ItemList);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAll(req, res) {
    try {
      const ItemList = await this.model.findAll({
        where: { itemSalesStatus: "Available" },
      });
      return res.json(ItemList);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async updateOne(req, res) {
    const { itemName } = req.params;
    const { itemPrice, itemDescription, itemImageURL, itemSalesStatus } =
      req.body;

    try {
      // Create new user
      const updatedItem = await this.model.update(
        {
          itemPrice: itemPrice,
          itemDescription: itemDescription,
          itemSalesStatus: itemSalesStatus,
        },
        { where: { itemName: itemName } }
      );
      // Respond with new sighting
      return res.json(updatedItem);
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

module.exports = listingController;
