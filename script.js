
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

function pegarCarta(){
    const darCarta = document.getElementById('DarCarta')
    const base = document.getElementById('Base')
    const embaralhando = document.getElementById('Embaralhando')

    base.classList.add('hidden')
    embaralhando.classList.remove('hidden')
    setTimeout(() => {embaralhando.classList.add('hidden') }, 2000);
    setTimeout(() => {darCarta.classList.remove('hidden')}, 2000);
    setTimeout(() => { darCarta.classList.add('hidden') }, 4000);   
    setTimeout(() => {base.classList.remove('hidden')}, 4000);
   
  
};


