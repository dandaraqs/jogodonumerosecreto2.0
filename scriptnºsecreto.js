let listaDeNumerosSorteados = []
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 3;
console.log(numeroSecreto);
exibirMensagemInicial();


function exibirMensagemInicial(){
    mostrarTextoNaTela('h1', 'Jogo do Número Secreto🔥');
    mostrarTextoNaTela('p', 'Você tem 3 tentativas! Escolha um número de 1 a 20!');
}


function verificarChute(){
    let chute = parseInt(document.getElementById('campoChute').value);
    if (numeroSecreto == chute){
        mostrarTextoNaTela('h1', 'Acertou!');
        let mensagemTentativas = `Parabéns! Você acertou o número secreto ${numeroSecreto}!`;
        mostrarTextoNaTela('p', mensagemTentativas);
        limparCampo();
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);
    } else {
        decrementarTentativas();
        darDicas(chute);
        limparCampo();
        anunciarDerrota();
    }
    console.log('o botão foi clicado');
}


function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    exibirMensagemInicial();
    tentativas = 3;

    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
    // precisa colocar a condição dos botões dentro da função, para que eles acompanhem o ritmo do jogo (habilitado -> desabilitado -> habilitado)
}


function darDicas(chute){
    let temperatura = termometro(chute);
    let palavraTentativas = tentativas == 1 ? 'tentativa' : 'tentativas';
    if (numeroSecreto > chute){
        let mensagemChuteMaior = `Está ${temperatura}! O número secreto é maior e você tem ${tentativas} ${palavraTentativas}`;
        mostrarTextoNaTela('p', mensagemChuteMaior);
    } else { 
        let mensagemChuteMenor = `Está ${temperatura}! O número secreto é menor e você tem ${tentativas} ${palavraTentativas}`;
        mostrarTextoNaTela('p', mensagemChuteMenor);
    }
}


function anunciarDerrota(){
    if(tentativas <= 0){
       mostrarTextoNaTela('h1', 'Você perdeu 😔') 
       mostrarTextoNaTela('p', 'Tente novamente!')
       document.getElementById('reiniciar').removeAttribute('disabled');
       document.getElementById('chutar').setAttribute('disabled', true);
    } 
}


function decrementarTentativas(){
    tentativas --;
}


function limparCampo(){
    let campo = document.querySelector('input');
    campo.value = '';
}


function mostrarTextoNaTela(tag, texto){
    let textoExibido = document.querySelector(tag);
    textoExibido.innerHTML = texto;
}


function gerarNumeroAleatorio(){
    let numeroGerado = parseInt(Math.random() *20 + 1);
    let quantidadeDeElementos = listaDeNumerosSorteados.length;

    if(quantidadeDeElementos == 20){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroGerado)){
        return gerarNumeroAleatorio(); // caso o número aleatório já esteja na lista de números sorteados, a função será rodada novamente
    } else {
        listaDeNumerosSorteados.push(numeroGerado); // caso o número não esteja, ele será adicionado à lista e armazenado para o acerto do jogo
        console.log(listaDeNumerosSorteados);
        return numeroGerado;
    }
}


function termometro(chute){
    let diferenca = Math.abs(numeroSecreto - chute);
    if (diferenca <= 2){
        return 'quente 🥵! Tá pertinhooo';
    } else {
        if(diferenca <= 4){
            return 'morno 🙄! Me-lho-re';
        }
        if(diferenca > 4){
            return 'Frio 🥶! Desse jeito, vai perder';
        }
    }
}