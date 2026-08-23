# 🩺 DocCheck — Laptop Health Checker

> **USP:** Your laptop gets a school report card. Bash scans your real machine,
> JavaScript grades it like a teacher, and CSS makes it look like paper.
> Pitch line: *"A doctor for your laptop that grades it like homework."*

---

## ✅ What's done (code written)

- [x] `index.html` — report card layout
- [x] `style.css` — paper + red-pen theme
- [x] `script.js` — grading logic, progress bars, history tracker
- [x] `health.sh` — disk / RAM / battery scanner (writes `data.js`)
- [ ] Run the scan and see YOUR real laptop graded ← **do this next**

---

## 👤 MY JOBS (human) — do these now

### Step 1 — First commit
```bash
cd doccheck
git init
git add .
git commit -m "Initial commit: DocCheck report card"
```

### Step 2 — Put it on GitHub
1. Go to github.com → New repository → name it `doccheck` → **do NOT** tick "Add README"
2. Then run (replace `YOUR-USERNAME`):
```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/doccheck.git
git push -u origin main
```

### Step 3 — Test the app
```bash
bash health.sh
```
Then double-click `index.html`. You should see your real grades!

**💾 Commit after testing works:**
```bash
git add .
git commit -m "Test first real scan on my laptop"
```

### Step 4 — Enable GitHub Pages (free hosting)
GitHub repo → Settings → Pages → Source: `main` branch → Save.
Your site goes live at `https://YOUR-USERNAME.github.io/doccheck/`

### Step 5 — Invite teammates
Settings → Collaborators → Add people → they accept the email invite.

---

## 👥 TEAMMATE TASKS (each person = own branch = own PR)

| Teammate | Branch name | Task |
|---|---|---|
| A | `feature/cpu-check` | Add CPU check to `health.sh` |
| B | `feature/dark-mode` | Add dark mode toggle to CSS/JS |
| C | `feature/startup-subject` | Add "Startup Programs" subject row |

Their flow:
```bash
git clone https://github.com/YOUR-USERNAME/doccheck.git
git checkout -b feature/cpu-check
# ...make changes...
git add .
git commit -m "Add CPU check"
git push origin feature/cpu-check
# then open Pull Request on GitHub → review → merge
```

---

## 🎤 Demo checklist for presentation day
- [ ] Run `bash health.sh` live in front of class
- [ ] Refresh browser → grades appear live
- [ ] Show commit history: `git log --oneline`
- [ ] Show a merged pull request from each teammate

---

## 🔧 Stretch goals (only if time remains)
- [ ] Detention tasks: copy-paste fix commands for failing subjects
- [ ] More funny teacher notes
- [ ] Print button (it IS a report card)
