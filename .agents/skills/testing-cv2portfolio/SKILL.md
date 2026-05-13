---
name: testing-cv2portfolio
description: Test the CV2Portfolio AI app end-to-end. Use when verifying UI theme changes, admin panel, PDF upload, or Gemini API integration.
---

# Testing CV2Portfolio AI

## Prerequisites

- Node.js installed
- Dependencies installed (`npm install`)

## Devin Secrets Needed

- `GEMINI_API_KEY` — Required for full AI generation flow testing. Without it, only error-handling paths can be tested.
- `ADMIN_PASSWORD` — Required for admin panel access. Set to any value for local testing.

## Starting the Dev Server

```bash
cd /home/ubuntu/repos/test
export ADMIN_PASSWORD=testpass123
export GEMINI_API_KEY=<your-key-or-fake-key>
npm run dev
```

The app runs at `http://localhost:3000`.

## Key Test Flows

### 1. Beige Theme Verification
- Navigate to `http://localhost:3000`
- Verify background is warm cream (#FAF6F0), NOT dark (#030014)
- Check hero title uses dark text (gray-800), subtitle uses gold gradient
- Check "Powered by Gemini AI" badge is amber-colored
- Check feature cards have white glassmorphism
- Check footer "Michel Affedjou" link is amber
- Also verify theme on `/admin` (login page) and `/portfolio/<any-id>` (404 page)

### 2. Admin Panel Login
- Navigate to `/admin`
- Test wrong password → should show "Mot de passe incorrect" in red
- Test correct password (value of ADMIN_PASSWORD env var) → should show "Tableau de bord Admin" dashboard
- Dashboard has 3 stat cards: "Requêtes totales", "Utilisateurs", "Statut API"

### 3. Admin API Key Management
- After login, find "Clé API Gemini" section
- Current key should be masked (e.g., `fake-k...ting`)
- Click "Modifier la clé" → input field appears
- Enter new key, click "Sauvegarder" → success message in green
- Masked key updates to reflect new value

### 4. Admin Quota Tracking
- Upload a PDF on the landing page (will fail with fake API key)
- Return to `/admin`, login again
- "Requêtes totales" should increment
- Failed count should increment
- "Dernière erreur" section should show error details with timestamp

### 5. PDF Upload Flow
- Click the upload zone on the landing page
- Select a PDF file (test-cv.pdf is available in repo root)
- With fake API key: expect error message "Invalid Gemini API key. Please check your configuration."
- With real API key: expect loading animation then portfolio preview

### 6. Portfolio 404 Page
- Navigate to `/portfolio/nonexistent-id`
- Should show "Portfolio Not Found" with beige theme
- "Create Your Portfolio" button should navigate back to home

## Tips

- The admin panel uses client-side state — navigating away requires re-login
- Admin stats auto-refresh every 10 seconds when dashboard is open
- Data is stored in-memory; server restart resets all stats and portfolios
- On Render free tier, the server auto-sleeps after 15 min inactivity
- The file dialog for PDF upload opens in the repo directory by default — test-cv.pdf should be visible
- When testing with a real GEMINI_API_KEY, be aware of rate limits (15 req/min on free tier)
