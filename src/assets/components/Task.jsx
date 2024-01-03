// DROPPABlE COMPONENT

import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Avatar, Image } from "antd";
import { Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
const Container = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px grey;
  padding: 8px;
  color: #000;
  margin-bottom: 1px;
  min-height: 1px;
  margin-left: 1px;
  margin-right: 1px;
  background-color: ${(props) => bgcolorChange(props)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
`;

const TextContent = styled.div``;

function bgcolorChange(props) {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
    ? props.isBacklog
      ? "#F2D7D5"
      : "#DCDCDC"
    : props.isBacklog
    ? "#F2D7D5"
    : "#EAF4FC";
}

export default function Task({ task, index, onDelete }) {
  return (
    <>
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          style={provided.draggableProps.style}
        >
          <div style={{ display: "flex", justifyContent: "space-between",alignItems:'start', padding: 2 }}>
            <span>
              <small>
                #{task.id}
                {"  "}
              </small>
            </span>
            <div style={{position:'absolute',left:'85%'}}>
            <IconButton onClick={() => onDelete(task.id)} >
            <CloseIcon></CloseIcon>
          </IconButton>
            </div>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", padding: 2 }}
            >
            <TextContent>{task.title}</TextContent>
          </div>
          
          {provided.placeholder}
          
        </Container>
      )}
    </Draggable>
      </>
  );
}
