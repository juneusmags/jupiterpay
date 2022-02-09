import React, { useState } from 'react'
import { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {v4 as uuidv4} from 'uuid'

const BudgetsContext = React.createContext()

export const uncategorized_budget_id = "Uncategorized"

export function useBudget(){
    return useContext(BudgetsContext)
}


export const BudgetsProvider = ({children}) =>{
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

     
    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    function addExpense({description, amount, budgetId}){
        setExpenses(prevExpenses =>{
            
            return [...prevExpenses, {id:uuidv4(), description, amount, budgetId}]
        })
    }
    function addBudget({name, max}){
        setBudgets(prevBudgets =>{
            if(prevBudgets.find(budget => budget.name === name)){
                return prevBudgets
            }
            return [...prevBudgets, {id:uuidv4(), name, max}]
        })
    }
    function deleteBudget({id}){
        setExpenses(prevExpenses => {
            return prevExpenses.map((expense)=>{
                if (expense.budgetId !== id) return expense
                return {...expense, budgetId : uncategorized_budget_id}
            })
        })
        setBudgets(prevBudgets =>{
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }
    function deleteExpense({id}){
        setExpenses(prevExpenses =>{
            return prevExpenses.filter(budget => budget.id !== id)
        })
    }

    return <BudgetsContext.Provider value= {{
        budgets, 
        expenses, 
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>{children}</BudgetsContext.Provider>
    
}