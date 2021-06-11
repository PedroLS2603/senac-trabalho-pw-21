var pontosBot = 0;
var pontosJogador = 0;
let maoJogador = [];
let maoBot = [];
var resultado;
var comando;
var temp;

var baralho = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Q', 'J', 'K'];
var naipe = ['Espadas', 'Copas', 'Paus', 'Ouros'];

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

function getMaoUsuario() {
    for (let i = 0; i < 2; i++) {
        const carta = makeCarta()
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
}

function getMaoBot() {
    for (let i = 0; i < 2; i++) {
        const carta = makeCarta();
        carta.id = `cartaBot${i}`;

        document.getElementById('cartasBot').appendChild(carta);

        const naipeCarta = document.createElement('img')
        naipeCarta.id = `naipeCartaBot${i}`;
        const valorCarta = document.createElement('p')
        valorCarta.id = `valorCartaBot${i}`;

        if (i == 0) {
            valorCarta.innerText = "?"
            naipeCarta.src = 'images/coringa.png';
        }
        else {
            valorCarta.innerText = getCartaAleatoria();
            naipeCarta.src = getNaipeAleatorio();
        }

        const novaCarta = document.querySelectorAll('.campoCartas .carta')[i]

        novaCarta.appendChild(naipeCarta);
        novaCarta.appendChild(valorCarta);

        if (i == 0) {
            maoBot.push(getCartaAleatoria().toString())
        }
        else {
            maoBot.push(valorCarta.innerText)
        }
    }
}

//da as 2 primeiras cartas
function getMaoInicial() {
    
    //Dando as cartas do usuario
    getMaoUsuario();
    //Dando as cartas do bot
    getMaoBot();

    console.log(maoBot);
    console.log(getTamanhoMao(maoBot));
}

//da mais 1 carta
function hitMe() {
    comando = 'hit'

    const carta = makeCarta();
    const campoCartas = document.getElementById('cartasJogador')

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
    botMove();

    if(comando == 'hit' && getTamanhoMao(maoJogador) >=21) {
        getVencedor();
    }
}

function hitBot () {
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
}

function botMove() {
    switch(comando){
        case 'hit':
            if(getTamanhoMao(maoBot) <= 17){
                hitBot();
            }
            break;
        case 'stand':
            while(getTamanhoMao(maoBot) <= 17){
                hitBot();
            }
            break;
    }

}

//mantem a mao e muda a rodada
function stand() {
    comando = 'stand';
    botMove();
    getVencedor();
}

function limparCartas() {
    let campoCartas = document.getElementById('cartasJogador')
    let cartas = campoCartas.querySelectorAll('.carta')

    for (let i = 0; i < cartas.length; i++) {
        campoCartas.removeChild(cartas[i]);
    }

    campoCartas = document.getElementById('cartasBot')
    cartas = campoCartas.querySelectorAll('.carta')

    for (let i = 0; i < cartas.length; i++) {
        campoCartas.removeChild(cartas[i]);
    }
}

//adiciona 1 ponto ao bot e zera as mãos
function render() {
    pontosBot++;
    resultado = 'Você perdeu'

    popUp();
    getPlacar();
    resetMao();
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

function encerrar() {
    getPlacar();
    resetMao();
}

function revelarCartaBot() {
    let naipeCartaBaixo = document.getElementById('naipeCartaBot0')
    let valorCartaBaixo = document.getElementById('valorCartaBot0')

    naipeCartaBaixo.src = getNaipeAleatorio();
    valorCartaBaixo.innerText = maoBot[0];

}

//vai verificar o vencedor para atribuir os pontos
function getVencedor() {
    if (getTamanhoMao(maoJogador) > 21 || getTamanhoMao(maoBot) > 21) {
        if (getTamanhoMao(maoBot) > getTamanhoMao(maoJogador)) {
            pontosJogador++;
            resultado = 'Você venceu';
            comando = 'parar';
            revelarCartaBot()
            encerrar()
            popUp()

        } else if (getTamanhoMao(maoJogador) == getTamanhoMao(maoBot)) {
            empate();
            resultado = 'Empate';
            comando = 'parar'
            revelarCartaBot()
            encerrar()
            popUp()
        }
        else {
            pontosBot++;
            resultado = 'Você perdeu';
            comando = 'parar'
            revelarCartaBot()
            encerrar();
            popUp();
        }
    }
    else if (getTamanhoMao(maoJogador) == 21 || getTamanhoMao(maoBot) == 21) {
        if (getTamanhoMao(maoJogador) > getTamanhoMao(maoBot)) {
            pontosJogador++;
            resultado = 'Você venceu';
            comando = 'parar'
            revelarCartaBot()
            encerrar();
            popUp();
        } else if (getTamanhoMao(maoJogador) == getTamanhoMao(maoBot)) {
            empate();
            comando = 'parar'
            resultado = 'Empate';
            revelarCartaBot()
            encerrar();
            popUp();
        } 
        else {
            pontosBot++;
            comando = 'parar'
            resultado = 'Você perdeu';
            revelarCartaBot()
            encerrar();
            popUp();

        }
    }
    else if (getTamanhoMao(maoJogador) < 21 || getTamanhoMao(maoBot) < 21) {
        if (getTamanhoMao(maoJogador) > getTamanhoMao(maoBot)) {
            pontosJogador++;
            resultado = 'Você venceu';
            comando = 'parar'
            revelarCartaBot()
            encerrar();
            popUp();
        } else if (getTamanhoMao(maoJogador) == getTamanhoMao(maoBot)) {
            empate();
            comando = 'parar'
            resultado = 'Empate';
            revelarCartaBot()
            encerrar();
            popUp();
        } 
        else {
            pontosBot++;
            comando = 'parar'
            resultado = 'Você perdeu';
            revelarCartaBot()
            encerrar();
            popUp();

        }
    }
}

function popUp() {
    document.getElementById('resultado').innerText = `${resultado}!`

    document.getElementById('jogo').style.opacity = '.3';
    document.getElementById('popUp').style.visibility = 'visible';
    document.getElementById('placar').style.visibility = 'hidden';

}

function continuarJogando() {
    document.getElementById('jogo').style.opacity = '1';
    document.getElementById('popUp').style.visibility = 'hidden';
    document.getElementById('placar').style.visibility = 'visible';

    limparCartas();
    getMaoInicial();
}