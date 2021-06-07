function carregarBaralho() {
    let positionTopCarta = 0;
    let positionLeftCarta = 18;
    
    for (let i = 1; i <= 5; i++) {
        const novaCarta = document.createElement('div');
        const naipe = document.createElement('img');
        const texto = document.createElement('p');

        positionTopCarta += 1;
        positionLeftCarta -= 1;

        novaCarta.className = "carta";


        naipe.src = "images/coringa.png";
        texto.innerText = "?";

        novaCarta.style.position = "absolute"
        novaCarta.style.top = positionTopCarta + "px"; 
        novaCarta.style.left = positionLeftCarta + "px"; 

        document.getElementById('baralho').appendChild(novaCarta)
        
        let cartasBaralho = document.getElementById('baralho').getElementsByClassName('carta')

        const lastCard = cartasBaralho[cartasBaralho.length - 1]

        lastCard.appendChild(naipe)
        lastCard.appendChild(texto)

    }



}