import type { Transaction as TransactionType } from "../../../types";
import { formatDate } from "../../helpers/dateFormatter";
import { formatNumber } from "../../helpers/enGBFormatter";
import { toSentenceCase } from "../../helpers/toSentenseCase";
import { Avatar } from "./avatar";

type Props = {
  transaction: TransactionType;
};

export const Transaction = ({ transaction }: Props) => (
  <tr>
    <td>
      <div className="transaction-detail">
        <Avatar name={transaction.description} />
        <div className="transaction-description">
          {transaction.description}
          <div className="transaction-category">
            {toSentenceCase(transaction.category)}
          </div>
        </div>
      </div>
    </td>
    <td>
      <div>{formatDate(transaction.date)}</div>
    </td>
    <td className="transaction-amount">
      <div className="amount">{formatNumber(transaction.amount.value)}</div>
    </td>
  </tr>
);
