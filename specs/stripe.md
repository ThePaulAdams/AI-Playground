# SaaS Factory Stripe Spec

## Overview
Enable monetization across all ventures using a centralized Stripe integration.

## Requirements
- Multi-tenant billing (each venture can have its own price points).
- Stripe Webhook handling for subscription lifecycle.
- User-facing billing dashboard.

## Acceptance Criteria
- [ ] Stripe API initialized in `src/lib/stripe.ts`.
- [ ] Webhook route (`/api/webhooks/stripe`) successfully receives events.
- [ ] Trial/Paid status visible in Venture Dashboard.
