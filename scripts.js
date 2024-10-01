// Variável para armazenar o saldo e o histórico localmente (simulando um banco de dados)
let saldoUsuario = 0.00;
let historicoTransacoes = [];

// Função para atualizar o saldo do usuário na interface
function atualizarSaldo() {
    document.getElementById('saldoUsuario').value = `R$ ${saldoUsuario.toFixed(2)}`;
}

// Função para realizar um depósito
function depositar() {
    const depositAmount = parseFloat(document.getElementById("depositAmount").value);

    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert("Por favor, insira um valor válido para o depósito.");
        return;
    }

    // Atualiza o saldo localmente
    saldoUsuario += depositAmount;

    // Atualiza o saldo na interface
    atualizarSaldo();

    // Adiciona a transação ao histórico
    adicionarTransacao('Depósito', depositAmount);
}

// Função para realizar uma transferência PIX
function transferirPIX() {
    const pixKey = document.getElementById("pixKey").value;
    const pixAmount = parseFloat(document.getElementById("pixAmount").value);

    // Verifica se a chave PIX é um e-mail ou número de telefone
    if (!isValidPixKey(pixKey)) {
        alert("Por favor, insira uma chave PIX válida (e-mail ou número de telefone).");
        return;
    }

    // Verifica se há saldo suficiente para a transferência
    if (saldoUsuario <= 0) {
        alert("Não há saldo suficiente para realizar a transferência.");
        return;
    }

    // Atualiza o saldo localmente (simulação de transferência)
    saldoUsuario -= pixAmount;

    // Atualiza o saldo na interface
    atualizarSaldo();

    // Adiciona a transação ao histórico
    adicionarTransacao(`Transferência PIX para ${pixKey}`, -pixAmount); // O valor da transferência PIX é negativo

    // Limpa os campos após a transferência
    document.getElementById("pixKey").value = "";
    document.getElementById("pixAmount").value = "";
}

// Função para validar a chave PIX (e-mail ou número de telefone)
function isValidPixKey(key) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,11}$/; // Exemplo: aceita números de telefone com 10 ou 11 dígitos

    return emailRegex.test(key) || phoneRegex.test(key);
}

// Função para adicionar uma nova transação ao histórico de transações
function adicionarTransacao(descricao, valor) {
    historicoTransacoes.push({ descricao, valor });

    // Limpa o conteúdo anterior do histórico
    const historyContent = document.getElementById("transactionList");
    historyContent.innerHTML = '';

    // Recria o histórico com todas as transações
    historicoTransacoes.forEach(transacao => {
        const novaTransacao = document.createElement("div");
        novaTransacao.textContent = `${transacao.descricao}: R$ ${transacao.valor.toFixed(2)}`;
        historyContent.appendChild(novaTransacao);
    });
}

// Evento de envio de formulário para depósito
document.getElementById('depositButton').addEventListener('click', function(event) {
    event.preventDefault();
    depositar();
});

// Evento de envio de formulário para transferência PIX
document.getElementById('pixButton').addEventListener('click', function(event) {
    event.preventDefault();
    transferirPIX();
});

// Simulação de histórico inicial ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    atualizarSaldo();
    adicionarTransacao('Depósito Inicial', saldoUsuario); // Adiciona uma transação inicial
});
