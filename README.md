# The King's Code — Vercel Deployment Guide

## Project Structure
```
kings-code/
├── api/
│   └── chat.js          ← AI Mentor serverless function
├── public/
│   └── index.html       ← Full website
├── vercel.json          ← Vercel routing config
└── README.md
```

## Deploy in 5 Steps

### Step 1 — Install Vercel CLI (if you haven't)
```
npm install -g vercel
```

### Step 2 — Login to Vercel
```
vercel login
```

### Step 3 — Deploy from this folder
```
cd kings-code
vercel
```
Follow the prompts. When asked about settings, press Enter to accept defaults.

### Step 4 — Add your Anthropic API Key (CRITICAL)
1. Go to https://vercel.com/dashboard
2. Click your project → Settings → Environment Variables
3. Add:
   - Name:  ANTHROPIC_API_KEY
   - Value: your-api-key-here (get one at https://console.anthropic.com)
   - Environment: Production, Preview, Development (check all 3)
4. Click Save

### Step 5 — Redeploy to apply the environment variable
```
vercel --prod
```

## Your AI Mentor will now work on the live site!

## To Update the Site Later
Just edit `public/index.html` and run:
```
vercel --prod
```
