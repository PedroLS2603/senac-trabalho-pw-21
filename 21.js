//1 jogador e 1 bot
//baralho de 52 cartas 
//-> valores: ás = 1 (11 se estiver na mao com k q ou j)
//-> 10 k q e j = 10
//-> as demais cartas são o número que estão nelas
// jogador e bot começam ambos com 2 cartas
// cartas do jogador as 2 viradas pra cima
// carta do bot 1 pra cima e uma virada pra baixo
// bot pede cartas até ter 17 ou mais
// comandos = hit/stand/surrender

const baralho = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'K', 'Q', 'J'];
/* 
--NAIPES--
0 -> ESPADAS
1 -> COPAS
2 -> PAUS
3 -> OUROS
*/
const naipe = [0, 1, 2, 3];

function getNomeDaCarta(carta, naipe) {
    console.log(carta);
    console.log(naipe);
    return `${carta} ${naipe}`;
}

function getNaipeAleatorio() {
    let naipeAleatorio = Math.round(Math.random()*(naipe.length));
    return naipe[naipeAleatorio];
}

function getCartaAleatoria() {
    let cartaAleatoria = Math.round(Math.random()*(baralho.length));
    if (cartaAleatoria < 0) {
        return baralho[0];
    }
    return baralho[cartaAleatoria];
}

//da as 2 primeiras cartas
function getMaoInicial() {
    let primeiraCarta = getNomeDaCarta(getCartaAleatoria(), getNaipeAleatorio());
    let segundaCarta = getNomeDaCarta(getCartaAleatoria(), getNaipeAleatorio());
    return primeiraCarta, segundaCarta;
}

//da mais 1 carta
function hitMe() {
    let proximaCarta = getNomeDaCarta(getCartaAleatoria(), getNaipeAleatorio());
    return proximaCarta;
}

function surrender() {
    
}

let maoJogador = [];
let maoBot = [];

maoJogador.push(getMaoInicial());
maoBot.push(getMaoInicial());
//aqui vai depender dos botoes pra saber qual a opção, não sei fazer essa porra

console.log(maoJogador, maoBot);