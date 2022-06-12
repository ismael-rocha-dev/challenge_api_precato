
const message_flow = require("../controllers/message_flow.controller");
const express = require("express");
const router = express.Router();
// criar nova mensagem
router.post("/create", message_flow.create);
// // buscar todas as mensagens
router.get("/all", message_flow.getAllMessages);
// buscar mensagens por ID
router.get("/:id", message_flow.getMessageByID);
// // atualizar mensagens pelo ID
router.put("/update/:id", message_flow.updateMessageByID);
// // Deletar mensagens pelo ID
router.delete("/delete/:id", message_flow.deleteMessageByID);

module.exports = router;
