const formulario = document.getElementById("form");
const valorConta = document.getElementById("valor-conta");
const porcentagensGorjeta = document.querySelectorAll(".predefinido");
const porcentagemCustomizada = document.getElementById("porcentagem-customizada");
const numeroDePessoas = document.getElementById("numero-pessoas");
const mensagemErro = document.getElementById("mensagem-de-erro");
const gorjetaPorPessoa = document.getElementById("gorjeta-pessoa");
const gorjetaTotal = document.getElementById("gorjeta-total");
const botaoReset = document.getElementById("reset");

// <--- Valor da Conta --->

let conta = "";

valorConta.addEventListener("input", (e) => {
    conta = Number(e.target.value);

    atualizarCalculo();
});


// <--- Número de Pessoas --->

let pessoas = "";

numeroDePessoas.addEventListener("input", (e) => {

    pessoas = Number(e.target.value);

    if (pessoas === 0) {
        mensagemErro.classList.add("ativo");
        numeroDePessoas.classList.add("erro");

    } else {
        mensagemErro.classList.remove("ativo");
        numeroDePessoas.classList.remove("erro");
    }

    atualizarCalculo();
})

// <--- Botões Porcentagem --->

let gorjeta = 0;

porcentagensGorjeta.forEach((porcentagem) => {

    porcentagem.addEventListener("click", () => {

        gorjeta = Number(porcentagem.dataset.valor);

        atualizarCalculo();

        porcentagensGorjeta.forEach((porcentagem) => {
            porcentagem.classList.remove("selecionado");
        })
        porcentagem.classList.add("selecionado");
    })
})

porcentagemCustomizada.addEventListener("input", (e) => {

    if (e.target.value) {
        gorjeta = Number(e.target.value);

        atualizarCalculo();

        porcentagensGorjeta.forEach((porcentagem) => {
            porcentagem.classList.remove("selecionado");
        }
        )
    }

})

// <--- Cálculos --->

function calcularGorjeta(valorConta, porcentagem, numeroPessoas) {

    if (valorConta <= 0 || porcentagem <= 0 || numeroPessoas <= 0) {
        botaoReset.disabled = true;
        return;
    }

    botaoReset.disabled = false;

    let valorGorjetaPorPessoa = ((valorConta * porcentagem) / 100) / numeroPessoas;

    let valorTotalPorPessoa = (valorConta + ((valorConta * porcentagem) / 100)) / numeroPessoas;

    gorjetaPorPessoa.textContent = `$${valorGorjetaPorPessoa.toFixed(2)}`;
    gorjetaTotal.textContent = `$${valorTotalPorPessoa.toFixed(2)}`;
}

calcularGorjeta(conta, gorjeta, pessoas);

function atualizarCalculo() {
    calcularGorjeta(conta, gorjeta, pessoas);
}

// <--- Botão Reset --->

botaoReset.addEventListener("click", () => {
    conta = 0;
    pessoas = 0;
    gorjeta = 0;

    valorConta.value = "";
    numeroDePessoas.value = "";
    porcentagemCustomizada.value = "";

    gorjetaPorPessoa.textContent = "$0.00";
    gorjetaTotal.textContent = "$0.00";

    porcentagensGorjeta.forEach((porcentagem) => {
        porcentagem.classList.remove("selecionado");
    })
})










