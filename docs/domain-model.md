# Domain model

## Core entities

- **User** — authenticated human identity.
- **Organization** — tenant boundary for users, projects and API keys.
- **Project** — logical owner of compute instances.
- **ApiKey** — machine credential scoped to an organization or project.
- **ComputeFlavor** — requested CPU, memory, GPU and storage profile.
- **ComputeNode** — finite infrastructure capacity in a region.
- **ComputeInstance** — desired and observed lifecycle of a provisioned resource.
- **ProvisioningJob** — asynchronous attempt to change resource state.
- **UsageRecord** — measured resource consumption over a time window.
- **BillingEvent** — immutable chargeable event derived from usage.
- **AuditEvent** — immutable actor/action/history record.

## Instance states

```text
REQUESTED -> QUEUED -> SCHEDULING -> PROVISIONING -> RUNNING
RUNNING -> STOPPING -> STOPPED
STOPPED -> QUEUED
RUNNING|STOPPED -> TERMINATING -> TERMINATED
PROVISIONING -> PROVISIONING_FAILED
TERMINATING -> TERMINATION_FAILED
```

Transitions are validated centrally. Every accepted transition stores the previous state, next state, actor, correlation ID and timestamp.

## Initial invariants

1. An instance belongs to exactly one project.
2. A project belongs to exactly one organization.
3. Only active organization members may mutate project resources.
4. Allocated capacity cannot exceed node capacity.
5. A terminated instance cannot return to an active state.
6. One idempotency key maps to one logical write result within its scope.
7. Billing events are immutable and uniquely tied to their source usage record.
