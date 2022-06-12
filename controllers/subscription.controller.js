const db = require("../models");
const subscriptionObj = db.subscription;
const Op = db.Sequelize.Op;

// Criar e salvar uma inscrição
exports.create = (request, result) => {
  if (!request.body.email || !request.body.name) {
    return result.status(400).send({
      message: "email e nome não podem estar vazios"
    });
  }

  // Criar objeto de inscrição
  const subscription = {
    email: request.body.email,
    name: request.body.name,
    last_message: 1,
    active: true
  };

  // Salva o novo objeto de inscrição no BD
  subscriptionObj.create(subscription).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Algum erro ocorreu ao salvar a incrição"
    });
  });
};

// Busca todas as subscriptions.
exports.getAllSubscriptions = (request, result) => {
  subscriptionObj.findAll()
    .then(data => {
      result.send(data);
    }).catch(err => {
      result.status(500).send({
        message: err.message || "Algum erro ocorreu ao buscar as incrições"
      });
    });
};

// Pega inscrição pelo ID
exports.getSubscriptionByID = (request, result) => {
  const paramID = request.params.id;
  subscriptionObj.findAll({
    where: { id: paramID }
  }).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Algum erro ocorreu na busca da inscrição com id: ${paramID}`
    });
  });
};
// Atualiza uma inscrição pelo id
exports.updateSubscriptionByID = (request, result) => {
  const paramID = request.params.id;
  console.log(paramID);
  console.log(request.body);
  subscriptionObj.update(request.body, {
    where: { id: paramID }
  }).then(num => {
    console.log(num[0]);
    if (num[0] === 1) {
      result.send({
        message: "a inscrição foi atualizada com sucesso"
      });
    } else {
      result.send({
        message: `Não foi possível atualizar inscrição com id=${paramID}!`
      });
    }
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Erro ao salvar inscrição com id id=${paramID}!`
    });
  });
};

// Deletar subscription pelo ID
exports.deleteSubscriptionByID = (request, result) => {
  const id = request.params.id;
  subscriptionObj.destroy({
    where: { id: id }
  }).then(num => {
    if (num === 1) {
      result.send({
        message: "inscrição deletada com sucesso"
      });
    } else {
      result.send({
        message: `Não foi possível deletar inscrição com id=${id}!`
      });
    }
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Não foi possível deletar inscrição com id=${id}!`
    });
  });
};


// Achar incrição pelo nome do inscrito
exports.getSubscriptionByEmail = (request, result) => {
  const email = request.params.email;
  const condition = email ? { email: email } : null;
  subscriptionObj.findAll({ where: condition }).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Algum erro ocorreu ao buscar a incrição"
    });
  });
};

