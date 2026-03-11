# Two Weathers — A Bipolar Disorder Resource Site

A comprehensive, free, evidence-based resource for understanding bipolar disorder. Built with React.

## What's Inside

- **Home** — Statistics, bipolar spectrum overview (I, II, Cyclothymia), getting started guide
- **Screening** — Mood Disorder Questionnaire (MDQ) + DSM-5 criteria to differentiate bipolar types
- **Medications** — Guide to lithium, lamotrigine, quetiapine, paliperidone, valproate, lorazepam
- **CBT** — Cognitive Behavioral Therapy for bipolar: 4 pillars, 7 core techniques, research evidence
- **DBT** — Dialectical Behavior Therapy: 4 skill modules, structure, bipolar-specific research
- **Body** — Top 10 exercises for physical anxiety ranked by evidence (vagus nerve science)
- **Find Help** — Provider directories, what to look for, what to say, uninsured resources

## How to Deploy (Step by Step)

### Option A: Vercel (Recommended — Easiest, Free)

1. **Install Node.js**: Go to https://nodejs.org and download the LTS version. Install it.

2. **Open your terminal**:
   - Mac: Open Spotlight (Cmd+Space), type "Terminal", press Enter
   - Windows: Press Windows key, type "cmd" or "PowerShell", press Enter

3. **Navigate to this folder**:
   ```
   cd path/to/two-weathers-deploy
   ```

4. **Install dependencies**:
   ```
   npm install
   ```

5. **Test locally**:
   ```
   npm start
   ```
   Your browser opens to http://localhost:3000 — you should see the site.

6. **Create a GitHub account** (if you don't have one): https://github.com/join

7. **Push to GitHub**:
   - Go to https://github.com/new
   - Name it "two-weathers"
   - Click "Create repository"
   - Follow the instructions under "push an existing repository from the command line":
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/two-weathers.git
   git push -u origin main
   ```
   (Replace YOUR_USERNAME with your actual GitHub username)

8. **Deploy on Vercel**:
   - Go to https://vercel.com and sign up with your GitHub account
   - Click "Add New Project"
   - Select your "two-weathers" repository
   - Click "Deploy"
   - Wait ~60 seconds
   - Your site is live at something like: https://two-weathers.vercel.app

9. **Custom domain** (optional, ~$10-15/year):
   - Buy a domain at https://www.namecheap.com (e.g., twoweathers.com)
   - In Vercel dashboard → your project → Settings → Domains
   - Add your domain and follow the DNS instructions


### Option B: Netlify (Also Free, Also Easy)

Same steps 1-7, then:
- Go to https://app.netlify.com
- Click "Add new site" → "Import an existing project"
- Connect GitHub, select your repo
- Build command: `npm run build`
- Publish directory: `build`
- Click Deploy


### Option C: GitHub Pages (Free, Slightly More Setup)

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/two-weathers",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Run: `npm run deploy`
4. Your site is live at https://YOUR_USERNAME.github.io/two-weathers


## Making Changes

Edit `src/App.js` — that's the entire site in one file. After making changes:

```
npm start          # Preview locally
git add .
git commit -m "Describe your change"
git push
```

Vercel/Netlify will automatically redeploy when you push to GitHub.


## Important Notes

- This is a screening and educational tool, NOT a diagnostic tool
- The MDQ screening is based on Hirschfeld et al. (Am J Psychiatry, 2000)
- Medication information sourced from FDA labels, PubMed, and Drugs.com
- Always include the disclaimer that only a qualified professional can diagnose bipolar disorder
- If you modify medical content, verify against current clinical guidelines


## Sources

- Mood Disorder Questionnaire: Hirschfeld RMA et al., Am J Psychiatry, 2000
- CBT for Bipolar: Özdel et al., PMC 2021; Chiang et al., PLOS One 2017
- DBT for Bipolar: Goldstein et al., JAMA Psychiatry 2023; Van Dijk et al., PMC 2018
- Vagus Nerve Science: Cleveland Clinic, Cedars-Sinai, Feinstein Institute
- Treatment Guidelines: CANMAT/ISBD 2018, VA/DoD 2023
- Medication Data: FDA prescribing information, Drugs.com patient databases
