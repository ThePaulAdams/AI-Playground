# SaaS Factory Operations

## Build Commands
npm run dev      # Development server
npm run build     # Production build

## Validation
npx tsc --noEmit  # Typecheck
npm run lint      # Linting

## Operational Notes
- Use Clerk for all auth logic.
- Use Prisma for all DB interactions.
- Ventures must be modularized under `src/app/ventures/[slug]`.
- Shared components go in `src/components/shared`.
- All database schemas must be added to `prisma/schema.prisma`.
