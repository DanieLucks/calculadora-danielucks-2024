import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
    const [currentValue, setCurrentValue] = useState('0');
    const [pendingOperation, setPendingOperation] = useState(null);
    const [pendingValue, setPendingValue] = useState(null);
    const [completeOperation, setCompleteOperation] = useState('');

    const kaypadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];
    const operations = ['/', '*', '-', '+'];

    const handleClick = (val) => {
        if (val === '.' && currentValue.includes('.')) {
            return;
        }

        setCurrentValue((prevValue) => {
            if (prevValue === '0' && val !== '.') {
                return val;
            } else {
                return prevValue + val;
            }
        });

        setCompleteOperation((prevOperation) => prevOperation + val);
    };

    const handleClear = () => {
        setCurrentValue('0');
        setPendingOperation(null);
        setPendingValue(null);
        setCompleteOperation('');
    };

    const handleDelete = () => {
        setCurrentValue((prevValue) => {
            if (prevValue.length <= 1) {
                return '0';
            } else {
                return prevValue.slice(0, -1); 
            }
        });

        setCompleteOperation((prevOperation) => {
            return prevOperation.slice(0, -1); 
        });
    };

    const handleOperation = (operation) => {
        if (pendingOperation && pendingValue !== null) {
            // Se já houver uma operação pendente, calcula o resultado antes de prosseguir
            handleCalculate();
        }

        setCompleteOperation(currentValue + " " + operation + " ");
        setPendingOperation(operation);
        setPendingValue(currentValue);
        setCurrentValue('0');
    };

    const handleCalculate = () => {
        if (!pendingOperation || !pendingValue) {
            return;
        }

        const num1 = parseFloat(pendingValue);
        const num2 = parseFloat(currentValue);

        let result;

        switch (pendingOperation) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                if (num2 !== 0) {
                    result = num1 / num2;
                } else {
                    setCurrentValue("Error");
                    setCompleteOperation("Error");
                    setPendingOperation(null);
                    setPendingValue(null);
                    return;
                }
                break;
            default:
                break;
        }

        setCompleteOperation(
            pendingValue + " " + pendingOperation + " " + currentValue + " = " + result
        );
        setCurrentValue(result.toString());
        setPendingOperation(null);
        setPendingValue(result.toString()); // Agora o resultado se torna o valor pendente
    };

    return (
        <div className="calculator">
            <div className="visors">
                <div className="complete-operation">{completeOperation}</div>
                <div className="display">{currentValue}</div>
            </div>

            <div className="buttons">
                <div className="first-column">
                    <div className="controllers">
                        <button onClick={handleClear}>AC</button>
                        <button onClick={handleDelete}>DEL</button>
                    </div>
                    <div className="numbers">
                        {kaypadNumbers.map((num) => (
                            <button key={num} onClick={() => handleClick(num)}>{num}</button>
                        ))}

                        <button onClick={handleCalculate}>=</button>
                    </div>
                </div>
                <div className="secont-column">
                    {operations.map((op) => (
                        <button key={op} className={op} onClick={() => handleOperation(op)}>{op}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calculator;

