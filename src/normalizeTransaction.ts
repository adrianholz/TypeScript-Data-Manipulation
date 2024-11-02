import currencyToNumber from "./currencyToNumber.js";
import stringToDate from "./stringToDate.js";

declare global {
  type TransactionPayment = "Cartão de Crédito" | "Boleto";
  type TransactionStatus =
    | "Paga"
    | "Recusada pela operadora de cartão"
    | "Aguardando pagamento"
    | "Estornada";

  interface TransactionAPI {
    Nome: string;
    ID: number;
    Data: string;
    Status: TransactionStatus;
    Email: string;
    ["Valor (R$)"]: string;
    ["Forma de Pagamento"]: TransactionPayment;
    ["Cliente Novo"]: number;
  }

  interface Transaction {
    name: string;
    id: number;
    data: Date;
    status: TransactionStatus;
    email: string;
    currency: string;
    value: number | null;
    payment: TransactionPayment;
    new: boolean;
  }
}

export default function normalizeTransaction(
  transaction: TransactionAPI
): Transaction {
  return {
    name: transaction.Nome,
    id: transaction.ID,
    data: stringToDate(transaction.Data),
    status: transaction.Status,
    email: transaction.Email,
    currency: transaction["Valor (R$)"],
    value: currencyToNumber(transaction["Valor (R$)"]),
    payment: transaction["Forma de Pagamento"],
    new: Boolean(transaction["Cliente Novo"]),
  };
}
