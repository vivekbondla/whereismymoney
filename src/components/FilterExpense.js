const FilterExpense =(props)=>{

    const categoryChangeHandler =(event)=>{
        props.onCategoryChange(event.target.value)

    }
    const monthChangeHandler =(event)=>{
        props.onMonthChange(event.target.value)

    }
    const yearChangeHandler =(event)=>{
        props.onYearChange(event.target.value)

    }
    return(
        <div className="list_select">
        <select id="category" value={props.selectedcategory} onChange={categoryChangeHandler}>
          <option>-select category-</option>
          <option value="Food">Food</option>
          <option value="Home">Home</option>
          <option value="Investment">Investment</option>
          <option value="Shopping">Shopping</option>
          <option value="Beverages">Beverages</option>
          <option value="Others">Others</option>
        </select>
        <select id='month'  value={props.selectedmonth} onChange={monthChangeHandler}>
          <option>-select month-</option>
          <option value="0">january</option>
          <option value="1">febuary</option>
          <option value="2">march</option>
          <option value="3">april</option>
          <option value="4">may</option>
          <option value="5">june</option>
          <option value="6">july</option>
          <option value="7">august</option>
          <option value="8">september</option>
          <option value="9">october</option>
          <option value="10">november</option>
          <option value="11">december</option>
        </select>
        <select id='year'  value={props.selectedyear} onChange={yearChangeHandler}>
          <option>-select year-</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
        </select>
      </div>
    )
}
export default FilterExpense;