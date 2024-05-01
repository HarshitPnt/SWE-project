import React, { useState } from "react";
import styles from "./Poll.module.css";

function Poll() {
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [votes, setVotes] = useState({ red: 0, blue: 0, green: 0 });

  const handleOptionChange = (event) => {
    if (!submitted) {
      setSelectedOption(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption !== "") {
      // Update votes
      setVotes((prevVotes) => ({
        ...prevVotes,
        [selectedOption]: prevVotes[selectedOption] + 1,
      }));
      // Here you can handle the submission, like sending the selected option to a server
      console.log("Submitted option:", selectedOption);
      setSubmitted(true);
    } else {
      alert("Please select an option before submitting.");
    }
  };

  const totalVotes = Object.values(votes).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className={styles.pollContainer}>
      <h2>Vote for your favorite color:</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(votes).map(([color, count]) => (
          <label key={color}>
            <input
              type="radio"
              name="color"
              value={color}
              checked={selectedOption === color}
              onChange={handleOptionChange}
              disabled={submitted}
            />
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </label>
        ))}
        <button type="submit" disabled={submitted}>
          Submit
        </button>
      </form>
      {submitted && (
        <p className={styles.submittedMessage}>Thank you for voting!</p>
      )}
      <div className={styles.voteResults}>
        <h3>Vote Results:</h3>
        {Object.entries(votes).map(([color, count]) => (
          <div key={color}>
            {color.charAt(0).toUpperCase() + color.slice(1)}: {count} vote
            {count !== 1 && "s"}
            <div className={styles.bar}>
              <div
                className={styles.greenBar}
                style={{ width: `${(count / totalVotes) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Poll;
