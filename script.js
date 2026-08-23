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

function toneClass(score) {
  if (score >= 80) return "good";
  if (score >= 60) return "mid";
  return "bad";
}

function buildSubjects(r) {
  const batteryDetail = r.charging
    ? "Charging right now (" + r.battery + "%)"
    : "On battery power (" + r.battery + "%)";
  return [
    { icon: "💾", name: "Disk Space", score: 100 - r.diskUsed, detail: r.diskUsed + "% of your disk is used" },
    { icon: "🧠", name: "RAM Health", score: 100 - r.ramUsed, detail: r.ramUsed + "% of memory in use" },
    { icon: "⚡", name: "CPU Calmness", score: 100 - r.cpuLoad, detail: "Processor load at " + r.cpuLoad + "%" },
    { icon: "🔋", name: "Battery", score: r.battery, detail: batteryDetail }
  ];
}

function diagnose(r) {
  const issues = [];
  if (r.diskUsed >= 85) {
    issues.push({ level: "bad", text: "💾 Disk is " + r.diskUsed + "% full. Delete old files from Downloads and Recycle Bin." });
  } else if (r.diskUsed >= 70) {
    issues.push({ level: "warn", text: "💾 Disk is " + r.diskUsed + "% full. Getting crowded in there." });
  }
  if (r.ramUsed >= 85) {
    issues.push({ level: "bad", text: "🧠 RAM at " + r.ramUsed + "%. Close browser tabs — Chrome is eating your memory." });
  } else if (r.ramUsed >= 70) {
    issues.push({ level: "warn", text: "🧠 RAM at " + r.ramUsed + "%. A bit heavy." });
  }
  if (r.cpuLoad >= 80) {
    issues.push({ level: "bad", text: "⚡ CPU at " + r.cpuLoad + "%. Something is working overtime — check Running list below." });
  } else if (r.cpuLoad >= 60) {
    issues.push({ level: "warn", text: "⚡ CPU at " + r.cpuLoad + "%. Moderate activity." });
  }
  if (!r.charging && r.battery < 25) {
    issues.push({ level: "bad", text: "🔋 Battery at " + r.battery + "% and not charging. Plug in!" });
  } else if (!r.charging && r.battery < 45) {
    issues.push({ level: "warn", text: "🔋 Battery at " + r.battery + "%. Keep a charger nearby." });
  }
  if (issues.length === 0) {
    issues.push({ level: "ok", text: "🎉 No problems found. Straight-A laptop behavior!" });
  }
  return issues;
}

function renderSubjects(subjects) {
  const wrap = document.getElementById("subjects");
  wrap.innerHTML = "";
  subjects.forEach(function (s) {
    const card = document.createElement("div");
    card.className = "subject-card";

    const top = document.createElement("div");
    top.className = "subject-top";

    const icon = document.createElement("span");
    icon.className = "subject-icon";
    icon.textContent = s.icon;

    const name = document.createElement("span");
    name.className = "subject-name";
    name.textContent = s.name;

    const pct = document.createElement("span");
    pct.className = "subject-pct";
    pct.textContent = Math.round(s.score) + "%";

    const chip = document.createElement("span");
    chip.className = "grade-chip chip-" + toneClass(s.score);
    chip.textContent = getGrade(s.score);

    top.appendChild(icon);
    top.appendChild(name);
    top.appendChild(pct);
    top.appendChild(chip);

    const track = document.createElement("div");
    track.className = "bar-track";

    const fill = document.createElement("div");
    fill.className = "bar-fill fill-" + toneClass(s.score);
    requestAnimationFrame(function () {
      fill.style.width = Math.max(0, Math.min(100, s.score)) + "%";
    });

    track.appendChild(fill);

    const detail = document.createElement("div");
    detail.className = "subject-detail";
    detail.textContent = s.detail;

    card.appendChild(top);
    card.appendChild(track);
    card.appendChild(detail);
    wrap.appendChild(card);
  });
}

function renderDiagnosis(issues) {
  const list = document.getElementById("diagnosis");
  list.innerHTML = "";
  issues.forEach(function (i) {
    const li = document.createElement("li");
    li.className = "issue issue-" + i.level;
    li.textContent = i.text;
    list.appendChild(li);
  });
}

function renderProcesses(procs) {
  const list = document.getElementById("processes");
  list.innerHTML = "";
  procs.forEach(function (p, i) {
    const li = document.createElement("li");
    li.className = "proc-row";

    const label = document.createElement("span");
    label.innerHTML = '<span class="proc-rank">#' + (i + 1) + '</span>' + p.name;

    const mb = document.createElement("span");
    mb.className = "proc-mb";
    mb.textContent = p.mb + " MB";

    li.appendChild(label);
    li.appendChild(mb);
    list.appendChild(li);
  });
}

function updateHistory(overall) {
  const el = document.getElementById("history");
  const lastRaw = localStorage.getItem("doccheck-last-score");
  const now = Math.round(overall);

  if (lastRaw !== null) {
    const diff = now - Number(lastRaw);
    if (diff > 0) {
      el.textContent = "📈 Up " + diff + " points since last check. Improvement detected!";
    } else if (diff < 0) {
      el.textContent = "📉 Down " + Math.abs(diff) + " points since last check. We need to talk.";
    } else {
      el.textContent = "➖ Same score as last check. Consistent... suspiciously consistent.";
    }
  } else {
    el.textContent = "First scan complete! Run health.sh again later to see trends.";
  }

  localStorage.setItem("doccheck-last-score", String(now));
}

function main() {
  if (typeof window.REPORT === "undefined") {
    document.getElementById("teacher-note").textContent =
      'No scan found. Open Git Bash in this folder, run "bash health.sh", then refresh this page.';
    return;
  }

  const r = window.REPORT;

  document.getElementById("scan-date").textContent = "Scanned on " + r.scannedAt;

  const subjects = buildSubjects(r);
  renderSubjects(subjects);
  renderDiagnosis(diagnose(r));
  renderProcesses(r.topProcesses || []);

  const overall = subjects.reduce(function (sum, s) { return sum + s.score; }, 0) / subjects.length;

  document.getElementById("overall-percent").textContent = Math.round(overall);
  document.getElementById("overall-grade").textContent = getGrade(overall);
  document.getElementById("teacher-note").textContent = NOTES[getGrade(overall)];

  updateHistory(overall);
}

main();
