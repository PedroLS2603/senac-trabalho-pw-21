var pontosBot = 0;
var pontosJogador = 0;
var pontosEmpate = 0;
let maoJogador = [];
let maoBot = [];
var resultado;
var comando;

var baralho = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Q', 'J', 'K'];
var naipe = ['Espadas', 'Copas', 'Paus', 'Ouros'];

//Cria o elemento de baralho no canto esquerdo da tela
function carregarBaralho() {
    let positionTopCarta = 0;
    let positionLeftCarta = 18;
    
    for (let i = 1; i <= 5; i++) {
        const novaCarta = document.createElement('div');
        const naipe = document.createElement('img');
        const texto = document.createElement('p');

        positionTopCarta -= 3;
        positionLeftCarta += 3;

        novaCarta.className = "carta";

        naipe.src = "images/coringa.png";
        texto.innerText = "?";

        novaCarta.style.position = "absolute";
        novaCarta.style.top = positionTopCarta + "px"; 
        novaCarta.style.left = positionLeftCarta + "px"; 

        document.getElementById('baralho').appendChild(novaCarta);
        
        let cartasBaralho = document.getElementById('baralho').getElementsByClassName('carta');

        const lastCard = cartasBaralho[cartasBaralho.length - 1];

        lastCard.appendChild(naipe);
        lastCard.appendChild(texto);
    }
}

//Pega um naipe aleatório para a carta
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

//Cria um valor aleatório para ser atribuído para a carta
function getCartaAleatoria() {
    let cartaAleatoria = Math.floor(Math.random() * (baralho.length));
    if (cartaAleatoria < 0) {
        return baralho[0];
    }
    return baralho[cartaAleatoria];
}

//Cria uma carta em branco
function makeCarta() {
    const carta = document.createElement('div');
    carta.className = "carta";

    return carta;
}

//Cria a mão do usuário
function getMaoUsuario() {
    for (let i = 0; i < 2; i++) {
        //Cria a carta em branco e adiciona dentro do campo designado
        const carta = makeCarta();
        carta.id = `cartaPlayer${i}`;
        document.getElementById('cartasJogador').appendChild(carta);

        //Cria os valores e os naipes das cartas
        const naipeCarta = document.createElement('img');
        const textoCarta = document.createElement('p');
        textoCarta.innerText = getCartaAleatoria();
        naipeCarta.src = getNaipeAleatorio();

        //Adiciona os valores e os naipes na carta que foi criada no campo
        const novaCarta = document.querySelectorAll('.campoCartas .carta')[i];
        novaCarta.appendChild(naipeCarta);
        novaCarta.appendChild(textoCarta);

        //Adiciona o valor da carta no array pra tratamentos futuros
        maoJogador.push(textoCarta.innerText);
    }
}

//Mesma coisa que a mão do jogador, só que pro bot
function getMaoBot() {
    for (let i = 0; i < 2; i++) {
        const carta = makeCarta();
        carta.id = `cartaBot${i}`;

        document.getElementById('cartasBot').appendChild(carta);

        const naipeCarta = document.createElement('img');
        naipeCarta.id = `naipeCartaBot${i}`;
        const valorCarta = document.createElement('p');
        valorCarta.id = `valorCartaBot${i}`;

        if (i == 0) {
            valorCarta.innerText = "?";
            naipeCarta.src = 'images/coringa.png';
        }
        else {
            valorCarta.innerText = getCartaAleatoria();
            naipeCarta.src = getNaipeAleatorio();
        }

        const novaCarta = document.querySelectorAll('.campoCartas .carta')[i];

        novaCarta.appendChild(naipeCarta);
        novaCarta.appendChild(valorCarta);

        if (i == 0) {
            maoBot.push(getCartaAleatoria().toString());
        }
        else {
            maoBot.push(valorCarta.innerText);
        }
    }
}

//Dá as 2 primeiras cartas pro bot e pro usuário
function getMaoInicial() {
    getMaoUsuario();
    getMaoBot();
}

//Adiciona mais uma carta
function hitMe() {
    comando = 'hit';

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

    //Após você fazer usa jogada, o bot faz a dele
    botMove();

    //Verifica se sua mão estourou ou não
    if (comando == 'hit' && getTamanhoMao(maoJogador) >= 21) {
        getVencedor();
    }
}

//Mesma coisa que a função de hit, só que pro bot
function hitBot() {
    const carta = document.createElement('div');
    const campoCartas = document.getElementById('cartasBot');

    carta.className = "carta";

    campoCartas.appendChild(carta);

    const valorCarta = document.createElement('p');
    const naipeCarta = document.createElement('img');

    valorCarta.innerText = getCartaAleatoria();
    naipeCarta.src = getNaipeAleatorio();

    const cartasBot = campoCartas.getElementsByClassName('carta');


    const novaCarta = cartasBot[cartasBot.length - 1];

    novaCarta.appendChild(naipeCarta);
    novaCarta.appendChild(valorCarta);

    maoBot.push(valorCarta.innerText);

    if (comando == 'hit' && getTamanhoMao(maoBot) >= 21) {
        getVencedor();
    }
}

//Definindo a ação do bot depois de você ter feito sua jogada
function botMove() {
    switch (comando) {
        case 'hit':
            if (getTamanhoMao(maoBot) <= 17) {
                hitBot();
            }
            break;
        case 'stand':
            while (getTamanhoMao(maoBot) <= 17) {
                hitBot();
            }
            break;
    }
}

//Para de pedir as cartas e segue a partida até o fim
function stand() {
    comando = 'stand';
    botMove();
    getVencedor();
}

//Limpa as cartas da mesa
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

//Adiciona 1 ponto ao bot e zera as mãos
function render() {
    pontosBot++;
    resultado = 'Você perdeu'

    popUp();
    getPlacar();
    resetMao();
}

//Retorna a soma das cartas na mão
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

//Atualiza o placar
function getPlacar() {
    document.getElementById('placar').innerText = `${pontosJogador}W - ${pontosEmpate}E - ${pontosBot}L`;
}

//Zera o placar e começa uma nova sequência de partidas
function reset() {
    pontosJogador = 0;
    pontosBot = 0;
    pontosEmpate = 0;

    getPlacar();
    resetMao();
    limparCartas();
    getMaoInicial();
}

//Reseta os valores dos arrays das mãos
function resetMao() {
    maoJogador = [];
    maoBot = [];
}

//Encerra a partida
function encerrar() {
    getPlacar();
    resetMao();
}

//Revela a carta virada para baixo do bot
function revelarCartaBot() {
    let naipeCartaBaixo = document.getElementById('naipeCartaBot0')
    let valorCartaBaixo = document.getElementById('valorCartaBot0')

    naipeCartaBaixo.src = getNaipeAleatorio();
    valorCartaBaixo.innerText = maoBot[0];
}

//Vai verificar o vencedor para atribuir os pontos
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
            pontosEmpate++;
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
            pontosEmpate++;
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
            pontosEmpate++;
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

//Mostra um popup que pergunta se deseja continuar jogando
function popUp() {
    document.getElementById('resultado').innerText = `${resultado}!`

    document.getElementById('jogo').style.opacity = '.3';
    document.getElementById('popUp').style.visibility = 'visible';
    document.getElementById('placar').style.visibility = 'hidden';

}

//No caso de querer continuar jogando, continua a sequência de partidas
function continuarJogando() {
    document.getElementById('jogo').style.opacity = '1';
    document.getElementById('popUp').style.visibility = 'hidden';
    document.getElementById('placar').style.visibility = 'visible';

    limparCartas();
    getMaoInicial();
}
