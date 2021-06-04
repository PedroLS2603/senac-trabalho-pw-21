//1 jogador e 1 bot 
//-> valores: ás = 1 (11 se estiver na mao com k q ou j)
//-> 10 k q e j = 10
//-> as demais cartas são o número que estão nelas
// jogador e bot começam ambos com 2 cartas
// cartas do jogador as 2 viradas pra cima
// carta do bot 1 pra cima e uma virada pra baixo
// bot pede cartas até ter 17 ou mais
// comandos = hit/stand/surrender

const baralho = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'K', 'Q', 'J'];
const naipe = ['Espadas', 'Copas', 'Paus', 'Ouros'];

function getNomeDaCarta(carta, naipe) {
    return `${carta} ${naipe}`;
}

function getNaipeAleatorio() {
    let naipeAleatorio = Math.floor(Math.random()*(naipe.length));
    if (naipeAleatorio < 0) {
        return naipe[0];
    }
    return naipe[naipeAleatorio];
}

function getCartaAleatoria() {
    let cartaAleatoria = Math.floor(Math.random()*(baralho.length));
    if (cartaAleatoria < 0) {
        return baralho[0];
    }
    return baralho[cartaAleatoria];
}

//da as 2 primeiras cartas
function getMaoInicial() {
    let primeiraCarta = getNomeDaCarta(getCartaAleatoria(), getNaipeAleatorio());
    let segundaCarta = getNomeDaCarta(getCartaAleatoria(), getNaipeAleatorio());
    return [primeiraCarta, segundaCarta];
}

//da mais 1 carta
function hitMe() {
    let proximaCarta = getNomeDaCarta(getCartaAleatoria(), getNaipeAleatorio());
    return proximaCarta;
}

function stay() {

}

function surrender() {
    
}

function getTamanhoMao(maoDeAlguem) {
    let soma;
    for (let i = 0; i < maoDeAlguem.length; i++) {
        //como eu faço pra atribuir o valor que quero pras letras?
    }
    return soma;
}


let maoJogador;
let maoBot;

maoJogador = getMaoInicial();
maoBot = getMaoInicial();

console.log(maoJogador, maoBot);
//pensando em como faço o bot pedir cartas enquanto a mao dele for menor que 17 e intercalar com as escolhas do jogador
console.log(getTamanhoMao(maoBot));