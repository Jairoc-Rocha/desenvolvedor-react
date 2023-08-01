import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useState } from "react";
import { entrar, IUsuario } from "./backend";

export interface ITelaLoginProps {
  onLogin: (usuario: IUsuario) => void;
}

export default function TelaLogin(props: ITelaLoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const ocorreuErro = mensagemErro !== "";

  return (
    <Container>
      <h1>Despesas</h1>
      <p>Digite e-mail e senha para entrar.</p>
      <form onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="E-mail"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          error={ocorreuErro}
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          label="Senha"
          value={senha}
          onChange={(evt) => setSenha(evt.target.value)}
          error={ocorreuErro}
          helperText={mensagemErro}
        />
        <Box textAlign="right" marginTop="1rem">
          <Button variant="contained" color="primary" type="submit">
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );

  function onSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    setMensagemErro("");
    entrar(email, senha).then(
      (usuario) => props.onLogin(usuario),
      (erro) => setMensagemErro("E-mail inexistente ou senha incorreta.")
    );
  }
}
