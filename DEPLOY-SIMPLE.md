# Simple Vercel Deployment Setup

## Quick Setup Steps

### 1. Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "New Project" and import your GitHub repository
3. Vercel will automatically detect it's a Next.js project

### 2. Set Environment Variables

In your Vercel project dashboard, go to Settings > Environment Variables and add:

```
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_AUTH_TOKEN=your_auth_token
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_API_KEY=xxxx
```

### 3. Setup GitHub Actions (Optional)

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

To get these values:

1. **VERCEL_TOKEN**: Go to Vercel Settings > Tokens and create a new token
2. **ORG_ID & PROJECT_ID**: Run `npx vercel link` in your project and check `.vercel/project.json`

### 4. Deploy

- **Automatic**: Push to `main` branch (GitHub Actions will deploy)
- **Manual**: Vercel will auto-deploy on every push to main

## Workflow

1. Code changes → Push to feature branch
2. Create PR → Tests and linting run automatically
3. Merge to main → Automatic deployment to production

That's it! Your app will be live on Vercel with automated deployments.
