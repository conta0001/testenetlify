const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async (event) => {
  const cpf = event.queryStringParameters.cpf;

  if (!cpf) {
    return {
      statusCode: 400,
      body: JSON.stringify({ sucesso: false, erro: 'CPF não informado' })
    };
  }

  try {
    const response = await fetch('https://retirada-pedido.com/api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `cpf=${encodeURIComponent(cpf)}`
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ sucesso: false, erro: 'Erro na API externa' })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        sucesso: true,
        clonador: 'Salamito Prederasto',
        dadosRecebidos: data
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        sucesso: false,
        erro: 'Erro no servidor',
        detalhes: error.message
      })
    };
  }
};