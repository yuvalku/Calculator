import styles from './Calculator.module.css'
import React, {useState, useEffect} from 'react';

function Calculator(){

    const [off, setOff] = useState(true);
    const [expr, setExpr] = useState("");   // expression string
    const display = off ? "" : (expr === "" ? "0" : expr);

    const handleOnOff = () => {
        if(off){
            setExpr("");
            setOff(false);
        }
        else{
            setExpr("");
            setOff(true);
        }
    }

    const append = (s) => {
        if (off) return;
        setExpr((prev) => {
            // prevent double operators (e.g., ++, **, //, --, %%)
            const ops = "+-*/%";
            if (ops.includes(s) && prev && ops.includes(prev.at(-1))) {
                return prev.slice(0, -1) + s;
            }
            // avoid leading zeros like "00"
            if (prev === "0" && /\d/.test(s)) return s;
            return (prev || "") + s;
        });
    };

    const handleNumberClick = (d) => append(d);
    const handleOperator = (op) => append(op);
    const handleDot = () => {
        if (off) return;
        // allow dot if the current number segment has no dot yet
        setExpr((prev) => {
        const parts = prev.split(/([+\-x/%])/); // keep operators
        const last = parts[parts.length - 1] || "";
        if (last.includes(".")) return prev;
        return prev + (last === "" ? "0." : ".");
        });
    };

    const handleEquals = () => {
        if (off) return;
        let res = eval(expr.replace(/x/g, '*')).toString();
        setExpr(res);

    }

    const handleClear = () => {
        if (off) return;
        setExpr("");
    }

    const handleCEClear = () => {
        if (off) return;
        if (expr.length > 0) {
            setExpr(expr.slice(0, -1));
        }
    }

    const handlePrecentage = () => {
        if (off) return;
        setExpr((prev) => prev.replace(/(\d+(\.\d+)?)%/g, "($1/100)"));
    }

    return(<>

        <div>
            <div className={styles["calculator-bg"]}>
                <div className={styles["display"]}>{display}</div>
                <div className={styles["buttons"]}>
                    <button className={styles["on-off"]} onClick={handleOnOff}>On/Off</button>
                    <button className={styles["c"]} onClick={handleClear}>C</button>
                    <button className={styles["c"]} onClick={handleCEClear}>CE</button>
                    <button className={styles["operator"]} onClick={() => handleOperator("%")}>%</button>
                    <button onClick={() => handleNumberClick("7")}>7</button>
                    <button onClick={() => handleNumberClick("8")}>8</button>
                    <button onClick={() => handleNumberClick("9")}>9</button>
                    <button className={styles["operator"]} onClick={() => handleOperator("/")}>/</button>
                    <button onClick={() => handleNumberClick("4")}>4</button>
                    <button onClick={() => handleNumberClick("5")}>5</button>
                    <button onClick={() => handleNumberClick("6")}>6</button>
                    <button className={styles["operator"]} onClick={() => handleOperator("x")}>x</button>
                    <button onClick={() => handleNumberClick("1")}>1</button>
                    <button onClick={() => handleNumberClick("2")}>2</button>
                    <button onClick={() => handleNumberClick("3")}>3</button>
                    <button className={styles["operator"]} onClick={() => handleOperator("-")}>-</button>
                    <button onClick={() => handleNumberClick("0")}>0</button>
                    <button className={styles["button"]} onClick={handleDot}>.</button>
                    <button className={styles["operator"]} onClick={() => handleOperator("+")}>+</button>
                    <button className={styles["equal"]} onClick={handleEquals}>=</button>

                </div>
            </div>
        </div>
    
        
    
    </>)
}

export default Calculator
