import ticketRepository from "../repositories/ticket.repository.js";

class TicketService {
  async createTicket(ticketData) {
    return await ticketRepository.createTicket(ticketData);
  }
}

export default new TicketService();
