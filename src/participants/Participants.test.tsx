import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Participants, { GET_PARTICIPANTS } from './Participants';

const mocks = [
  {
    request: {
      query: GET_PARTICIPANTS,
    },
    result: {
      data: {
        participants: [
          { id: '1', name: 'TestParticipant 01', enrolledAt: '2024-10-01', __typename: 'Participant' },
          { id: '2', name: 'TestParticipant 02', enrolledAt: '2024-10-15', __typename: 'Participant'  },
        ],
      },
    },
  },
];

describe('Participants Component', () => {
  it('should render the participants list', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <BrowserRouter>
          <Participants />
        </BrowserRouter>
      </MockedProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    const participantElements = await screen.findAllByText(/TestParticipant/i);
    expect(participantElements.length).toBe(2);
  });

  it('should navigate to enroll participant page when enroll button is clicked', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <BrowserRouter>
          <Participants />
        </BrowserRouter>
      </MockedProvider>
    );

    const enrollButton = await waitFor(() => screen.getByText(/Enroll a participant/i));
    fireEvent.click(enrollButton);

    expect(window.location.pathname).toBe('/participants/enroll');
  });
});
