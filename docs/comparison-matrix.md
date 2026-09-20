# FitFlow Redesign: Technology Comparison Matrix

Consolidated findings from Activities 1 to 3 (IT3060 Lab Exercise 05).

## 1. Frontend comparison

### 1.1 Strengths and weaknesses

| Framework | Strengths | Weaknesses |
|-----------|-----------|------------|
| React Native | Largest ecosystem and talent pool (JavaScript/TypeScript); mature native modules for camera, wearables and health SDKs; React Native Web allows real code reuse with the web app; New Architecture (Hermes and JSI) removed the old bridge limitation. | Uses platform-native components, so pixel-level consistency takes more effort; code reuse (about 70 to 80%) is a bit lower than Flutter; custom animation needs more effort. |
| Flutter | Own rendering engine (Impeller) gives consistent UI and strong performance; highest code reuse (about 90 to 95%); single toolchain with hot reload; mobile, web and desktop reach. | Dart is another language for the team to learn and a smaller talent pool; Flutter web is less suited to a public-facing website; some native SDKs lack Flutter packages; larger app size. |
| Kotlin Multiplatform (KMP) | Shares business logic while keeping a fully native UI; adoption growing rapidly among large companies; Compose Multiplatform reached stable iOS support in 2025. | Usually still needs two UIs to build and maintain; weakest web story of the four; smaller ecosystem of cross-platform packages; needs real native knowledge on both platforms. |
| Swift / SwiftUI | Best performance and platform integration on iOS (HealthKit, widgets, watchOS). | iOS only; Android and web would need completely separate codebases at much higher cost, so it does not fit a multi-platform product. |

### 1.2 Scores across key criteria (1 = poor, 5 = excellent)

| Criterion | React Native | Flutter | KMP | Swift / SwiftUI |
|-----------|:-----------:|:-------:|:---:|:---------------:|
| Development speed | 5 | 5 | 3 | 3 |
| Code reusability | 4 | 5 | 3 | 1 |
| Performance | 4 | 5 | 5 | 5 |
| Ecosystem support | 5 | 4 | 3 | 4 |
| Learning curve (team fit) | 5 | 3 | 3 | 2 |
| Web compatibility | 4 | 3 | 1 | 1 |
| AI/ML integration | 4 | 4 | 4 | 4 |
| Real-time features | 5 | 4 | 4 | 4 |
| Maintenance cost | 4 | 4 | 3 | 2 |
| Security | 4 | 4 | 5 | 5 |
| **Total (/50)** | **44** | **41** | **34** | **31** |

**Frontend recommendation:** React Native (with React Native Web for the web surface and trainer dashboard).

## 2. Backend frameworks

| Framework | Strengths | Weaknesses | Fit for FitFlow |
|-----------|-----------|------------|-----------------|
| Node.js / NestJS | Opinionated, enterprise-grade TypeScript framework; strong WebSocket support for live feeds and challenges; shares language and types with the React Native frontend; large hiring pool. | Slower than Go for pure CPU-bound work; more boilerplate than Express. | **Strong:** one language across mobile, web and API suits a mid-sized team. |
| Python / FastAPI | Excellent async performance; auto-generated OpenAPI docs; unmatched access to the Python ML ecosystem. | Different language from the frontend; ML strength is wasted on plain CRUD. | **Strong for the AI service**, not for the whole backend. |
| Go | Top throughput and lowest memory use; excellent concurrency. | Smaller hiring pool; more verbose; weaker ML ecosystem; benefits appear only at very high load. | Capable, but its advantages are not needed at FitFlow's expected scale. |

## 3. Database options

| Database | Scalability | Query performance | Health data handling | Verdict |
|----------|-------------|-------------------|----------------------|---------|
| PostgreSQL | Strong vertical scaling; read replicas and partitioning for horizontal scaling. | Robust relational queries, JSONB for flexible fields, solid indexing. | ACID compliance, row-level security and column-level encryption suit regulated health data. | **Recommended (primary store)** |
| MongoDB | Horizontal scaling through sharding. | Fast document reads, weak for the relational joins FitFlow needs (users, plans, trainers, logs). | Workable, but consistency and auditability are harder to enforce. | Not chosen |
| Firebase (Firestore) | Managed, easy to scale at the start. | Excellent built-in real-time sync; limited queries that can get expensive at scale. | Harder to meet GDPR requirements for data residency and audit control. | Not chosen as primary |
| DynamoDB | Near-unlimited scale. | Very fast key-based access; poor for ad-hoc analytical queries. | Strong AWS compliance, but access patterns are inflexible. | Not chosen |

## 4. Authentication and authorization

| Solution | Strengths | Weaknesses | Fit |
|----------|-----------|------------|-----|
| Auth0 | Mature OAuth 2.1 / OIDC; strong MFA; social login and enterprise SSO; granular RBAC for users vs trainers; broad compliance certifications. | Cost grows with monthly active users. | **Recommended** |
| Firebase Auth | Very fast integration; generous free tier; excellent mobile SDKs. | Basic RBAC; ties the project to Google's ecosystem; weak for trainer/client permissions. | Good for an MVP |
| AWS Cognito | Tight AWS integration; scalable and cost-effective; strong compliance. | Known for a poor developer experience and limited customization. | Viable if fully on AWS |
| Supabase Auth | Open source; integrates with PostgreSQL row-level security; very economical. | Smaller ecosystem; fewer enterprise features. | Strong budget alternative |

## 5. Security, compliance and cost assessment

- **Regulatory:** FitFlow stores health data (weight, workouts, injury history, nutrition), so GDPR-style obligations apply directly, and HIPAA becomes relevant if the app integrates with US healthcare providers. PostgreSQL plus Auth0 gives the clearest path to consent tracking, data export, right-to-erasure and audit logging.
- **Real-time:** NestJS WebSocket gateways backed by Redis pub/sub cover the community feed, challenge updates and trainer notifications.
- **AI integration:** Isolating AI in a FastAPI microservice lets the model be retrained, scaled or replaced independently of the main API.
- **Cost and maintainability:** TypeScript across frontend and backend lowers onboarding cost for a mid-sized team more than any single framework's raw benchmark advantage.

## 6. Criterion weights

| Criterion | Weight | Rationale |
|-----------|:------:|-----------|
| Security and compliance | 20% | The app records health, injury and nutrition data; confidentiality promises were made to participants in Lab 1. |
| Development speed | 20% | The redesign must ship quickly to address the retention problem found in Lab 4. |
| Performance | 15% | In-workout interactions must feel immediate; logging friction was the main concern in Lab 1. |
| Maintainability | 15% | A mid-sized team must support the product long after this project. |
| AI/ML support | 15% | Personalised planning and explainability (UR01, UR05) are key differentiators. |
| Scalability | 10% | Growth is expected but not immediate. |
| Cost | 5% | Relevant, but less important than delivery and compliance. |
| **Total** | **100%** | |

## 7. Weighted decision matrix: full stack options

Each stack is scored 1 to 5 per criterion (score → weighted value).

| Criterion (weight) | Stack A: RN + NestJS + PostgreSQL | Stack B: Flutter + FastAPI + PostgreSQL | Stack C: KMP + Go + MongoDB |
|--------------------|:--------------------------------:|:---------------------------------------:|:---------------------------:|
| Security and compliance (20%) | 5 → 1.00 | 5 → 1.00 | 4 → 0.80 |
| Development speed (20%) | 5 → 1.00 | 4 → 0.80 | 3 → 0.60 |
| Performance (15%) | 4 → 0.60 | 5 → 0.75 | 5 → 0.75 |
| Maintainability (15%) | 5 → 0.75 | 4 → 0.60 | 3 → 0.45 |
| AI/ML support (15%) | 4 → 0.60 | 5 → 0.75 | 3 → 0.45 |
| Scalability (10%) | 4 → 0.40 | 4 → 0.40 | 5 → 0.50 |
| Cost (5%) | 4 → 0.20 | 4 → 0.20 | 3 → 0.15 |
| **Weighted total (/5)** | **4.55** | **4.50** | **3.70** |

## 8. Recommended technology stack

**Stack A (React Native + NestJS + PostgreSQL, plus a FastAPI AI microservice, Redis and Auth0) scores 4.55 / 5.**

The margin over Stack B is small. Flutter with FastAPI is a competitive stack and scores better on raw performance and AI capability. Stack A wins on the two criteria that matter most for this project, development speed and maintainability, because one language (TypeScript) across three layers lets a mid-sized team move faster with less code to maintain. Stack A still uses FastAPI for the AI microservice, so it keeps most of Stack B's AI benefits.

Stack C is the most scalable but the least suitable: it needs two native UIs, has the weakest web story, and MongoDB's document model fits poorly with the relational links between users, plans, trainers and logs.
