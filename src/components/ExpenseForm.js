import NavigationBar from "./NavigationBar";
import Card from "../UI/Card";
import "./ExpenseForm.css";
import { useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

const ExpenseForm = (props) => {
  // console.log(props.userId);

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log(category,amount,date,notes)

    // send this data to backend
    setIsLoading(true);
    try {
      const result = await fetch("http://localhost:5000/api/storeexpense", {
        method: "POST",
        body: JSON.stringify({
          category: category,
          amount: amount,
          date: date,
          notes: notes,
          creator: props.userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await result.json();
      if (!result.ok) {
        alert(responseData.message);
      }
      setAmount("");
      setCategory("");
      setDate("");
      setNotes("");
      setIsLoading(false);
      console.log(responseData);
    } catch (error) {
      setIsLoading(false);

      // console.log(error);
      alert(error);
    }
  };
  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };
  const amountHandler = (event) => {
    setAmount(event.target.value);
  };
  const dateHandler = (event) => {
    setDate(event.target.value);
    // console.log(event.target.value)
  };
  // console.log(date);
  const notesHandler = (event) => {
    setNotes(event.target.value);
  };

  const cancelSendingData = () => {
    setAmount("");
    setCategory("");
    setDate("");
    setNotes("");
  };

  return (
    <>
      <NavigationBar userId={props.userId} />
      {isLoading && <LoadingSpinner asOverlay />}
      
      <Card className="expense_form">
      <p>Add your expense!</p>
        <form onSubmit={formSubmitHandler}>
          <div className="selectinput">
            <select id="category" value={category} onChange={categoryHandler}>
              <option>--select category--</option>
              <option value="Home">Home</option>
              <option value="Food">Food</option>
              <option value="Investment">Investment</option>
              <option value="Shopping">Shopping</option>
              <option value="Beverages">Beverages</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="amount">
            <input
              type="number"
              value={amount}
              placeholder=" Enter Amount"
              onChange={amountHandler}
            />

            <input value={date} type="date" onChange={dateHandler} />
          </div>
          <div className="textnotes">
            <textarea
              rows="5"
              value={notes}
              placeholder="Notes"
              onChange={notesHandler}
            ></textarea>
          </div>
          <div className="actions">
            <button type="reset" onClick={cancelSendingData}>
              Cancel
            </button>
            <button>Add Expense</button>
          </div>
        </form>
      </Card>
    </>
  );
};
export default ExpenseForm;
