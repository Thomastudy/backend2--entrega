import TicketModel from "./models/ticket.model.js";

class TicketDao {
  async save(ticketData) {
    const ticket = new TicketModel(ticketData);
    ticket.save();
    return await ticket;
  }
}

export default new TicketDao();
