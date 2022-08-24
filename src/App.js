import React, { useState } from "react";
import Produto from "./Produto";

const App = () => {
  const [dados, setDados ] = useState(null)
  const [ status, setStatus ] = useState(null)

   const handeClick = async (event) => {
    setStatus(true)
    const response = await fetch(
      `https://ranekapi.origamid.dev/json/api/produto/${event.target.innerText}`
    );
    const json = await response.json()
    setDados(json)
    console.log(dados);
    setStatus(false)
  }

  return (
    <div>
      <button style={{ margin: '.5rem' }} onClick={handeClick}>Notebook</button>
      <button style={{ margin: '.5rem' }} onClick={handeClick}>Smartphone</button>
      <button style={{ margin: '.5rem' }} onClick={handeClick}>Tablet</button>
      { status && <p>Carregando...</p> }
      { !status && dados && <Produto dados={ dados } /> } 
    </div>
  );
};

export default App;
