# Clinical Trial Management App

This is a responsive React application for managing clinical trials, allowing users to view participants, trials, and enroll new participants in clinical trials. The application follows a clean architecture and uses TypeScript with modern development best practices.

## Tech Stack

**Frontend**:
- React (with TypeScript)
- Apollo Client (GraphQL Client)
- Styled Components (CSS-in-JS for styling)

**Backend**:
- Node.js (with TypeScript)
- Nest.js Framework
- Apollo Server (GraphQL API)
- Prisma ORM
- PostgreSQL (Database)

**Additional Tools**:
- Docker (for containerizing the PostgreSQL database)
- Jest and React Testing Library (for unit tests)

## Key Features

- **Participants Listing**: Displays a list of participants, fetched from the GraphQL API.
- **Trials Listing**: Lists all clinical trials fetched from the GraphQL API.
- **Enroll a Participant**: Provides a form to enroll a new participant to a clinical trial and determines their eligibility.
- **Responsive Design**: Fully responsive and designed based on the provided Figma file.

## Running the Application

### Prerequisites

- Ensure you have **Node.js** (> 14.0.0) and **Docker** installed.
- Docker is used to run the PostgreSQL database.

### Setup Instructions

1. **Clone the repository**:
   ```sh
   git clone https://github.com/leaopedro/thirsty-needle.git
   cd thirsty-needle
   ```

2. **Run PostgreSQL database with Docker**:
   ```sh
   docker-compose up
   ```
This will start a PostgreSQL instance on `localhost:5432`.

3. **Run migrations to ensure db structure**:
   ```sh
   npx prisma migrate dev
   ```
4. **Install dependencies and start the application**:
   ```sh
   yarn && yarn start
   ```

5. **Access the application**:
   - The application will be running at [http://localhost:3000](http://localhost:3000).

### Running Tests

To run unit tests:
```sh
yarn test
```

## GraphQL API Endpoints

The GraphQL API is served at `/api` and provides the following operations:
- **Query `participants`**: Retrieve all participants.
- **Query `trials`**: Retrieve all clinical trials.
- **Mutation `enrollParticipant`**: Enroll a new participant and determine their eligibility for clinical trials.

### Eligibility Criteria for Participants
A participant is eligible for a clinical trial if:
- **Has Diabetes**
- **Did not have COVID**
- **BMI is between 18 and 30**

> BMI Calculation: **weight (lb) / [height (in)]² x 703**

## Deployment
The application can be containerized using Docker and deployed to any cloud provider or Kubernetes cluster, making it ready for production environments.

Cheers! 🍻
