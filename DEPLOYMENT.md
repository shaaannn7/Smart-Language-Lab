# Deployment Guide: Language Learning Lab

## Local Development with Docker

1.  **Clone the repository.**
2.  **Set up environment variables:**
    Create a `.env` file in the root directory with the following:
    ```env
    DATABASE_URL="postgresql://postgres:password@localhost:5432/langlab?schema=public"
    AUTH_SECRET="your-secret-here"
    OPENAI_API_KEY="sk-..."
    UPSTASH_REDIS_REST_URL="https://..."
    UPSTASH_REDIS_REST_TOKEN="..."
    ```
3.  **Run with Docker Compose:**
    ```bash
    docker-compose up --build
    ```
    This will start the PostgreSQL database and the Next.js application.

## Manual Setup

1.  **Install dependencies:**
    ```bash
    npm install --legacy-peer-deps
    ```
2.  **Generate Prisma Client:**
    ```bash
    npx prisma generate
    ```
3.  **Push database schema:**
    ```bash
    npx prisma db push
    ```
4.  **Seed the database:**
    ```bash
    npm run prisma:seed # (You may need to add this script or run: npx prisma db seed)
    ```
5.  **Run development server:**
    ```bash
    npm run dev
    ```

## Production Deployment (Vercel)

1.  **Push your code to GitHub.**
2.  **Import the project to Vercel.**
3.  **Configure Environment Variables** in the Vercel dashboard.
4.  **Add a PostgreSQL database** (e.g., Vercel Postgres, Supabase, or Railway).
5.  **Set the `DATABASE_URL`** to your production database.
6.  **Build Command:** `npx prisma generate && next build`.
7.  **Install Command:** `npm install --legacy-peer-deps`.

## Production Deployment (Self-Hosted)

1.  Build the Docker image:
    ```bash
    docker build -t langlab .
    ```
2.  Run the container:
    ```bash
    docker run -p 3000:3000 --env-file .env langlab
    ```
