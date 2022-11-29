import React from "react";
import Card from "../UI/Card";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  const date = new Date(props.date);
  const dayName = date.toLocaleDateString("en", { weekday: "long" });
  const onlyDate = date.getDate();
  const year = date.getFullYear();

  return (
    <>
      <tr className="expense_item">
        <td className="sno">
          <Card>{props.sno}</Card>
        </td>
        <td className="date">
          <Card className="table_date">
            {onlyDate}/{year} - ({dayName}){" "}
          </Card>
        </td>
        <td className="amounts">
          <Card>{props.amount}</Card>
        </td>
        <td className="notes" >
          <Card>{props.notes}</Card>{" "}
        </td>
        <td className="button">
          <Card>
            <button onClick={props.deleteExpense}>Delete</button>
          </Card>{" "}
        </td>
      </tr>
    </>
  );
};

export default ExpenseItem;
