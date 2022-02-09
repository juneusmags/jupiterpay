import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useRef } from 'react'
import { uncategorized_budget_id, useBudget } from '../contexts/BudgetsContext'



const ViewExpensesModal = ({budgetId, handleClose}) => {
    
    const {getBudgetExpenses, budgets, deleteBudget, deleteExpense} = useBudget()

    const budget = uncategorized_budget_id ===budgetId ? {name : "Uncategorized", id: uncategorized_budget_id} : budgets.find(b =>b.id === budgetId)

  return (
    <Modal show = {budgetId !==null} onHide = {handleClose}>
        
            <Modal.Header closeButton>

                <Modal.Title>
                    <Stack direction = "horizontal" gap = "2">
                        <div>Expenses - {budget?.name}</div>
                        {budgetId !== uncategorized_budget_id &&(
                            <Button variant = "outline-danger">Delete</Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group  className = "mb-3" controlId = "name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref = {nameRef} type = "text"/>
                </Form.Group>

                <Form.Group className = "mb-3" controlId = "max">
                    <Form.Label>Max Spending</Form.Label>
                    <Form.Control ref = {maxRef} type = "number" required min={0} step ={0.01}/>
                </Form.Group>
                <div className = "d-flex justify-content-end">
                    <Button variant = "primary" type = "submit">Add</Button>
                </div>
            </Modal.Body>
      
    </Modal>
  )
}

export default ViewExpensesModal