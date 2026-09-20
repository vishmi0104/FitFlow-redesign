# FitFlow Redesign: Tech Stack Summary

**Course:** IT3060 Human Computer Interaction, Lab Exercise 05
**Recommended stack:** React Native + NestJS + PostgreSQL, with a separate FastAPI AI microservice (Stack A, weighted score 4.55 / 5)

## 1. Project needs

FitFlow must deliver one consistent product across **iOS, Android and web**, including a trainer dashboard. It stores **regulated health data** (weight, workouts, injury history, nutrition), needs **real-time features** (community feed, challenges, trainer notifications) and provides **explainable AI recommendations** ("Why this plan?"). The team is mid-sized and strongest in TypeScript.

## 2. Selected technologies

| Layer | Technology | Primary reason |
|-------|-----------|----------------|
| Frontend | React Native + React Native Web | One codebase for iOS, Android and web; largest library of native modules (camera, wearables, health SDKs). |
| Backend API | NestJS (Node.js / TypeScript) | Structured, real-time capable (WebSocket gateways) and shares a language with the frontend. |
| AI service | Python / FastAPI | Direct access to the ML ecosystem; can be scaled and retrained independently. |
| Primary database | PostgreSQL | Relational integrity, ACID guarantees, row-level security and column-level encryption for health data. |
| Cache / real-time | Redis | Caching, sessions, leaderboard counters and pub/sub for WebSocket fan-out. |
| Object storage | S3 (or equivalent) | Storage for meal photos and user-uploaded media. |
| Authentication | Auth0 | OAuth 2.1 / OIDC, MFA and role-based access separating users from trainers. |

## 3. Why this stack

- **Speed and maintainability:** TypeScript across frontend and backend lets a mid-sized team share types, tooling and reviewers, which lowers onboarding cost.
- **Compliance:** PostgreSQL plus Auth0 gives the clearest path to consent tracking, data export, right-to-erasure and audit logging (GDPR-style obligations; HIPAA becomes relevant if FitFlow integrates with US healthcare providers).
- **AI isolation:** A separate FastAPI microservice means models can be retrained, scaled or replaced without touching the main API.
- **Real-time:** NestJS WebSocket gateways backed by Redis pub/sub cover the feed, challenges and notifications without a separate real-time platform.

## 4. Trade-offs accepted

- Slightly lower raw rendering performance than Flutter; a performance-critical screen can drop to a native module if needed.
- The team operates two backend languages (TypeScript and Python).

## 5. Alternatives considered

| Alternative | Weighted score | Reason not chosen |
|-------------|---------------|-------------------|
| Stack B: Flutter + FastAPI + PostgreSQL | 4.50 | Extra language (Dart), weaker fit for the web surface and team skills. |
| Stack C: KMP + Go + MongoDB | 3.70 | Two native UIs to maintain, weakest web story, document model does not suit relational data. |
| Swift / SwiftUI | n/a | iOS only; would need separate Android and web codebases. |

## 6. Related documents

- [Comparison Matrix](comparison-matrix.md)
- [ADR-001](adr/ADR-001-tech-stack.md)
- [Architecture diagram](diagrams/architecture-diagram.svg)
