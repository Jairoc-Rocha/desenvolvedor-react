import { useEffect, useMemo, useState } from "react";
import { carregaDespesas, IDespesa } from "./backend";


export interface IDespesaCategoria {
  categoria: string,
  valor: number
}

export default function useDespesas(anoMes: string) {
  const [despesas, setDespesas] = useState<IDespesa[]>([]);

  useEffect(() => {
    carregaDespesas(anoMes).then(setDespesas);
  }, [anoMes]);

  return useMemo(() => ({
    despesas: despesas,
    despesasCategoria: somaDespesasPorCategoria(despesas),
    total: somaDespesas(despesas)
  }), [despesas]);
}

function somaDespesas(despesas: IDespesa[]): number {
  console.log("somaDespesas");
  let total = 0;
  for (const despesa of despesas) {
    total += despesa.valor;
  }
  return total;
}

function somaDespesasPorCategoria(despesas: IDespesa[]): IDespesaCategoria[] {
  console.log("somaDespesasPorCategoria");
  let despesasCategoria: IDespesaCategoria[] = [];
  for (const despesa of despesas) {
    const item = despesasCategoria.find(item => item.categoria === despesa.categoria);
    if (item) {
      item.valor += despesa.valor;
    } else {
      despesasCategoria.push({
        categoria: despesa.categoria,
        valor: despesa.valor
      })
    }
  }
  despesasCategoria.sort((v1, v2) => v2.valor - v1.valor)
  return despesasCategoria;
}
