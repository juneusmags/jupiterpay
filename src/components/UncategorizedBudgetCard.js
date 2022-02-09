import React from 'react'
import { uncategorized_budget_id, useBudget } from '../contexts/BudgetsContext'
import BudgetCard from './BudgetCard'

const UncategorizedBudgetCard = (props) => {
    const {getBudgetExpenses} = useBudget()
    const amount = getBudgetExpenses(uncategorized_budget_id).reduce((total, expense)=> total +expense.amount,0)

    if(amount === 0) return null
  return (
    <BudgetCard amount = {amount} name = "Uncategorized" gray {...props}/>
  )
}

export default UncategorizedBudgetCard