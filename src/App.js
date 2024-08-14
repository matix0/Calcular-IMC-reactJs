import React, { useState } from "react";
import "./App.css";

const tabelaIMC = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Classificação</th>
          <th>IMC</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Abaixo do Peso</td>
          <td>Abaixo de 18,5</td>
        </tr>
        <tr>
          <td>Peso Normal</td>
          <td>Entre 18,5 e 24,9</td>
        </tr>
        <tr>
          <td>Sobrepeso</td>
          <td>Entre 25 e 29,9</td>
        </tr>
        <tr>
          <td>Obesidade Grau I</td>
          <td>Entre 30 e 34,9</td>
        </tr>
        <tr>
          <td>Obesidade Grau II</td>
          <td>Entre 35 e 39,9</td>
        </tr>
        <tr>
          <td>Obesidade Grau III ou Mórbida</td>
          <td>Maior que 40</td>
        </tr>
      </tbody>
    </table>
  );
};

const fPeso = (p, sp) => {
  return (
    <div>
      <label htmlFor="peso" className="form-label">Peso:</label>
      <input
        id="peso"
        className="form-control"
        type="text"
        value={p}
        onChange={(e) => { sp(e.target.value); }}
      />
    </div>
  );
};

const fAltura = (a, sa) => {
  return (
    <div>
      <label htmlFor="altura" className="form-label">Altura:</label>
      <input
        id="altura"
        className="form-control"
        type="text"
        value={a}
        onChange={(e) => { sa(e.target.value); }}
      />
    </div>
  );
};

const fIdade = (i, si) => {
  return (
    <div>
      <label htmlFor="idade" className="form-label">Idade:</label>
      <input
        id="idade"
        className="form-control"
        type="text"
        value={i}
        onChange={(e) => { si(e.target.value); }}
      />
    </div>
  );
};

const fSexo = (s, ss) => {
  return (
    <div>
      <label htmlFor="sexo" className="form-label">Sexo:</label>
      <select
        id="sexo"
        className="form-control"
        value={s}
        onChange={(e) => { ss(e.target.value); }}
      >
        <option value="male">Masculino</option>
        <option value="female">Feminino</option>
      </select>
    </div>
  );
};

const fCalcularIMC = (p, a, sr) => {
  const calc = () => {
    sr(p / (a * a));
  };
  return (
    <div>
      <button onClick={calc}>Calcular IMC</button>
    </div>
  );
};

const fResultadoIMC = (r) => {
  return (
    <div>
      <p>Resultado IMC: {r.toFixed(2)}</p>
    </div>
  );
};

const fCalcularBMR = (p, a, i, s, sr) => {
  const calc = () => {
    let bmr;
    const pesoNum = parseFloat(p);
    const alturaNum = parseFloat(a);
    const idadeNum = parseFloat(i);

    if (s === 'male') {
      bmr = 88.362 + (13.397 * pesoNum) + (4.799 * alturaNum) - (5.677 * idadeNum);
    } else {
      bmr = 447.593 + (9.247 * pesoNum) + (3.098 * alturaNum) - (4.330 * idadeNum);
    }

    sr(bmr);
  };
  return (
    <div>
      <button onClick={calc}>Calcular BMR</button>
    </div>
  );
};

const fResultadoBMR = (r) => {
  return (
    <div>
      <p>Resultado BMR: {r.toFixed(2)}</p>
    </div>
  );
};

function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('male');
  const [resultadoIMC, setResultadoIMC] = useState(0);
  const [resultadoBMR, setResultadoBMR] = useState(0);

  return (
    <div className="container">
      {/* Calculadora IMC */}
      <div>
        <h2>Cálculo de IMC</h2>
        {fPeso(peso, setPeso)}
        {fAltura(altura, setAltura)}
        {fCalcularIMC(peso, altura, setResultadoIMC)}
        {fResultadoIMC(resultadoIMC)}
      </div>

      {/* Calculadora BMR */}
      <div>
        <h2>Cálculo de BMR</h2>
        {fPeso(peso, setPeso)}
        {fAltura(altura, setAltura)}
        {fIdade(idade, setIdade)}
        {fSexo(sexo, setSexo)}
        {fCalcularBMR(peso, altura, idade, sexo, setResultadoBMR)}
        {fResultadoBMR(resultadoBMR)}
      </div>

      {tabelaIMC()}
    </div>
  );
}

export default App;
