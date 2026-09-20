# FitFlow Redesign

FitFlow mobile app redesign — HCI coursework (IT3060, Lab 05).
Research, design, usability testing and technology architecture.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React Native + React Native Web |
| Backend API | NestJS (Node.js / TypeScript) |
| AI Service | Python / FastAPI |
| Database | PostgreSQL |
| Cache / Real-time | Redis |
| Object Storage | S3 |
| Authentication | Auth0 |

## Architecture
![Architecture](docs/diagrams/architecture-diagram.png)

## Documentation
- [Tech Stack Summary](docs/tech-stack-summary.md)
- [Comparison Matrix](docs/comparison-matrix.md)
- [ADR-001](docs/adr/ADR-001-tech-stack.md)
- Lab 01 — User research and stakeholder analysis
- Lab 02 — Personas, journey maps and requirements
- Lab 03 — Wireframes and low-fidelity prototype
- Lab 04 — Usability testing (SUS 77.75, task success 86.25%)
- Lab 05 — Technology comparison and architecture

## Getting started
```bash
# Frontend
cd frontend && npm install && npm start
# Backend
cd backend && npm install && npm run start:dev
# AI service
cd ai-service && pip install -r requirements.txt && uvicorn app.main:app --reload
```

## Licence
Academic coursework — not licensed for production use.