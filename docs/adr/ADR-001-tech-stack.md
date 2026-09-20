# ADR-001: Adopt React Native + NestJS + PostgreSQL with a separate FastAPI AI microservice

| Field | Detail |
|-------|--------|
| **Status** | Accepted |
| **Date** | 18 September 2026 |

## Context

FitFlow must deliver one product across iOS, Android and web, store regulated health data, and provide explainable AI recommendations. Lab 4 showed the design meets its usability goals only marginally, so the stack must support fast iteration on the identified fixes. The team is mid-sized and strongest in TypeScript.

## Decision

- **Frontend:** React Native (with React Native Web) for all client surfaces, including the trainer dashboard.
- **Backend API:** NestJS (Node.js / TypeScript).
- **AI service:** a separate Python / FastAPI microservice.
- **Database:** PostgreSQL as the primary store, with Redis for caching and pub/sub.
- **Object storage:** S3 (or equivalent) for meal photos and media.
- **Identity:** Auth0.

## Consequences

### Positive

- One language across client and API lowers maintenance cost and speeds iteration.
- The richest native-module ecosystem supports camera, wearable and push-notification requirements.
- PostgreSQL gives the compliance posture that health data demands.
- Isolating the AI service allows the model to evolve independently of the main API.

### Negative

- Slightly lower raw rendering performance than Flutter.
- The team must operate two backend languages (TypeScript and Python).

Both are accepted as reasonable trade-offs. A performance-critical screen can drop to a native module if needed.

## Alternatives considered

| Alternative | Weighted score | Reason rejected |
|-------------|:-------------:|-----------------|
| Flutter + FastAPI + PostgreSQL | 4.50 | Rejected mainly on team fit and web surface. |
| KMP + Go + MongoDB | 3.70 | Dual-UI maintenance and a poor fit between MongoDB and relational data. |
| Swift / SwiftUI | n/a | iOS only. |

## References

- [Comparison Matrix](../comparison-matrix.md)
- [Tech Stack Summary](../tech-stack-summary.md)
- [Architecture diagram](../diagrams/architecture-diagram.svg)
