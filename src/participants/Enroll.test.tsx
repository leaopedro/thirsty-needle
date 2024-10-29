// EnrollParticipant.test.tsx
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EnrollParticipant, { GET_TRIALS, ENROLL_PARTICIPANT } from './Enroll';

const mocks = [
  {
    request: {
      query: GET_TRIALS,
    },
    result: {
      data: {
        trials: [
          { id: '1', name: 'Trial 01', participantsCount: 230, __typename: 'Trial' },
          { id: '2', name: 'Trial 02', participantsCount: 577, __typename: 'Trial' },
        ],
      },
    },
  },
  {
    request: {
      query: ENROLL_PARTICIPANT,
      variables: {
        input: {
          name: 'John Doe',
          hasDiabetes: true,
          hadCovid: false,
          heightInInches: 70,
          weightInPounds: 160,
          trialId: '1',
        },
      },
    },
    result: {
      data: {
        enrollParticipant: {
          id: '123',
          name: 'John Doe',
          enrolledAt: '2024-10-26',
          trial: {
            id: '1',
            name: 'Trial 01',
          },
        },
      },
    },
  },
];

describe('EnrollParticipant Component', () => {
  it('should render the enrollment form', () => {
    render(
      <MockedProvider mocks={mocks}>
        <BrowserRouter>
          <EnrollParticipant />
        </BrowserRouter>
      </MockedProvider>
    );

    expect(screen.getByText(/enroll a participant/i)).toBeInTheDocument();
  });

  it('should render trials in the select dropdown', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <BrowserRouter>
          <EnrollParticipant />
        </BrowserRouter>
      </MockedProvider>
    );

    const trialOptions = await screen.findAllByRole('option', { name: /trial/i });
    expect(trialOptions.length).toBeGreaterThan(0);
  });
});
