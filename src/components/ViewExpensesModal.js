import React from 'react'
import { Button, Form, Modal, Stack } from 'react-bootstrap'
import { useRef } from 'react'
import { uncategorized_budget_id, useBudget } from '../contexts/BudgetsContext'
import { currencyFormatter } from '../utils'



const ViewExpensesModal = ({budgetId, handleClose}) => {
    
    const {getBudgetExpenses, budgets, deleteBudget, deleteExpense} = useBudget()

    const budget = uncategorized_budget_id === budgetId ? {name : "Uncategorized", id: uncategorized_budget_id} : budgets.find(b =>b.id === budgetId)

    const expenses = getBudgetExpenses(budgetId)
  return (
    <Modal show = {budgetId !=null} onHide = {handleClose}>
        
            <Modal.Header closeButton>

                <Modal.Title>
                    <Stack direction = "horizontal" gap = "2">
                        <div>Expenses - {budget?.name}</div>
                        {budgetId !== uncategorized_budget_id &&(
                            <Button variant = "outline-danger" onClick = {()=>{
                                deleteBudget(budget)
                                handleClose()
                            }}>Delete</Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Stack direction = "vertical" gap = "3">
                   {expenses.map(expense =>(
                       <Stack direction = "horizontal" gap = "2" key ={expense.id}>
                           <div className = "m-auto fs-4">{expense.description}</div>
                           <div className = "m-auto fs-5">{currencyFormatter.format(expense.amount)}</div>
                           <Button onClick = {()=> deleteExpense(expense)} size = "sm" variant = "outline-danger">&times;</Button>
                        </Stack>
                   ))}
               </Stack>
            </Modal.Body>
      
    </Modal>
  )
}

export default ViewExpensesModal