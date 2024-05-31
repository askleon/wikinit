# wikinit

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run app/main.ts
```

This project was created using `bun init` in bun v1.1.10. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


## Prisma

### Seed script
If the seed script isnt working, try:
`bun --watch scripts/seed.ts` and CTRL+C after db.client Disconnected