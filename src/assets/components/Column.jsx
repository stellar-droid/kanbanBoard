//  DROPPABLE COMPONENT

import React from "react";
import styled from "styled-components";
import Task from "./Task";
import "./Main.css";
import { Droppable } from "react-beautiful-dnd";
import { Button } from "@mui/material";

import { useState } from "react";
const Container = styled.div`
  // background-color: #f4f5f7;
  border-radius: 2.5px;
  width: 300px;
  // height: 150vh;
  min-height: 100vh;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border: 1px solid gray;
`;

const Title = styled.h3`
  padding: 8px;
  // background-color: pink;
  text-align: center;
`;

const TaskList = styled.div`
  padding: 3px;
  transistion: background-color 0.2s ease;
  // background-color: #f4f5f7;
  // flex-grow: 1;
  min-height: 5px;
  // height: 10%;
`;

export default function Column({ title, tasks, id, onDelete }) {
  return (
    <>
      <Container className="column">
        <Title
          style={{
            backgroundColor: "#0073e6",
            position: "stick",
          }}
        >
          {title}
        </Title>
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <>
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks.map((task, index) => (
                  <Task
                    key={index}
                    index={index}
                    task={task}
                    onDelete={onDelete}
                  />
                ))}
                {provided.placeholder}
              </TaskList>
            </>
          )}
        </Droppable>
      </Container>
    </>
  );
}
