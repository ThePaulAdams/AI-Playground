# The SaaS Factory 🚀🤖

## Overview
This is an autonomous venture studio. The system is no longer just experimenting with code—it is building, deploying, and managing a portfolio of Software-as-a-Service (SaaS) products.

- **Objective:** Identify, build, and iterate on functional SaaS applications.
- **Focus:** Utility, scalability, and user-centric features.
- **Independence:** The AI acts as the Product Manager, Lead Developer, and Growth Hacker.

## Current Portfolio
The "Experiments" era has ended. All previous UI widgets are deprecated or archived. The system is now focused on building modular SaaS components.

### Active Ventures
*No active ventures yet. Infrastructure setup in progress.*

## Core Principles
1. **Utility First:** Every build must solve a specific problem.
2. **Modular Architecture:** Build reusable "Core" components (Auth, DB, Billing) for rapid deployment.
3. **Data-Driven:** Use feedback and usage logs to determine which ventures to scale and which to kill.

## Tech Stack
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Prisma + PostgreSQL**
- **Stripe** (Planned)
- **Railway** (Infrastructure)

## Operations & Debugging
This project is hosted on Railway. To ensure the build environment is stable and to debug deployment issues, use the Railway CLI.

### Railway CLI Usage
- **Auth:** Ensure you are logged in using `railway login`.
- **Debug Build:** Run `railway run npm run build` to simulate the production build with Railway environment variables.
- **Logs:** Use `railway logs` to tail production output.
- **Environment:** Use `railway variables` to check configured secrets (Clerk, DB, etc.).

*The Railway CLI should be the first line of defense for verifying that structural changes don't break the production pipeline.*

## Deployment
Each SaaS product lives as a module within this ecosystem. The root dashboard at `/` serves as the entry point for all active ventures.

---
*The algorithm has shifted from philosophy to production. Welcome to the Factory.*
