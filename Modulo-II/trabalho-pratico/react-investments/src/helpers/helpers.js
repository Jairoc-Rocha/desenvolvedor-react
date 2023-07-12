const MoneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const MONTH = [
  "",
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

function getMonthNameFrom(monthNumber) {
  return MONTH[monthNumber];
}

function formatMoney(value) {
  return MoneyFormatter.format(value);
}

function formatPercent(value) {
  return value.toFixed(2).replace(".", ",") + "%";
}

export { getMonthNameFrom, formatMoney, formatPercent };
