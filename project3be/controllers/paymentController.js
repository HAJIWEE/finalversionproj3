const BaseController = require("./baseController");

class PaymentController extends BaseController {
  constructor(model) {
    super(model);
  }

  async insertOne(req, res) {
    const { UUID, cart_id, instalment_period, cart_value, full_payment } =
      req.body;
    const instalAmount = cart_value / instalment_period;
    const cart = math.floor(math.random() * 10000);
    console.log(req.body);
    console.log(cart_value);
    console.log(cart_id);
    console.log(instalAmount);
    try {
      for (let i = instalment_period; i > 0; i--) {
        if ((i = !0)) {
          const newIOU = await this.model.create({
            user_id: UUID,
            cart_id: cart,
            cart_value: cart_value,
            instalAmount: instalAmount,
            instalment_period: i,
            full_payment: false,
          });
          console.log(res);
          return res.json(newIOU);
        } else {
          newIOU = await this.model.create({
            user_id: UUID,
            cart_id: cart,
            cart_value: cart_value,
            instalAmount: instalAmount,
            instalment_period: i,
            full_payment: true,
          });
        }
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOne(req, res) {
    const id = req.params.cart_Id;
    try {
      const output = await this.model.findByPk(id);
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = PaymentController;
