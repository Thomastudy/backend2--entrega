import { Router } from "express";
import ticketController from "../controllers/ticket.controller.js";

const router = Router();

//crear ticket
router.post("/", ticketController.createTicket);

export default router;
