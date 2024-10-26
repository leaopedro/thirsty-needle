import React from 'react';
import styled from 'styled-components';

const Participants: React.FC = () => (
    <div>
      <Title>Participants Page</Title>
      <p>Details about participants will be displayed here.</p>
    </div>
  );

const Title = styled.h2`
    font-size: 28px;
    color: #333;
`;
export default Participants;