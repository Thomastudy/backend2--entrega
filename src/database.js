import mongoose from "mongoose";

const database = mongoose.connect("mongodb+srv://thomastudy:cr7.suuuuuuu@thomastudy.njlta.mongodb.net/ecommerce-bknd2?retryWrites=true&w=majority&appName=Thomastudy")
.then(() => console.log("Conectados a la db"))
.catch((error) => console.error("Uuu loco todo algo malio sal", error))

export default database;