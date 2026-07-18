# Architecture

ComputeForge is a small, production-oriented compute control plane. It separates synchronous API concerns from asynchronous infrastructure work.

## Initial services

### API

The public Node.js/TypeScript service owns authentication, organizations, projects, compute requests, validation, idempotency and read APIs. It persists desired state and publishes provisioning work.

### Provisioner

A queue consumer processes lifecycle jobs through a `ComputeProvider` interface. The first provider is simulated; later providers may target Docker or Kubernetes.

### Usage worker

A later service periodically records resource usage and emits billing events.

## Data flow

1. A client submits `POST /v1/instances` with an idempotency key.
2. The API validates identity, project access, flavor and regional capacity.
3. In one database transaction it creates the instance in `QUEUED` state and writes an outbox event.
4. An outbox publisher sends the event to Redis/BullMQ.
5. The provisioner locks the instance, transitions it to `PROVISIONING`, and invokes the provider.
6. Success transitions the instance to `RUNNING`; failure records an auditable error and applies retry policy.

## Reliability principles

- Explicit lifecycle state machine
- Idempotent write APIs and workers
- Transactional outbox for database/queue consistency
- Optimistic versioning or row locks for state transitions
- Structured logs with correlation IDs
- Dead-letter handling for exhausted jobs
- Audit events for every security-sensitive action and state transition

## Planned boundaries

```text
apps/api             HTTP API and application orchestration
apps/provisioner     asynchronous compute lifecycle worker
apps/usage-worker    metering and billing event worker
packages/database    schema, migrations and repositories
packages/contracts   API and event contracts
packages/config      validated environment configuration
packages/logger      structured logging
packages/testing     fixtures and test containers
```
