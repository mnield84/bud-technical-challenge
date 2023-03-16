import { render, screen, fireEvent } from "@testing-library/react";
import { TransactionHistory } from ".";

describe("transaction history", () => {
  test("the expenses tab should be shown by default", async () => {
    render(<TransactionHistory />);

    expect(screen.getByText("Transaction history")).toBeInTheDocument();

    const expensesTabTrigger = await screen.findByRole("tab", {
      name: "Expenses",
    });

    expect(expensesTabTrigger).toHaveAttribute("data-state", "active");

    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });

    expect(expensesTable).toBeInTheDocument();
    expect(screen.getByText("-£20.25")).toBeInTheDocument();
  });

  test("changing between the expenses and income tabs should show different transactions", async () => {
    render(<TransactionHistory />);

    const expensesTabTrigger = await screen.findByRole("tab", {
      name: "Expenses",
    });
    const incomeTabTrigger = screen.getByRole("tab", {
      name: "Income",
    });
    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });
    const incomeTable = screen.queryByRole("table", {
      name: "Income",
    });

    expect(expensesTable).toBeInTheDocument();
    expect(incomeTable).not.toBeInTheDocument();

    expect(screen.getByText("-£20.25")).toBeInTheDocument();

    fireEvent.click(incomeTabTrigger);
    expect(incomeTabTrigger).toHaveAttribute("data-state", "active");
    expect(expensesTabTrigger).toHaveAttribute("data-state", "inactive");
    expect(screen.queryByText("-£20.25")).not.toBeInTheDocument();
  });

  test("loading text should show while fetching", () => {
    render(<TransactionHistory />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("error message should shown if the request fails", async () => {
    jest.spyOn(window, "fetch").mockImplementation(() => {
      return Promise.reject(new Error("Something went wrong"));
    });

    render(<TransactionHistory />);

    expect(await screen.findByText("Something went wrong")).toBeInTheDocument();
  });
});
