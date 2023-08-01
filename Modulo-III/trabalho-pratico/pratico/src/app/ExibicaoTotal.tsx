import { IDespesa } from "./backend";
import { formataValor } from "./util";

export default function ExibicaoTotal(props: { despesas: IDespesa[] }) {
  const total = somaDespesas(props.despesas);
  return <div>Despesa total: R$ {formataValor(total)}</div>;
}

function somaDespesas(despesas: IDespesa[]): number {
  let total = 0;
  for (const despesa of despesas) {
    total += despesa.valor;
  }
  return total;
}
