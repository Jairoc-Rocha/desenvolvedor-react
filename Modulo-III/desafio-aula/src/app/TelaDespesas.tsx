import { useState } from "react";
import ExibicaoTotal from "./ExibicaoTotal";
import SelecaoAnoMes from "./SelecaoAnoMes";
import TabelaDespesas from "./TabelaDespesas";
import { useHistory, useParams } from "react-router-dom";
import useDespesas from "./useDespesas";
import TabelaDespesasCategoria from "./TabelaDespesasCategoria";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default function TelaDespesas() {
  const { anoMes } = useParams<{ anoMes: string }>();
  const history = useHistory();
  const [aba, setAba] = useState(0);

  const { despesas, total, despesasCategoria } = useDespesas(anoMes);

  return (
    <Container>
      <Box display="flex">
        <Box flex="1">
          <SelecaoAnoMes anoMes={anoMes} onChangeAnoMes={onChangeAnoMes} />
        </Box>
        <ExibicaoTotal total={total} />
      </Box>

      <Tabs centered value={aba} onChange={(evt, novaAba) => setAba(novaAba)}>
        <Tab label="Resumo" />
        <Tab label="Detalhes" />
      </Tabs>
      {aba === 0 && (
        <TabelaDespesasCategoria despesasCategoria={despesasCategoria} />
      )}
      {aba === 1 && <TabelaDespesas despesas={despesas} />}
    </Container>
  );

  function onChangeAnoMes(anoMes: string) {
    history.push(`/despesas/${anoMes}`);
  }
}
