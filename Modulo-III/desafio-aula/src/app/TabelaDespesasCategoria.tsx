import { IDespesaCategoria } from "./useDespesas";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { formataValor } from "./util";

export interface ITabelaDespesasCategoriaProps {
  despesasCategoria: IDespesaCategoria[];
}

export default function TabelaDespesasCategoria(
  props: ITabelaDespesasCategoriaProps
) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Categoria</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.despesasCategoria.map((despesaCategoria) => (
            <TableRow key={despesaCategoria.categoria}>
              <TableCell>{despesaCategoria.categoria}</TableCell>
              <TableCell align="right">
                {formataValor(despesaCategoria.valor)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
