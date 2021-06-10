var pontosBot = 0;
var pontosJogador = 0;
var botJogou;
let maoJogador = [];
let maoBot = [];

const baralho = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
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
            maoBot.push(getCartaAleatoria());
        }
        else {
            maoBot.push(textoCarta.innerText);
        }

    }
}

function getTamanhoMao(maoDeAlguem) {
    let soma = 0;
    let arrayAuxiliar = maoDeAlguem.slice();
    for (let i = 0; i < maoDeAlguem.length; i++) {
        if (arrayAuxiliar[i][0] == 'K' || arrayAuxiliar[i][0] == 'Q' || arrayAuxiliar[i][0] == 'J') {
            soma += parseInt(10);
        } else if (arrayAuxiliar[i][0] == 'A') {
            if (arrayAuxiliar.includes('K')) {
                soma += parseInt(11);
            } else if (arrayAuxiliar.includes('Q')) {
                soma += parseInt(11);
            } else if (arrayAuxiliar.includes('J')) {
                soma += parseInt(11);
            } else {
                soma += parseInt(11);
            }
        } else if (arrayAuxiliar.includes(10)) {
            soma += parseInt(10);
        } else {
            soma += parseInt(arrayAuxiliar[i][0]);
        }
    }
    return soma;
}

function jogadaBot() {
    if (getTamanhoMao(maoBot) < 17) {
        const carta = document.createElement('div');
        const campoCartas = document.getElementById('cartasBot')

        carta.className = "carta";

        campoCartas.appendChild(carta);

        const valorCarta = document.createElement('p')
        const naipeCarta = document.createElement('img')

        valorCarta.innerText = getCartaAleatoria();
        naipeCarta.src = getNaipeAleatorio();

        const cartasBot = campoCartas.getElementsByClassName('carta')


        const novaCarta = cartasBot[cartasBot.length - 1]

        novaCarta.appendChild(naipeCarta);
        novaCarta.appendChild(valorCarta);

        maoBot.push(valorCarta.innerText);

        botJogou = true;
        return botJogou;
    } else {
        botJogou = false;
        return botJogou;
    }
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
}

//mantem a mao e muda a rodada
function stay() {
    jogadaBot();
    if (botJogou== false) {
        getVencedor();
        getPlacar();
        limparCartas();
        resetMao();
        getMaoInicial();
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
    pontosBot ++;

    getPlacar();
    resetMao()
    limparCartas();
    getMaoInicial();
}

//retorna a soma das cartas na mão


//retorna o placar
function getPlacar() {
    document.getElementById('placar').innerText = `${pontosJogador}W - ${pontosBot}L`;
}

//zera o placar
function reset() {
    pontosJogador = 0;
    pontosBot = 0;

    getPlacar();
    resetMao();
    limparCartas();
    getMaoInicial();
}

function resetMao() {
    maoJogador = [];
    maoBot = [];
}

function empate() {
    resetMao();
}

//vai verificar o vencedor para atribuir os pontos
function getVencedor() {
    if (getTamanhoMao(maoJogador) > 21 || getTamanhoMao(maoBot) > 21) {
        if (getTamanhoMao(maoBot) > getTamanhoMao(maoJogador)) {
            pontosJogador++;
            alert('Jogador');
        } else {
            pontosBot++;
            alert('Bot');
        }
    }
    else if (getTamanhoMao(maoJogador) == getTamanhoMao(maoBot)) {
        empate();
        alert('Empate');
    }
    else if (getTamanhoMao(maoJogador) <= 21 || getTamanhoMao(maoBot) <= 21) {
        if (getTamanhoMao(maoJogador) > getTamanhoMao(maoBot)) {
            pontosJogador++;
            alert('Jogador');
        } else {
            pontosBot++;
            alert('Bot');
        }
    } 
}
