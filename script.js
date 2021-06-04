function carregarBaralho() {
    let styleLeftCarta = 0;
    
    for (let i = 0; i <= 5; i++) {
        const novaCarta = document.createElement('div');
        const naipe = document.createElement('img');
        const numero = document.createElement('p');

        styleLeftCarta += 3;

        novaCarta.className = "carta";


        naipe.src = "images/naipeEspadas.png";
        numero.innerText = Math.floor(Math.random() * 10 + 1);

        novaCarta.style.position = "absolute"
        novaCarta.style.left = styleLeftCarta + "px"; 

        document.getElementById('baralho').appendChild(novaCarta)
        
        let cartasBaralho = document.getElementById('baralho').getElementsByClassName('carta')

        const lastCard = cartasBaralho[cartasBaralho.length - 1]

        lastCard.appendChild(naipe)
        lastCard.appendChild(numero)
        console.log(styleLeftCarta)
    }



}
