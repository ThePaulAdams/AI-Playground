# SaaS Factory Infrastructure Spec

## Overview
A robust multi-tenant foundation that allows new SaaS ventures to be spun up in minutes.

## Requirements
- Centralized Prisma Client with Driver Adapters.
- Global Identity & Access Management (Clerk).
- Scalable PostgreSQL schema.

## Acceptance Criteria
- [x] Prisma 7 configured with `@prisma/adapter-pg`.
- [x] Clerk Middleware protecting sensitive routes.
- [x] Railway CLI integrated for production debugging.
- [ ] Automated database migrations during CI/CD.
