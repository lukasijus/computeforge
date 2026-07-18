# ComputeForge

ComputeForge is an open-source compute control plane built with Node.js and TypeScript.

It exposes APIs for requesting compute instances, schedules provisioning work asynchronously, tracks resource lifecycle state, records usage, and produces auditable billing events.

## Why this project exists

Cloud platforms must coordinate API requests, finite infrastructure capacity, asynchronous provisioning, failures, retries, usage measurement, and billing. ComputeForge explores those backend engineering problems in a small but production-oriented system.

## Core capabilities

- Multi-tenant organizations and projects
- JWT and API-key authentication
- Role-based access control
- Compute flavor and capacity management
- Queue-based asynchronous provisioning
- Explicit resource lifecycle state machines
- Usage metering and billing events
- Idempotent API operations
- Structured logging and audit trails
- Integration and end-to-end tests
- Docker and Kubernetes deployment

## Planned stack

- Node.js and TypeScript
- NestJS
- PostgreSQL and Drizzle ORM
- Redis and BullMQ
- pnpm workspaces
- Vitest and Testcontainers
- Docker and Kubernetes
- OpenAPI
- GitHub Actions

## First milestone

A user can create a project, inspect compute flavors, request a compute instance, observe asynchronous state transitions, terminate the instance, and review its audit history.

See [docs/architecture.md](docs/architecture.md) and the GitHub issues for the implementation roadmap.
