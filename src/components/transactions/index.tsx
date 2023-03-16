import * as Tabs from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { Transaction as TransactionType } from "../../../types";
import { Loading } from "../loading";
import "./index.css";
import { Transaction } from "./item";

const isExpense = (transaction: TransactionType) =>
  transaction.amount.value < 0;
const isIncome = (transaction: TransactionType) => transaction.amount.value > 0;

const Expenses = ({ transactions }: ITransactions) => {
  return (
    <table aria-label="Expenses">
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.filter(isExpense).map((transaction) => (
          <Transaction transaction={transaction} key={transaction.id} />
        ))}
      </tbody>
    </table>
  );
};

const Income = ({ transactions }: ITransactions) => {
  return (
    <table aria-label="Income">
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.filter(isIncome).map((transaction) => (
          <Transaction transaction={transaction} key={transaction.id} />
        ))}
      </tbody>
    </table>
  );
};

const isError = (error: unknown): error is Error => {
  return typeof error === "object" && error !== null && "message" in error;
};

export const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transactions");
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const json = await response.json();
        setTransactions(json);
      } catch (error: unknown) {
        if (isError(error)) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <>
      <h1 className="align-left">Transaction history</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Tabs.Root defaultValue="expenses" className="flow">
          <Tabs.List
            className="tabs__list"
            aria-label="Filter your transactions"
          >
            <Tabs.Trigger value="expenses">Expenses</Tabs.Trigger>
            <Tabs.Trigger value="income">Income</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content className="TabsContent" value="expenses">
            <Expenses transactions={transactions} />
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="income">
            <Income transactions={transactions} />
          </Tabs.Content>
        </Tabs.Root>
      )}
    </>
  );
};

interface ITransactions {
  transactions: TransactionType[];
  loading?: boolean;
}
