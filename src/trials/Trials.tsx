import React from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

import ChevronRightSvg from '../assets/svg/chevron-right.svg';

export const GET_TRIALS = gql`
  query GetTrials {
    trials {
      id
      name
      participantsCount
    }
  }
`;

type TrialCardProps = {
  name: string;
  participants: number;
};

const Trials: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TRIALS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <TrialsContainer>
      <Title>Trials</Title>
      <TrialsList>
        {data.trials.map((trial: { id: string; name: string; participantsCount: number }) => (
          <TrialCard key={trial.id} name={trial.name} participants={trial.participantsCount} />
        ))}
      </TrialsList>
    </TrialsContainer>
  );
};

const TrialCard: React.FC<TrialCardProps> = ({ name, participants }) => (
  <TrialCardContainer>
    <div>
      <TrialName>{name}</TrialName>
      <ParticipantsCount>{participants} participants</ParticipantsCount>
    </div>
    <ChevronRight src={ChevronRightSvg} />
  </TrialCardContainer>
);

const ChevronRight = styled.img`
  max-width: 5px;
`;

const TrialsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 30px;
`;

const Title = styled.h2`
  font-size: 28px;
  color: #333;
  @media (max-width: 500px) {
    font-size: 20px;
  }
`;

const TrialsList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TrialCardContainer = styled.div`
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

const TrialName = styled.h4`
  color: #000;
  margin-bottom: 0;
`;

const ParticipantsCount = styled.p`
  color: #757575;
  font-size: 14px;
  @media (max-width: 500px) {
    font-size: 10px;
  }
`;

export default Trials;
