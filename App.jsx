import React, { useEffect, useRef } from 'react';
import "./App.css";

function App() {
	const buttonRef = useRef(null);
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);

  const handleInput = (index, value) => {
    const currentInput = inputsRef.current[index];
    const nextInput = inputsRef.current[index + 1];

    if (value.length > 1) {
      currentInput.value = value.slice(1);
    }

    if (nextInput !== undefined && nextInput.disabled && value !== '') {
      nextInput.disabled = false;
      nextInput.focus();
    }

    const lastInput = inputsRef.current[inputsRef.current.length - 1];
    const isLastInputActive = !lastInput.disabled && lastInput.value !== '';

    if (isLastInputActive) {
      buttonRef.current.classList.add('active');
    } else {
      buttonRef.current.classList.remove('active');
    }
  };

  const handleKeyUp = (index, e) => {
    if (e.key === 'Backspace') {
      const currentInput = inputsRef.current[index];

      if (currentInput.previousElementSibling !== null) {
        currentInput.value = '';
        currentInput.setAttribute('disabled', true);
        currentInput.previousElementSibling.focus();
      }
    }
  };

  return (
    <div className="container">
      <div className="icon">
        <img src="https://static.vecteezy.com/system/resources/previews/006/310/616/non_2x/security-shield-with-padlock-cartoon-icon-illustration-business-object-icon-concept-isolated-premium-flat-cartoon-style-free-vector.jpg" alt="..." />
      </div>

      <h4>One-Time Password</h4>

      <form>
        <div className="form-group">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              type="number"
              ref={(el) => (inputsRef.current[index] = el)}
              onInput={(e) => handleInput(index, e.target.value)}
              onKeyUp={(e) => handleKeyUp(index, e)}
              disabled={index !== 0}
            />
          ))}
        </div>

        <button ref={buttonRef}>Verify Code</button>
      </form>
    </div>
  );
}

export default App;
