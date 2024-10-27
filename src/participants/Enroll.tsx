import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import ErrorSvg from '../assets/svg/error.svg';
import OkSvg from '../assets/svg/ok.svg';

interface FormData {
  name: string;
  heightInInches: number;
  weightInPounds: number;
  hasDiabetes: boolean;
  hadCovid: boolean;
  trial: string;
}

export const GET_TRIALS = gql`
  query GetTrials {
    trials {
      id
      name
      participantsCount
    }
  }
`;

const ENROLL_PARTICIPANT = gql`
  mutation CreateParticipant($input: EnrollParticipantInput!) {
    enrollParticipant(input: $input) {
      id
      name
      enrolledAt
      trial {
        id
        name
      }
    }
  }
`;

const EnrollParticipant: React.FC = () => {
  const [ result, setResult ] = useState<{ success: boolean; message?: string } | undefined>(undefined);
  const { loading, error, data } = useQuery(GET_TRIALS);
  const [enrollParticipant, { data: _mutationData, loading: mutationLoading, error: mutationError }] = useMutation(ENROLL_PARTICIPANT);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    if (mutationError || mutationLoading) return;
    const input = {
      name: data.name,
      hasDiabetes: data.hasDiabetes,
      hadCovid: data.hadCovid,
      heightInInches: Number(data.heightInInches),
      weightInPounds: Number(data.weightInPounds),
      trialId: data.trial,
    };
  
    enrollParticipant({ variables: { input } })
      .then(response => {
        console.log('Participant created:', response.data.enrollParticipant);
        setResult({success: true})
      })
      .catch(err => {
        console.error('Error creating participant:', err);
        setResult({success: false, message: err.message})
      });
  };

  if (result) {
    return (
      <ResultContainer>
        <ResultIcon src={result?.success ? OkSvg : ErrorSvg} />
        <Title>{result?.success ? 'Participant is eligible': 'Participant is not eligible'}</Title>
        <SubTitle>{result?.success ? 'The participant can participate on this study': 'The participant can`t participate on this study'}</SubTitle>
        <Button onClick={() => navigate('/participants')} >Ok</Button>
      </ResultContainer>
    );

  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Title>Enroll a participant</Title>

      <FormField>
        <Label>Name</Label>
        <Input {...register('name', { required: 'This is a required field' })} />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label>Height (inches)</Label>
        <NumberInput type="number" {...register('heightInInches', { required: 'This is a required field' })} />
        {errors.heightInInches && <ErrorMessage>{errors.heightInInches.message}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label>Weight (pounds)</Label>
        <NumberInput type="number" {...register('weightInPounds', { required: 'This is a required field' })} />
        {errors.weightInPounds && <ErrorMessage>{errors.weightInPounds.message}</ErrorMessage>}
      </FormField>

      <FormField>
        <CheckboxLabel>
          <input type="checkbox" {...register('hasDiabetes')} /> I have diabetes
        </CheckboxLabel>
      </FormField>

      <FormField>
        <CheckboxLabel>
          <input type="checkbox" {...register('hadCovid')} /> I had COVID-19
        </CheckboxLabel>
      </FormField>

      <FormField>
        <Label>Trial</Label>
        <Select
          {...register('trial', { required: 'This is a required field' })}
        >
          {loading && <option value="">Loading trials...</option>}
          {error && <option value="">Error loading trials</option>}
          {!loading && !error && (
            <>
              <option value="">Select</option>
              {data.trials.map((trial: {id: string, name: string}) => (
                <option key={trial.id} value={trial.id}>
                  {trial.name}
                </option>
              ))}
            </>
          )}
        </Select>
        {errors.trial && <ErrorMessage>{errors.trial.message}</ErrorMessage>}
      </FormField>

      <Button type="submit">Save</Button>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
`;

const ResultContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 12px;
  color: #333;
  margin-bottom: 8px;
`;

const ResultIcon = styled.img`
  width: 100px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
`;

const NumberInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
  max-width: 80px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const CheckboxLabel = styled.label`
  font-size: 12px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ErrorMessage = styled.span`
  color: #d9534f;
  font-size: 12px;
  margin-top: 4px;
`;

const Button = styled.button`
  background: #325f64;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s;
  max-width: 60px;

  &:hover {
    background: #2a4f53;
  }
`;

export default EnrollParticipant;