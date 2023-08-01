import TelaDespesas from "./TelaDespesas";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { IUsuario, obtemUsuario, sair } from "./backend";
import TelaLogin from "./TelaLogin";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

function App() {
  const [usuario, setUsuario] = useState<IUsuario | null>(null);

  useEffect(() => {
    obtemUsuario().then(
      (usuario) => setUsuario(usuario),
      (erro) => setUsuario(null)
    );
  }, []);

  if (usuario) {
    return (
      <div>
        <Box padding="16px 32px" textAlign="right">
          Olá {usuario.nome} <Button onClick={onSair}>Sair</Button>
        </Box>
        <BrowserRouter>
          <Switch>
            <Route path="/despesas/:anoMes">
              <TelaDespesas />
            </Route>
            <Redirect to="/despesas/2021-06" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  } else {
    return <TelaLogin onLogin={setUsuario} />;
  }

  function onSair() {
    sair().then(() => setUsuario(null));
  }
}

export default App;
