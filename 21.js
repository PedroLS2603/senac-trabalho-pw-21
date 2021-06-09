var rodada;
var pontosBot = 0;
var pontosJogador = 0;
var maoJogador = [];
var maoBot = [];
var vencedorUltimaRodada;

const baralho = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
const naipe = ['Espadas', 'Copas', 'Paus', 'Ouros'];

function getNomeDaCarta(carta, naipe) {
    return `${carta} ${naipe}`;
}

function getNaipeAleatorio() {
    let naipeAleatorio = Math.floor(Math.random() * (naipe.length));
    let imagemNaipe;

    switch (naipe[naipeAleatorio]) {
        case "Espadas":
            imagemNaipe = "images/naipeEspadas.png";
            break;
        case "Copas":
            imagemNaipe = "images/naipeCopas.png";
            break;
        case "Ouros":
            imagemNaipe = "images/naipeOuros.png";
            break;
        case "Paus":
            imagemNaipe = "images/naipePaus.png";
            break;
    }

    return imagemNaipe;

}

function getCartaAleatoria() {
    let cartaAleatoria = Math.floor(Math.random() * (baralho.length));
    if (cartaAleatoria < 0) {
        return baralho[0];
    }
    return baralho[cartaAleatoria];
}

function makeCarta() {
    const carta = document.createElement('div');

    carta.className = "carta";

    return carta;
}

//da as 2 primeiras cartas
function getMaoInicial() {
    //Dando as cartas do usuario
    for (let i = 0; i < 2; i++) {
        carta = makeCarta()
        carta.id = `cartaPlayer${i}`;

        document.getElementById('cartasJogador').appendChild(carta);

        const naipeCarta = document.createElement('img')

        const textoCarta = document.createElement('p')

        textoCarta.innerText = getCartaAleatoria();
        naipeCarta.src = getNaipeAleatorio();

        const novaCarta = document.querySelectorAll('.campoCartas .carta')[i]


        novaCarta.appendChild(naipeCarta);
        novaCarta.appendChild(textoCarta);

        maoJogador.push(textoCarta.innerText)
    }

    //Dando as cartas do bot
    for (let i = 0; i < 2; i++) {
        const carta = makeCarta();
        carta.id = `cartaBot${i}`;

        document.getElementById('cartasBot').appendChild(carta);

        const naipeCarta = document.createElement('img')
        const textoCarta = document.createElement('p')

        if (i == 0) {
            textoCarta.innerText = "?"
            naipeCarta.src = 'images/coringa.png';
        }
        else {
            textoCarta.innerText = getCartaAleatoria();
            naipeCarta.src = getNaipeAleatorio();
        }

        const novaCarta = document.querySelectorAll('.campoCartas .carta')[i]

        novaCarta.appendChild(naipeCarta);
        novaCarta.appendChild(textoCarta);

        if (i == 0) {
            maoBot.push(getCartaAleatoria())
        }
        else {
            maoBot.push(parseInt(textoCarta.innerText))
        }

    }
    getVencedor();
}

//da mais 1 carta
function hitMe() {
        const carta = document.createElement('div');
        const campoCartas = document.getElementById('cartasJogador')

        carta.className = "carta";

        campoCartas.appendChild(carta);

        const valorCarta = document.createElement('p')
        const naipeCarta = document.createElement('img')

        valorCarta.innerText = getCartaAleatoria();
        naipeCarta.src = getNaipeAleatorio();

        const cartasJogador = campoCartas.getElementsByClassName('carta')


        const novaCarta = cartasJogador[cartasJogador.length - 1]

        novaCarta.appendChild(naipeCarta);
        novaCarta.appendChild(valorCarta);

        maoJogador.push(valorCarta.innerText);
        
        getVencedor();
    }

//mantem a mao e muda a rodada
function stay() {
    if (rodada == 1) {
        rodada = 2;
    } else {
        rodada = 1;
    }
}

function limparCartas() {
    let campoCartas = document.getElementById('cartasJogador')
    let cartas = campoCartas.querySelectorAll('.carta')

    for (let i = 0; i < cartas.length; i++) {
        console.log(cartas);
        campoCartas.removeChild(cartas[i]);
    }

    campoCartas = document.getElementById('cartasBot')
    cartas = campoCartas.querySelectorAll('.carta')

    for (let i = 0; i < cartas.length; i++) {
        campoCartas.removeChild(cartas[i]);
    }
}

//adiciona 1 ponto ao bot e zera as mãos
function surrender() {
    pontosBot += 1;
    rodada = 1;
    maoJogador = [];
    maoBot = [];


    limparCartas();
    getMaoInicial();
    getPlacar();
}

//retorna a soma das cartas na mão
function getTamanhoMao(maoDeAlguem) {
    let soma = 0;
    let arrayAuxiliar = maoDeAlguem.slice();
    for (let i = 0; i < maoDeAlguem.length; i++) {
        if (arrayAuxiliar[i][0] == 'K' || arrayAuxiliar[i][0] == 'Q' || arrayAuxiliar[i][0] == 'J') {
            soma += 10;
        } else if (arrayAuxiliar[i][0] == 'A') {
            if (arrayAuxiliar.includes('K')) {
                soma += 11;
            } else if (arrayAuxiliar.includes('Q')) {
                soma += 11;
            } else if (arrayAuxiliar.includes('J')) {
                soma += 11;
            } else {
                soma += 1;
            }
        } else if (arrayAuxiliar[i].includes(10)) {
            soma += 10;
        } else {
            soma += parseInt(arrayAuxiliar[i][0]);
        }
    }
    return soma;
}

//retorna o placar
function getPlacar() {
    document.getElementById('placar').innerText = `${pontosJogador}W - ${pontosBot}L`
}

//zera o placar
function reset() {
    rodada = 1;
    pontosJogador = 0;
    pontosBot = 0;
    resetMao();

    limparCartas();
    getMaoInicial();
    getPlacar();
}

function resetMao() {
    maoJogador = [];
    maoBot = [];
}

function empate() {
    maoBot = [];
    maoJogador = [];
    rodada = 1;
}

//vai verificar o vencedor para atribuir os pontos
function getVencedor() {
    if(getTamanhoMao(maoJogador) > 21 || getTamanhoMao(maoBot) < 21) {
        pontosBot++;
        alert("Bot venceu");
    }
    else if(getTamanhoMao(maoJogador) == 21 || getTamanhoMao(maoBot) > 21){
        pontosJogador++;
        alert("Jogador venceu");
    }

    limparCartas();
    getPlacar();
    resetMao();
    getMaoInicial();
}

