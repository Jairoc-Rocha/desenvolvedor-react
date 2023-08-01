export interface IDespesa {
  id: number,
  descricao: string,
  categoria: string,
  valor: number,
  mes: string,
  dia: string
}

export interface IUsuario {
  email: string,
  nome: string
}

export function carregaDespesas(mes: string): Promise<IDespesa[]> {
  return fetch(`http://localhost:3001/despesas?mes=${mes}&_sort=dia`, {
    credentials: "include"
  })
    .then(trataResposta);
}

export function entrar(email: string, senha: string): Promise<IUsuario> {
  return fetch(`http://localhost:3001/sessao/criar`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      senha
    })
  })
    .then(trataResposta);
}

export function sair(): Promise<void> {
  return fetch(`http://localhost:3001/sessao/finalizar`, {
    method: "POST",
    credentials: "include"
  })
    .then(trataResposta);
}

export function obtemUsuario(): Promise<IUsuario> {
  return fetch(`http://localhost:3001/sessao/usuario`, {
    credentials: "include"
  })
    .then(trataResposta);
}

function trataResposta(response: Response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Erro ao carregar dados");
  }
}