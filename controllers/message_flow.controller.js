const db = require("../models");
const messageObj = db.message_flow;

// Criar e salvar uma mensagem
exports.create = (request, result) => {
  if (!request.body.template_name) {
    return result.status(400).send({
      message: "template_name não pode estar vazio"
    });
  }

  // Criar objeto de mensagem
  const message = {
    template_name: request.body.template_name,
    position: 1,   
  };

  // Salva o novo objeto de mensagem no BD
  messageObj.create(message).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Algum erro ocorreu ao salvar a mensagem"
    });
  });
};

// Busca todas as messages.
exports.getAllMessages = (request, result) => {
  messageObj.findAll()
    .then(data => {
      result.send(data);
    }).catch(err => {
      result.status(500).send({
        message: err.message || "Algum erro ocorreu ao buscar as incrições"
      });
    });
};

// Pega mensagem pelo ID
exports.getMessageByID = (request, result) => {
  const paramID = request.params.id;
  messageObj.findAll({
    where: { id: paramID }
  }).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Algum erro ocorreu na busca da mensagem com id: ${paramID}`
    });
  });
};
// Atualiza uma mensagem pelo id
exports.updateMessageByID = (request, result) => {
  const paramID = request.params.id;
  console.log(paramID);
  console.log(request.body);
  messageObj.update(request.body, {
    where: { id: paramID }
  }).then(num => {
    console.log(num[0]);
    if (num[0] === 1) {
      result.send({
        message: "a mensagem foi atualizada com sucesso"
      });
    } else {
      result.send({
        message: `Não foi possível atualizar mensagem com id=${paramID}!`
      });
    }
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Erro ao salvar mensagem com id id=${paramID}!`
    });
  });
};

// Deletar message pelo ID
exports.deleteMessageByID = (request, result) => {
  const id = request.params.id;
  messageObj.destroy({
    where: { id: id }
  }).then(num => {
    if (num === 1) {
      result.send({
        message: "mensagem deletada com sucesso"
      });
    } else {
      result.send({
        message: `Não foi possível deletar mensagem com id=${id}!`
      });
    }
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Não foi possível deletar mensagem com id=${id}!`
    });
  });
};



