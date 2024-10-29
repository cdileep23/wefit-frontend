import { FitnessCenterRounded, TimelapseRounded, Delete } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import axios from "axios";

const Card = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  padding: 16px 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 12px 14px;
  }
`;

const Category = styled.div`
  width: fit-content;
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  background: ${({ theme }) => theme.primary + 20};
  padding: 4px 10px;
  border-radius: 8px;
`;

const Name = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
`;

const Sets = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
  display: flex;
  gap: 6px;
`;

const Flex = styled.div`
  display: flex;
  gap: 16px;
`;

const Details = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;

  &:hover {
    color: red;
  }
`;

const WorkoutCard = ({ workout, refreshWorkouts }) => {
  const deleteWorkout = async () => {
   

    try {
     const response= await axios.delete(`http://localhost:8080/api/workout/delete-workout/${workout._id}`, {
      
        withCredentials: true
      });

      console.log(response)

      refreshWorkouts(); // Call the function to refresh the workouts after deletion
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <Card>
      <Category>#{workout?.category}</Category>
      <Name>{workout?.workoutName}</Name>
      <Sets>
        Count: {workout?.sets} sets X {workout?.reps} 10 reps
      </Sets>
      <Flex>
        <Details>
          <FitnessCenterRounded sx={{ fontSize: "20px" }} />
          {workout?.weight} kg
        </Details>
        <Details>
          <TimelapseRounded sx={{ fontSize: "20px" }} />
          {workout?.duration} min
        </Details>
        <DeleteButton onClick={deleteWorkout}>
          <Delete />
        </DeleteButton>
      </Flex>
    </Card>
  );
};

export default WorkoutCard;
