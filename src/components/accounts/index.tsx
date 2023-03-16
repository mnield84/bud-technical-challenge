import { AccountItem } from "./item";
import "./index.css";
import { Account } from "../../../types";
import { Loading } from "../loading";
import { useEffect, useState } from "react";

const isError = (error: unknown): error is Error => {
  return typeof error === "object" && error !== null && "message" in error;
};

export const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("/api/accounts");
        const json = await response.json();
        setAccounts(json);
      } catch (error) {
        if (isError(error)) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <>
      <h1 className="align-left">Your accounts</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="accounts">
          {accounts.map((account) => (
            <AccountItem account={account} key={account.account_id} />
          ))}
        </div>
      )}
    </>
  );
};
