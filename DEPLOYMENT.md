# Deployment Guide

This project is optimized for deployment on [Vercel](https://vercel.com).

## Prerequisites

1.  A Vercel account.
2.  A PostgreSQL database (e.g., Vercel Postgres, Supabase, Neon).
3.  A GitHub repository with this code pushed.

## Steps to Deploy

1.  **Push to GitHub**: Ensure your latest code is on the `main` branch.
2.  **Import to Vercel**:
    *   Go to your Vercel Dashboard.
    *   Click "Add New..." -> "Project".
    *   Import your GitHub repository.
3.  **Configure Environment Variables**:
    *   In the Vercel project settings (or during import), add the following environment variables:
        *   `DATABASE_URL`: Your PostgreSQL connection string (e.g., `postgres://user:password@host:port/database`).
        *   `NEXTAUTH_SECRET`: A random string for encryption. You can generate one using `openssl rand -base64 32`.
        *   `NEXTAUTH_URL`: The URL of your deployed app (e.g., `https://your-app.vercel.app`).
            *   *Note*: Vercel automatically sets `NEXT_PUBLIC_VERCEL_URL`, but NextAuth often requires `NEXTAUTH_URL` explicitly.
4.  **Deploy**: Click "Deploy".

## Database Setup (Post-Deployment)

After deployment, your database might be empty. You need to apply migrations and seed data.

1.  **Migrations**: Vercel usually handles build commands, but for Prisma migrations, you might need to run them manually or via a post-install script.
    *   *Recommended*: Connect your local machine to the production DB string and run `npx prisma migrate deploy`.
2.  **Seeding (Admin User)**:
    *   To create the initial admin user, run the seed script locally pointing to the production database:
        ```bash
        DATABASE_URL="your-production-db-url" npm run prisma:seed
        ```
    *   Or, use the Vercel CLI:
        ```bash
        vercel env pull .env.production.local
        npm run prisma:seed
        ```

## Troubleshooting

*   **Middleware/Proxy Issues**: Ensure your middleware file is named `middleware.ts` in the root or `src/` directory.
*   **Build Failures**: Check the Vercel build logs. Common issues include missing environment variables or TypeScript errors.
