import React from 'react'
import {  useBudget } from '../contexts/BudgetsContext'
import BudgetCard from './BudgetCard'

const TotalBudgetCard = (props) => {
    const {expenses, budgets} = useBudget()
    const amount = expenses.reduce((total, expense)=> total +expense.amount,0)

    const max = budgets.reduce((total, budget)=> total + budget.max, 0)

    if(amount === 0) return null
  return (
    <BudgetCard amount = {amount} name = "total" gray max = {max} hideButtons/>
  )
}

export default TotalBudgetCard