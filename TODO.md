# Vercel White Screen Fix - TODO

## [ ] Step 1: Fix critical JS error in Portfolio.jsx
- Add `aiReels: []` to portfolioItems object (or remove section)
- Status: Pending

## [ ] Step 2: Fix all asset paths in Portfolio.jsx
- Replace imports with root-relative: `/image/PrimerPro.png`, `/Final 001.webm`, `/image/profile.jpg`
- Remove inline Google Fonts @import
- Fix AfterEffcts.png → AfterEffects.png path check
- Status: Pending

## [ ] Step 3: Update index.html
- Add Google Fonts link tag
- Status: Pending

## [ ] Step 4: Test build
- `npm run build`
- Check dist/ assets load correctly
- Status: Pending

## [ ] Step 5: Deploy & verify
- Push to GitHub → Vercel auto-deploy
- Check live site
- Status: Pending
