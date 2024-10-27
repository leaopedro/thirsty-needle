import React from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import ChevronRightSvg from '../assets/svg/chevron-right.svg';

export const GET_PARTICIPANTS = gql`
  query GetParticipants {
    participants {
      id
      name
      enrolledAt
    }
  }
`;

type ParticipantCardProps = {
  name: string;
  enrolledAt: string;
};

const formatDate = (enrolledAt: string) => {
  const enrolledAtDate = new Date(enrolledAt);
  const monthName = enrolledAtDate.toLocaleString('default', { month: 'long' });
  const day = enrolledAtDate.getDay();
  const year = enrolledAtDate.getFullYear();


  return `${monthName} ${day}, ${year}`
}

const Participants: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PARTICIPANTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ParticipantsContainer>
      <div>
        <Title>Participants</Title>
        <EnrollButton onClick={() => navigate('/participants/enroll')}>
          Enroll a participant
        </EnrollButton>
      </div>
      
      <ParticipantsList>
        {data.participants.map((participant: { id: string; name: string; enrolledAt: string }) => (
          <ParticipantCard key={participant.id} name={participant.name} enrolledAt={formatDate(participant.enrolledAt)} />
        ))}
      </ParticipantsList>
    </ParticipantsContainer>
  );
};

const ParticipantCard: React.FC<ParticipantCardProps> = ({ name, enrolledAt }) => (
  <ParticipantCardContainer>
    <div>
      <ParticipantName>{name}</ParticipantName>
      <EnrolledAt>Enrolled in {enrolledAt}</EnrolledAt>
    </div>
    <ChevronRight src={ChevronRightSvg} />
  </ParticipantCardContainer>
);

const ChevronRight = styled.img`
  max-width: 5px;
`;

const EnrollButton = styled.button`
  background: #325F64;
  background: #325F64;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  @media (max-width: 500px) {
    font-size: 8px;
  }
`

const ParticipantsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 30px;

  div {
    display: flex;
    justify-content: space-between;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  color: #333;
  margin: 0;
  @media (max-width: 500px) {
    font-size: 20px;
  }
`;

const ParticipantsList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ParticipantCardContainer = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.4s;
  justify-content: space-between;

  &:hover {
    background-color: #f9f9f9;
  }

  font-size: 14px;
  @media (max-width: 500px) {
    font-size: 10px;
  }
  div {
    display: flex;
    align-items: left;
    flex-direction: column;
  }
`;

const ParticipantName = styled.h4`
  color: #000;
  margin-bottom: 0;
`;

const EnrolledAt = styled.p`
  color: #757575;
  font-size: 12px;
  @media (max-width: 500px) {
    font-size: 8px;
  }
`;

export default Participants;
