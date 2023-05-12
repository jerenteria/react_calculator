import React, { useReducer } from 'react';
import './App.css';
import DigitButton from "./components/DigitButton";
import OperationButton from './components/OperationButton';


export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if(payload.digit === "0" && state.currentOperand === "0") return state;
      if(payload.digit === "." && state.currentOperand.includes(".")) return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      // if the current and prev state of the operant is null dont do anything b/c since there are no numbers we cannot 
      // perform any calculations
      if(state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if(state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation, 
        }
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      // example: if you enter 2 + 2 and click + again the calculator will add the 2 + 2 and then add it to whatever you enter next
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.CLEAR:
      // return empty because when we clear we do not want to return anything
      return {};
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if(state.currentOperand == null) return state;
      if(state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    
    case ACTIONS.EVALUATE:
      if(state.operation == null || state.currentOperand == null || state.previousOperand == null) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        operation: null, 
        previousOperand: evaluate(state)
      }
  }
}

function evaluate ({ currentOperand, previousOperand, operation }) {
  // convert strings to actual number
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  // if they are a not a number for current or prev return empty string bc there is nothing to do
  if(isNaN(prev) || isNaN(current)) return ""
  // otherwise get the computed value; by default our computation results in nothing
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
  }
  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if(operand == null) return
  const [integer, decimal] = operand.split(".")
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)}</div>
  <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

export default App;
