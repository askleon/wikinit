FROM oven/bun:latest

WORKDIR /wikinit
COPY . .

RUN apt-get update

RUN apt-get install -y git

RUN bun install

CMD bun prisma migrate dev --name init && bun prisma generate && bun prisma db seed