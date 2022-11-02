const { STRING } = require("sequelize");
const BaseController = require("./baseController");
const crypto = require("crypto");
const util = require("util");
const randomBytes = util.promisify(crypto.randomBytes);

async function createCartID() {
  const rawBytes = await randomBytes(16);
  const cartID = rawBytes.toString("hex");
  return cartID;
}

class cartController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Create listing
  async insertOne(req, res) {
    try {
      console.log("hello");
      var createCARTID = false;
      const { id, itemName, itemPrice, sellerUserID, buyerUserID } = req.body;
      var CurrcartID = "";
      await this.model
        .findOne({
          where: { buyerUserName: buyerUserID },
        })
        .then((res) => {
          const { cartID } = res;
          CurrcartID = cartID;
          console.log("here");
        })
        .catch(() => {
          createCARTID = true;
        });
      if (createCARTID) {
        CurrcartID = await createCartID();
        console.log(CurrcartID);
      }
      const reqItem = await this.model.create({
        cartID: CurrcartID,
        itemIc: id,
        itemName: itemName,
        itemPrice: itemPrice,
        sellerUserName: sellerUserID,
        buyerUserName: buyerUserID,
      });
      return res.json(reqItem);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAll(req, res) {
    try {
      console.log("hello");
      var createCARTID = false;
      const { id, itemName, itemPrice, sellerUserID, buyerUserID } = req.body;
      const CurrcartID = "";
      await this.model
        .findOne({
          where: { buyerUserName: buyerUserID },
        })
        .then((res) => {
          const { cartID } = res;
          CurrcartID = cartID;
          console.log("here");
        })
        .catch(() => {
          createCARTID = true;
        });
      if (createCARTID) {
        CurrcartID = await createCARTID();
        console.log(CurrcartID);
      }
      const reqItem = await this.model.create({
        cartID: CurrcartID,
        itemIc: id,
        itemName: itemName,
        itemPrice: itemPrice,
        sellerUserName: sellerUserID,
        buyerUserName: buyerUserID,
      });
      return res.json(reqItem);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  } // Retrieve specific sighting
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

module.exports = cartController;
