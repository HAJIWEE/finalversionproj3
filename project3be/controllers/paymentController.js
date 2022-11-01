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
      monthly_amount,
    } = req.body;
    console.log(req.body);
    console.log(cart_value);
    console.log(cart_id);
    console.log(monthly_amount);
    try {
      if (i == 0) {
        const newIOU = await this.model.create({
          userEmail: userEmail,
          cart_id: cart_id,
          cart_value: cart_value,
          monthly_amount: monthly_amount,
          instalment_period: instalment_period,
          full_payment: true,
        });
        console.log(res);
        return res.json(newIOU);
      } else {
        for (let i = instalment_period; i > 0; i--) {
          newIOU = await this.model.create({
            userEmail: userEmail,
            cart_id: cart_id,
            cart_value: cart_value,
            monthly_amount: monthly_amount,
            instalment_period: instalment_period,
            full_payment: false,
          });
        }
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  /* for (let i = instalment_period; i > 0; i--) {
        if (i != 0) {
          const newIOU = await this.model.create({
            userEmail: userEmail,
            cart_id: cart,
            cart_value: cart_value,
            monthly_amount: monthly_amount,
            instalment_period: i,
            full_payment: false,
          });
          console.log(res);
          return res.json(newIOU);
        } else {
          newIOU = await this.model.create({
            user_id: userEmail,
            cart_id: cart,
            cart_value: cart_value,
            monthly_amount: monthly_amount,
            instalment_period: i,
            full_payment: true,
          });
        }
      } */

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
