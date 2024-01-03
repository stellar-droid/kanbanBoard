import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DeviceList = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Device 1' },
    { id: 2, name: 'Device 2' },
    { id: 3, name: 'Device 3' },
  ]);

  // ... rest of the component

const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) return;
  
    const reorderedDevices = Array.from(devices);
    const [removed] = reorderedDevices.splice(source.index, 1);
    reorderedDevices.splice(destination.index, 0, removed);
  
    setDevices(reorderedDevices);
  };
  
return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="device-list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {devices.map((device, index) => (
              <Draggable key={device.id} draggableId={device.id} index={index}>
                {(provided, snapshot) => (
                    
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {/* Render device name and preview */}
                    <div className="device-item">
                      {snapshot.isDragging ? (
                        <div className="device-preview">{device.name}</div>
                      ) : (
                        <div className="device-name">{device.name}</div>
                      )}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DeviceList;