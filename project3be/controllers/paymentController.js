const BaseController = require("./baseController");

class PaymentController extends BaseController {
  constructor(model) {
    super(model);
  }

  async insertOne(req, res) {
    const {
      userEmail,
      cart_id,
      instalment_period,
      cart_value,
      full_payment,
      monthlyAmount,
    } = req.body;
    try {
      if (instalment_period == 0) {
        const newIOU = await this.model.create({
          userEmail: userEmail,
          cart_id: cart_id,
          cart_value: cart_value,
          monthly_amount: monthlyAmount,
          instalment_period: instalment_period,
          full_payment: true,
        });
        res.json(newIOU);
      } else {
        for (let i = instalment_period; i > 0; i--) {
          const newIOU = await this.model.create({
            userEmail: userEmail,
            cart_id: cart_id,
            cart_value: cart_value,
            monthly_amount: monthlyAmount,
            instalment_period: instalment_period,
            full_payment: false,
          });
          console.log(res);
          return res.json(newIOU);
        }
      }
    } catch (err) {
      console.log(err);
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
