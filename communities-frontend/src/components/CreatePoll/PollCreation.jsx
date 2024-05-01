import React, { useState } from "react";
import styles from "./PollCreation.module.css";
import Modal from "react-modal";

function PollCreation({ isOpen, onClose }) {
  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      "Submitted options:",
      options.filter((option) => option.trim() !== "")
    );
    // Here you can handle the submission of the poll options
  };

  return (
    <Modal className={styles.wrapper} isOpen={isOpen} onRequestClose={onClose}>
      <div className={styles.pollCreation}>
        {" "}
        <h2>Create a Poll</h2>{" "}
        <form onSubmit={handleSubmit}>
          {" "}
          <div className={styles.option}>
            <input type="text" placeholder="Enter the title" />
          </div>
          {options.map((option, index) => (
            <div key={index} className={styles.option}>
              {" "}
              <input
                type="text"
                value={option}
                onChange={(event) => handleOptionChange(index, event)}
                placeholder={`Option ${index + 1}`}
              />{" "}
              {index > 1 && (
                <button type="button" onClick={() => handleRemoveOption(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddOption}>
            Add Option
          </button>{" "}
          <button type="submit">Create Poll</button>{" "}
        </form>{" "}
      </div>
    </Modal>
  );
}

export default PollCreation;
