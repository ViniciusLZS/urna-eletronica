let seuVoto = document.querySelector('.info-left li:nth-child(1) span');
let cargo = document.querySelector('.info-left li:nth-child(2) span');
let numeros = document.querySelector('.info-left li:nth-child(3)');
let descricao = document.querySelector('.info-left li:nth-child(4)');
let aviso = document.querySelector('.instrucoes');
let infoRight = document.querySelector('.info-right');

/* VARIAVEIS DE AMBIENTE */
let etapasAtual = 0;
let numero = '';
let votoEmBranco = false;

if(window.matchMedia("(max-width: 500px)").matches){
  alert("SUA TELA POSSUI UMA LARGURA MENOR QUE O RECOMENDADO E PODERÁ APRESENTAR IMPERFEIÇÕES. POR FAVOR SE POSSIVEL COLOQUE SEU APARELHO NA HORIZONTAL.");
}

/* FUNÇÃO PARA A PRIMEIRA PAGINA SEÇÃO DA URNA E FUNÇÃO CORRIGIR */
function comecarEtapa() {
  let etapa = etapas[etapasAtual];
  let numeroHTML = '';
  votoEmBranco = false;
  numero = '';

  for(let i=0; i < etapa.numeros; i++){
    if(i === 0){
      numeroHTML += '<div class="numero pisca"></div>';
    }else{
      numeroHTML += '<div class="numero"></div>';
    }
  }

  seuVoto.style.display = 'none';
  cargo.innerHTML = etapa.titulos;
  numeros.innerHTML = numeroHTML;
  descricao.innerHTML = '';
  aviso.style.display = 'none';
  infoRight.innerHTML = ''; 
}

function atualizaInterface() {

  let etapa = etapas[etapasAtual];
  let candidato = etapa.candidatos.filter((item) =>{
    
    if(item.numero === numero){
      return true;
    } else {
      return false;
    }
  });
  if(candidato.length > 0) {
    
    candidato = candidato[0];
    seuVoto.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br> ${etapa.titulos !== 'VEREADOR' ? `Vice: ` + candidato.vice : ''}`;
    
    let fotosHtml = '';
    
    for(let i in candidato.foto){
      if(candidato.foto[i].small){
        fotosHtml += `<div class="imagem-cadidatos small"><img src="./imagens/${candidato.foto[i].url}" alt="Nicolas Tesla"><p>${candidato.foto[i].legenda}</p></div>`;
      } else {
        fotosHtml += `<div class="imagem-cadidatos"><img src="./imagens/${candidato.foto[i].url}" alt="Nicolas Tesla"><p>${candidato.foto[i].legenda}</p></div>`;
      }  
    }

    infoRight.innerHTML = fotosHtml;
  } else {
    seuVoto.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = '<div class="aviso-maior pisca">VOTO NULO</div>';
  }

}

function clicou (n) {

  let elNumero = document.querySelector('.numero.pisca');
 
  if(elNumero !== null){
    elNumero.innerHTML = n;
    numero = `${numero}${n}`;

    elNumero.classList.remove('pisca');
    if(elNumero.nextElementSibling !== null){
      elNumero.nextElementSibling.classList.add('pisca');
    }else{
      atualizaInterface();
    }
  }
}

function branco() {
    numero = '';
    votoEmBranco = true;
    seuVoto.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    infoRight.innerHTML = '';
    descricao.innerHTML = '<div class="aviso-maior pisca">VOTO EM BRANCO</div>';
  
}

function corrige() {
  comecarEtapa();
}

function confirma() {
  let etapa = etapas[etapasAtual];
  let votoConfirmado = false;

  if((votoEmBranco === true) || (numero.length === etapa.numeros)){
    votoConfirmado = true;
  }

  if(votoConfirmado){
    etapasAtual++;
    if(etapas[etapasAtual] !== undefined){
      comecarEtapa();
    } else {
      document.querySelector('.tela').innerHTML = '<div class="aviso-giga pisca">FIM</div>';
    }
  }
}

comecarEtapa();