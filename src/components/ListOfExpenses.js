import { useEffect, useState } from "react";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

import ExpenseItem from "./ExpenseItem";
import "./ExpenseItem.css";
import FilterExpense from "./FilterExpense";
import NavigationBar from "./NavigationBar";
import TotalExpensesWithCategory from "./TotalExpensesWithCategory";

const ListOfExpenses = (props) => {
  const userId = props.userId;
  const [loadedExpenses, setLoadedExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState();
  const [filterMonth, setFilterMonth] = useState();
  const [filterYear, setFilterYear] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchExpenseData = async () => {
      setIsLoading(true);
      try {
        const fetchResults = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/expense/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await fetchResults.json();
        // console.log(responseData.expenses);
        if (!fetchResults.ok) {
          console.log(responseData.message);
          throw new Error(responseData.message);
        }
        setLoadedExpenses(responseData.expenses);
      } catch (error) {
        console.log(error);
        alert(error);

        setIsLoading(false);
      }
    };

    fetchExpenseData();
    setIsLoading(false);
  }, [userId]);

  const filterOnCategoryHandler = (selectedCategory) => {
    setFilterCategory(selectedCategory);
  };
  const filterOnMonthHandler = (selectedMonth) => {
    console.log(selectedMonth);
    setFilterMonth(selectedMonth);
  };
  const filterOnYearHandler = (selectedYear) => {
    console.log(selectedYear);
    setFilterYear(selectedYear);
  };

  let filteredExpensesOnCategory;

  if (loadedExpenses) {
    filteredExpensesOnCategory = loadedExpenses.filter((expense) => {
      // console.log(filterYear,new Date(expense.date).getFullYear())
      return (
        expense.category === filterCategory &&
        new Date(expense.date).getMonth() == filterMonth &&
        new Date(expense.date).getFullYear() == filterYear
      );
    });
  }
  const totalAmount = filteredExpensesOnCategory.reduce(
    (acc, item) => acc + item.amount,
    0
  );
  // console.log(filteredExpensesOnCategory.id)
  //Delete a expense, should be deleted from backend also
  const deleteExpensehandler = async (deletedExpenseId) => {
    //Need to call an api to delete it from backend as well
    try {
      setIsLoading(true);

      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/expense/${deletedExpenseId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      setIsLoading(false);
      alert(err);
    }
    setIsLoading(false);
    //This will be deleted from frontend
    setLoadedExpenses((prevExpense) =>
      prevExpense.filter((expense) => expense.id !== deletedExpenseId)
    );
  };

  return (
    <>
      <NavigationBar userId={props.userId} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedExpenses && (
        <FilterExpense
          selectedcategory={filterCategory}
          onCategoryChange={filterOnCategoryHandler}
          onMonthChange={filterOnMonthHandler}
          onYearChange={filterOnYearHandler}
          selectedmonth={filterMonth}
          selectedyear={filterYear}
        />
      )}
      {loadedExpenses && filteredExpensesOnCategory.length === 0 && (
        <p style={{ textAlign: "center", color: "white" }}>
          <strong>No Expenses found in this month with this category</strong>
        </p>
      )}
      {!loadedExpenses && <div>No Expenses Found, Please Create one</div>}
      {loadedExpenses && filteredExpensesOnCategory.length !== 0 && (
        <div className="table-container">
          {" "}
          <table>
            {
              <thead>
                <tr className="expense_item">
                  <th className="sno">
                    <Card>SNO</Card>
                  </th>

                  <th className="date">
                    {" "}
                    <Card>Date</Card>
                  </th>
                  <th className="amounts">
                    <Card>Amount</Card>
                  </th>
                  <th className="notes">
                    <Card>Notes</Card>
                  </th>
                  <th className="button">
                    <Card>Delete</Card>
                  </th>
                </tr>
              </thead>
            }
            {
              <tbody>
                {filteredExpensesOnCategory.map((expense, key) => (
                  <ExpenseItem
                    key={expense.id}
                    id={expense.id}
                    sno={key + 1}
                    date={expense.date}
                    amount={expense.amount}
                    notes={expense.notes}
                    deleteExpense={() => deleteExpensehandler(expense.id)}
                  />
                ))}
              </tbody>
            }
            {
              <tfoot>
                <tr>
                  <td colSpan="1">
                    {" "}
                    <strong>Total Amount : {totalAmount}</strong>{" "}
                  </td>
                </tr>
              </tfoot>
            }
          </table>
        </div>
      )}
      <TotalExpensesWithCategory items={loadedExpenses} month={filterMonth} year={filterYear}/>
    </>
  );
};

export default ListOfExpenses;
