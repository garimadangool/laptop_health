function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

const NOTES = {
  A: "Top of the class! Your laptop is living its best life.",
  B: "Solid effort. A little cleanup and it is an easy A.",
  C: "Average. Your laptop is doing homework at the last minute.",
  D: "Barely passing. Close some tabs and free some space.",
  F: "Your laptop is failing. Detention: delete junk files and charge the battery."
};

function fillClass(score) {
  if (score >= 80) return "good";
  if (score >= 60) return "mid";
  return "bad";
}

function buildSubjects(report) {
  return [
    { name: "Disk Space", score: 100 - report.diskUsed },
    { name: "RAM Health", score: 100 - report.ramUsed },
    { name: "Battery", score: report.battery }
  ];
}

function renderSubjects(subjects) {
  const list = document.getElementById("subjects");
  list.innerHTML = "";
  subjects.forEach(function (s) {
    const li = document.createElement("li");

    const name = document.createElement("span");
    name.className = "subject-name";
    name.textContent = s.name;

    const bar = document.createElement("div");
    bar.className = "bar";

    const fill = document.createElement("div");
    fill.className = "fill " + fillClass(s.score);
    fill.style.width = Math.max(0, Math.min(100, s.score)) + "%";

    bar.appendChild(fill);

    const letter = document.createElement("span");
    letter.className = "score-letter";
    letter.textContent = getGrade(s.score);

    li.appendChild(name);
    li.appendChild(bar);
    li.appendChild(letter);
    list.appendChild(li);
  });
}

function updateHistory(overall) {
  const el = document.getElementById("history");
  const lastRaw = localStorage.getItem("doccheck-last-score");

  if (lastRaw !== null) {
    const last = Number(lastRaw);
    const diff = Math.round(overall) - last;
    if (diff > 0) {
      el.textContent = "📈 Up " + diff + " points since last check. Improvement detected!";
    } else if (diff < 0) {
      el.textContent = "📉 Down " + Math.abs(diff) + " points since last check. We need to talk.";
    } else {
      el.textContent = "➖ Same score as last check. Consistent... suspiciously consistent.";
    }
  } else {
    el.textContent = "First check complete! Run the scan again later to track progress.";
  }

  localStorage.setItem("doccheck-last-score", String(Math.round(overall)));
}

function showFallback(message) {
  document.getElementById("teacher-note").textContent = message;
}

function main() {
  if (typeof window.REPORT === "undefined") {
    showFallback('No scan found. Open Git Bash here, run "bash health.sh", then refresh.');
    return;
  }

  const report = window.REPORT;

  document.getElementById("scan-date").textContent =
    "Scanned on " + report.scannedAt;

  const subjects = buildSubjects(report);
  renderSubjects(subjects);

  const total = subjects.reduce(function (sum, s) { return sum + s.score; }, 0);
  const overall = total / subjects.length;
  const overallGrade = getGrade(overall);

  document.getElementById("overall-grade").textContent = overallGrade;
  document.getElementById("teacher-note").textContent = NOTES[overallGrade];

  updateHistory(overall);
}

main();
