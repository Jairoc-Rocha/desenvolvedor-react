import { formataValor } from "./util";

export default function ExibicaoTotal(props: { total: number }) {
  return <div>Despesa total: R$ {formataValor(props.total)}</div>;
}
