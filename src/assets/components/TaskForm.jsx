// TaskForm.jsx
import React from "react";
import styled from "styled-components";

const FormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  z-index: 1; /* Ensure the form appears above other elements */
`;

const TaskForm = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic

    // Close the form after submission
    onClose();
  };

  return (
    <FormOverlay>
      <FormContainer>
        <h2>Task Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Your form fields go here */}
          <button type="submit">Submit</button>
        </form>
        <button onClick={onClose}>Close</button>
      </FormContainer>
    </FormOverlay>
  );
};

export default TaskForm;
