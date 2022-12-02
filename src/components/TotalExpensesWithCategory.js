import React from "react";
import ExpenseChart from "./ExpenseChart";

const TotalExpensesWithCategory = (props) => {
  console.log(props.items);
  console.log(props.month);
  let filteringItemsOnMonth;
  if (props.items) {
    filteringItemsOnMonth = props.items.filter((expense) => {
      return new Date(expense.date).getMonth() == props.month;
    });
  }
  //   console.log(filteringItemsOnMonth)
  const others = filteringItemsOnMonth
    .filter((item) => item.category === "Others")
    .reduce((acc, item) => acc + item.amount, 0);
  const food = filteringItemsOnMonth
    .filter((item) => item.category === "Food")
    .reduce((acc, item) => acc + item.amount, 0);
  const shopping = filteringItemsOnMonth
    .filter((item) => item.category === "Shopping")
    .reduce((acc, item) => acc + item.amount, 0);
  const investment = filteringItemsOnMonth
    .filter((item) => item.category === "Investment")
    .reduce((acc, item) => acc + item.amount, 0);
  const home = filteringItemsOnMonth
    .filter((item) => item.category === "Home")
    .reduce((acc, item) => acc + item.amount, 0);
  const beverages = filteringItemsOnMonth
    .filter((item) => item.category === "Beverages")
    .reduce((acc, item) => acc + item.amount, 0);
  // console.log(others, food, shopping, investment, home, beverages);

  //   const othersTotal = others.reduce((acc, item) =>
  //     acc + item.amount, 0);

  return (
    <div className="list">
      {/* <h3>Total Expenses in this Month</h3> */}
      {/* <ul>
        <li>Food -- {food}</li>
        <li>Home -- {home}</li>
        <li>Shopping -- {shopping} </li>
        <li>Investment -- {investment}</li>
        <li>Beverages --{beverages}</li>
        <li>Others -- {others}</li>
      </ul> */}
      <ExpenseChart foodValue={food} homeValue={home} shoppingValue={shopping} investmentValue={investment} beveragesValue={beverages} othersValue={others}/>
    </div>
  );
};

export default TotalExpensesWithCategory;
