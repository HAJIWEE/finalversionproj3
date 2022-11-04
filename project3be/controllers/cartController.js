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
        itemId: id,
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

  async downOne(req, res) {
    try {
      const { id, cartID, itemName, buyerUserName } = req.body;
      console.log(req.params);
      const reqItem = await this.model.destroy({
        where: {
          id: id,
          cartID: cartID,
          itemName: itemName,
          buyerUserName: buyerUserName,
        },
      });
      return res.json(reqItem);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAll(req, res) {
    try {
      const { user_id } = req.params;
      console.log(req.params);
      const reqItem = await this.model.findAll({
        where: { buyerUserName: user_id },
      });
      return res.json(reqItem);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async removeOne(req, res) {
    try {
      const { cart_id } = req.body;
      console.log(cart_id);
      const reqItem = await this.model.destroy({
        where: { cartID: cart_id },
      });
      return res.json(reqItem);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = cartController;
