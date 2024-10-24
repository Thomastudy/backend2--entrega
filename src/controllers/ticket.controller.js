import ticketService from "../services/ticket.service.js";

class TicketController {
  async createTicket(req, res) {
    const { products, amount, purchaser } = req.body;
    //   code, purchase_datetime, products, amount, purchaser
    try {
      if (!products)
        console.log("Error, products no fue correctamente recibido");
      if (!amount) console.log("Error, amount no fue correctamente recibido");
      if (!purchaser)
        console.log("Error, purchaser no fue correctamente recibido");

      const purchase_datetime = new Date();
      const code = "ticket-" + 4 * Math.random();

      if (!purchase_datetime)
        console.log("Error, purchase_datetime no fue correctamente recibido");
      if (!code) console.log("Error, code no fue correctamente recibido");

      const newTicket = await ticketService.createTicket({
        code,
        purchase_datetime,
        products,
        amount,
        purchaser,
      });

      if (!newTicket) {
        return res.send("error al crear el nuevo tiket, algo anda mal");
      }

      console.log("Ticket creado exitosamente");
      return newTicket;
    } catch (error) {
      res.send(`Error en la creacion del ticket, ${error}`);
    }
  }
}

export default new TicketController();
