import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import Trials from './Trials';
import { GET_TRIALS } from './Trials';

const mocks = [
  {
    request: {
      query: GET_TRIALS,
    },
    result: {
      data: {
        trials: [
          { id: '1', name: 'TestTrial 01', participantsCount: 230, __typename: 'Trial'  },
          { id: '2', name: 'TestTrial 02', participantsCount: 577, __typename: 'Trial'  },
          { id: '3', name: 'TestTrial 03', participantsCount: 80, __typename: 'Trial'  },
        ],
      },
    },
  },
];

describe('Trials Component', () => {
  it('should render loading state initially', () => {
    render(
      <MockedProvider mocks={mocks}>
        <Trials />
      </MockedProvider>
    );
    const loadingElement = screen.getByText(/loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('should render trials after data is loaded', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Trials />
      </MockedProvider>
    );

    const trialElements = await screen.findAllByText(/TestTrial/i);
    expect(trialElements.length).toBe(3);
    expect(screen.getByText(/TestTrial 01/i)).toBeInTheDocument();
    expect(screen.getByText(/230 participants/i)).toBeInTheDocument();
  });

  it('should render error state if there is an error', async () => {
    const errorMock = [
      {
        request: {
          query: GET_TRIALS,
        },
        error: new Error('An error occurred'),
      },
    ];

    render(
      <MockedProvider mocks={errorMock}>
        <Trials />
      </MockedProvider>
    );

    const errorElement = await screen.findByText(/error: an error occurred/i);
    expect(errorElement).toBeInTheDocument();
  });
});
