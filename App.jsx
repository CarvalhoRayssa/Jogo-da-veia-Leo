import React ,{useState, useEffect} from 'react';
import './App.css';

const quadroInicial = Array(9).fill('');

const App = () => {
 const [quadro, setQuadro] = useState(quadroInicial);
 const [jogadorAtual, setJogadorAtual] = useState('X');
 const [vencedor, setVencedor] = useState('');
 const [empate, setEmpate] = useState(false);


const handleClick = (index) => {
//verifica se o quadro está preenchido ou empatado ou com vencedores!
if(quadro[index] !==''|| vencedor || empate) { // || (pipe) = OU && = e
return
}

const novoQuadro = [...quadro]; // quebra o array preenchido para fazer um novo
novoQuadro[index] = jogadorAtual; //chama o novo na posição do index e coloca o jogador atual como jogador a ser clicado "X";
setQuadro(novoQuadro); //estado do quadro muda para quadro novo

const proximoJogador = jogadorAtual === 'X' ? 'O' : 'X'; //alterna o jogador
setJogadorAtual(proximoJogador);
}

const calcularVencedor = (quadradin) => {
  const condicoesParaVencer = [[0,1,2], [3,4,5], [6,7,8],//linhas
                               [0,3,6], [1,4,7], [2,5,8],//colunas
                               [0,4,8], [2,4,6]];        //diagonais

  for(let condicao of condicoesParaVencer){
    const[a, b, c] = condicao
    if(
      quadradin[a] && //verifica se tem algum valor dentro da celula
      quadradin[a] === quadradin[b] && //verifica se o valor e posição da célula é igual a outra
      quadradin[a] === quadradin[c] //verifica se o valor e posição da célula é igual a outra 
    ) {return quadradin[a]};
  };

  return null;//retorna null se não tiver vencedor
};

useEffect(() => {
  const verificaVencedor = calcularVencedor(quadro); //verifica se tem um vencedor a cada jogada no quadro

  if(verificaVencedor) {
    setVencedor(verificaVencedor);
  } else if (quadro.every(celula => celula !== '')) {
    /* every(celula) verifica se todas as celulas estão preenchidas e não há um vencedor, então empatou */
    setEmpate(true);
  } else {
    setEmpate(false);
  }
}, [quadro]);

const reiniciar = () => {
  setQuadro(quadroInicial); //reinicia o tabuleiro para o estado inicial
  setJogadorAtual('X');     //começa o jogador atual com X
  setVencedor('');          //define que ainda não há vencedor
  setEmpate(false);         //estado de empate ainda é falso
};

return(
  <div className='app'>
    <h1>Jogo Da Véia!👵🏽</h1>

    <div className='board'> 
    {quadro.map((celula, index) => (
      <div key={index} onClick={() => handleClick(index)} className='cell'>
        {celula}
      </div>
    ))}
    </div>
      {vencedor && (
      <div className='winner-message'>
        <p>O Jogador {vencedor} venceu!</p>
        <button onClick={reiniciar}>Reiniciar</button>
        </div>
    )}

    { empate && (
      <div className='draw-message'>
        <p>O Jogo empatou!</p>
        <button onClick={reiniciar}></button>
      </div>
    )}  
    </div>
      )
    }

export default App;
