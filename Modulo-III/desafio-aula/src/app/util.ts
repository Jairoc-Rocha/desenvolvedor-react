export function formataValor(numero: number): string {
  return numero.toFixed(2).replace(".", ",");
}
