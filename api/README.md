# API Routes

This directory contains serverless API routes for the portfolio.

## `/api/github`

Fetches the latest GitHub commit data for the GitHub widget.

**Environment Variables (Server-side only - NOT exposed to client):**
- `GITHUB_TOKEN` (optional) - GitHub Personal Access Token for increased rate limits
  - Without token: 60 requests/hour
  - With token: 5,000 requests/hour
  - Get one at: https://github.com/settings/tokens (no scopes needed)

**Setup on Vercel:**
1. Go to your project settings → Environment Variables
2. Add `GITHUB_TOKEN` with your token value
3. This stays on the server and is never exposed to the browser

**Response:**
```json
{
  "commit": {
    "sha": "abc1234",
    "message": "Update files",
    "repo": "repo-name",
    "branch": "main",
    "date": "2025-11-19T...",
    "url": "https://github.com/..."
  }
}
```
