import { useState } from "react";
import axios from "axios";
import lupa from "./assets/search (1).svg";
import "./App.css";

function App() {
  const [dados, setDados] = useState(null);
  const [input, setInput] = useState("");

  const keyDiego = "";

  const search = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${keyDiego}&lang=pt_br&units=metric`
      )
      .then((data) => setDados(data))
      .catch((error) => console.log(error));
    setInput("");
  };

  return (
    <div>
      <div className="container">
        <div className="form">
          <input
            type="text"
            value={input}
            placeholder="informe uma cidade"
            onChange={({ target }) => setInput(target.value)}
          />
          <button onClick={search}>
            <img className="lupa" src={lupa} alt="lupa" />
          </button>
        </div>

        {dados ? (
          <div className="informacoes-tempo">
            <h2>{dados.data.name}</h2>
            <p>{Math.floor(dados.data.main.temp)}°C</p>

            <div className="dados-tempo">
              <img
                src={`https://openweathermap.org/img/wn/${dados.data.weather[0].icon}.png`}
                alt="icone-info-tempo"
              />
              <p>{dados.data.weather[0].description}</p>
            </div>

            <p className="umidade">Umidade: {dados.data.main.humidity}%</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
