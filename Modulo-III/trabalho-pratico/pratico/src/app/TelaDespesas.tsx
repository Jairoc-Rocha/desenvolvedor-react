import { useEffect, useState } from "react";
import { carregaDespesas, IDespesa } from "./backend";
import ExibicaoTotal from "./ExibicaoTotal";
import SelecaoAnoMes from "./SelecaoAnoMes";
import TabelaDespesas from "./TabelaDespesas";
import { useHistory, useParams } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

export default function TelaDespesas() {
  const { anoMes } = useParams<{ anoMes: string }>();
  const history = useHistory();
  const [despesas, setDespesas] = useState<IDespesa[]>([]);

  useEffect(() => {
    carregaDespesas(anoMes).then(setDespesas);
  }, [anoMes]);

  return (
    <Container>
      <Box display="flex">
        <Box flex="1">
          <SelecaoAnoMes anoMes={anoMes} onChangeAnoMes={onChangeAnoMes} />
        </Box>
        <ExibicaoTotal despesas={despesas} />
      </Box>
      <TabelaDespesas despesas={despesas} />
    </Container>
  );

  function onChangeAnoMes(anoMes: string) {
    history.push(`/despesas/${anoMes}`);
  }
}
