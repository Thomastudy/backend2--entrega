import productRepository from "../repositories/product.repository.js";
import ticketRepository from "../repositories/ticket.repository.js";

class TicketService {
  async createTicket(ticketData) {
    return await ticketRepository.createTicket(ticketData);
  }
  async getTickets(query) {
    return await ticketRepository.getTickets(query);
  }
}

export default new TicketService();
