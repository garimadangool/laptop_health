let LANG = localStorage.getItem("doccheck-lang") || "en";

const T = {
  subtitle: { en: "Laptop Health Report Card", ne: "ल्यापटप स्वास्थ्य प्रतिवेदन" },
  stamp_label: { en: "Grade", ne: "ग्रेड" },
  score_label: { en: "Overall Health Score", ne: "कुल स्वास्थ्य अंक" },
  no_scan: { en: 'No scan found. Open Git Bash here, run "bash health.sh", then refresh.', ne: 'स्क्यान भेटिएन। Git Bash खोलेर "bash health.sh" चलाउनुहोस्, अनी रिफ्रेस गर्नुहोस्।' },
  waiting: { en: "Waiting for results...", ne: "नतिजा पर्खँदै..." },
  s_disk: { en: "Disk Space", ne: "डिस्क ठाउँ" },
  s_ram: { en: "RAM Health", ne: "RAM स्वास्थ्य" },
  s_cpu: { en: "CPU Calmness", ne: "CPU शान्ति" },
  s_battery: { en: "Battery", ne: "ब्याट्री" },
  s_startup: { en: "Startup Load", ne: "स्टार्टअप लोड" },
  s_fresh: { en: "Freshness", ne: "ताजगी" },
  p_prescription: { en: "Doctor’s Prescription", ne: "डाक्टरको सल्लाह" },
  p_running: { en: "Running Right Now", ne: "अहिले चलिरहेका" },
  p_wifi: { en: "WiFi Connection", ne: "वाइफाई जडान" },
  p_storage: { en: "Storage Drives", ne: "भण्डारण ड्राइभ" },
  deepdive_title: { en: "Deep Dive — Raw Details", ne: "गहिरो विश्लेषण — विस्तृत विवरण" },
  p_startup: { en: "Starts With Your Laptop", ne: "सुरु हुने एपहरू" },
  print_btn_label: { en: "Print Report Card", ne: "प्रिन्ट गर्नुहोस्" },
  csv_btn_label: { en: "Export CSV", ne: "CSV डाउनलोड" },
  scan_btn_label: { en: "Scan Again", ne: "फेरि स्क्यान गर्नुहोस्" },
  scan_running: { en: "Scanning…", ne: "स्क्यान हुँदैछ…" },
  scan_status_ok: { en: "Report updated", ne: "रिपोर्ट अद्यावधिक भयो" },
  scan_fail: { en: "Could not reach the scanner. Run \"bash setup-scanserver.sh\" once in the DocCheck folder, then press Scan Again.", ne: "स्क्यानर भेटिएन। DocCheck फोल्डरमा एक पटक \"bash setup-scanserver.sh\" चलाउनुहोस्, अनी 'फेरि स्क्यान' थिच्नुहोस्।" },
  lang_switch: { en: "नेपाली", ne: "English" },
  disk_used: { en: "{x}% of your disk is used", ne: "डिस्कको {x}% प्रयोग भएको छ" },
  ram_used: { en: "{x}% of memory in use", ne: "मेमोरीको {x}% प्रयोगमा छ" },
  cpu_load: { en: "Processor load at {x}%", ne: "प्रोसेसर लोड {x}%" },
  charging_now: { en: "Charging right now ({x}%)", ne: "अहिले चार्ज हुँदैछ ({x}%)" },
  on_battery: { en: "On battery power ({x}%)", ne: "ब्याट्रीमा चलिरहेको ({x}%)" },
  keeps_cap: { en: "keeps {x}% of factory capacity", ne: "फ्याक्ट्री क्षमताको {x}% कायम छ" },
  disk_bad: { en: "Disk is {x}% full. Delete old files from Downloads and Recycle Bin.", ne: "डिस्क {x}% भरियो। पुराना फाइलहरू मेट्नुहोस्।" },
  disk_warn: { en: "Disk is {x}% full. Getting crowded in there.", ne: "डिस्क {x}% भरिएको छ। अलि बढी भयो।" },
  ram_bad: { en: "RAM at {x}%. Close browser tabs — Chrome is eating your memory.", ne: "RAM {x}%। ब्राउजर ट्याबहरू बन्द गर्नुहोस्।" },
  ram_warn: { en: "RAM at {x}%. A bit heavy.", ne: "RAM {x}%। अलि बढी भयो।" },
  cpu_bad: { en: "CPU at {x}%. Something is working overtime — check Running list below.", ne: "CPU {x}%। केही अत्यधिक चलिरहेको छ — तलको सूची हेर्नुहोस्।" },
  cpu_warn: { en: "CPU at {x}%. Moderate activity.", ne: "CPU {x}%। मध्यम गतिविधि।" },
  batt_low: { en: "Battery at {x}% and not charging. Plug in!", ne: "ब्याट्री {x}% र चार्ज हुँदैछैन। प्लग हाल्नुहोस्!" },
  batt_mid: { en: "Battery at {x}%. Keep a charger nearby.", ne: "ब्याट्री {x}%। चार्जर नजिकै राख्नुहोस्।" },
  wear_bad: { en: "Battery has lost {x}% of its factory capacity. Consider a replacement soon.", ne: "ब्याट्रीले फ्याक्ट्री क्षमताको {x}% गुमाइसकेको छ। चाँडै सट्टा गर्नुहोस्।" },
  wear_warn: { en: "Battery wear at {x}%. Aging normally, but keep an eye on it.", ne: "ब्याट्री घिसार {x}%। सामान्य तर ध्यान दिनुहोस्।" },
  drive_fail: { en: "Drive '{x}' reports bad health. Back up your files NOW!", ne: "ड्राइभ '{x}' मा समस्या देखियो। फाइलहरूको ब्याकअप लिनुहोस्!" },
  all_ok: { en: "No problems found. Straight-A laptop behavior!", ne: "कुनै समस्या भेटिएन। उत्कृष्ट ल्यापटप!" },
  note_A: { en: "Top of the class! Your laptop is living its best life.", ne: "कक्षामा पहिलो! तपाईंको ल्यापटप उत्कृष्ट अवस्थामा छ।" },
  note_B: { en: "Solid effort. A little cleanup and it is an easy A.", ne: "राम्रो प्रयास। अलिकति सफा गरे सजिलै A।" },
  note_C: { en: "Average. Your laptop is doing homework at the last minute.", ne: "ठीकै छ। ल्यापटपले आखिरी बेलामा मात्र होमवर्क गर्छ।" },
  note_D: { en: "Barely passing. Close some tabs and free some space.", ne: "मुस्किलले पास। केही ट्याब बन्द गरी ठाउँ खाली गर्नुहोस्।" },
  note_F: { en: "Your laptop is failing. Detention: delete junk files and charge the battery.", ne: "तपाईंको ल्यापटप फेल भयो। जंक फाइल मेट्नुहोस् र ब्याट्री चार्ज गर्नुहोस्।" },
  hist_up: { en: "Up {x} points since last check", ne: "पछिल्लो जाँचभन्दा {x} अंक बढ्यो" },
  hist_down: { en: "Down {x} points since last check", ne: "पछिल्लो जाँचभन्दा {x} अंक घट्यो" },
  hist_same: { en: "Same score as last check", ne: "पछिल्लो जाँचजस्तै अंक" },
  hist_first: { en: "First scan saved!", ne: "पहिलो स्क्यान सुरक्षित!" },
  pred_up: { en: "DocCheck AI: trending UP (+{x} pts avg). Keep it up!", ne: "DocCheck AI: ट्रेन्ड माथि (+{x} औसत)। यस्तै गर्दै गर्नुहोस्!" },
  pred_down: { en: "DocCheck AI: trending DOWN ({x} pts avg). A cleanup is coming...", ne: "DocCheck AI: ट्रेन्ड तल ({x} औसत)। सफाई आवश्यक..." },
  q_excellent: { en: "Excellent", ne: "उत्कृष्ट" },
  q_good: { en: "Good", ne: "राम्रो" },
  q_fair: { en: "Fair", ne: "ठीक" },
  q_poor: { en: "Poor", ne: "कमजोर" },
  link_speed: { en: "Link speed", ne: "लिंक गति" },
  signal_lbl: { en: "Signal", ne: "सिग्नल" },
  not_connected_wifi: { en: "Not connected to any WiFi.", ne: "कुनै वाइफाईमा जडान छैन।" },
  lbl_brand: { en: "Brand", ne: "ब्रान्ड" },
  lbl_cpu: { en: "Processor", ne: "प्रोसेसर" },
  lbl_gpu: { en: "Graphics", ne: "ग्राफिक्स" },
  lbl_ram: { en: "Memory", ne: "मेमोरी" },
  lbl_board: { en: "Motherboard", ne: "मदरबोर्ड" },
  lbl_bios: { en: "BIOS", ne: "BIOS" },
  lbl_os: { en: "OS", ne: "OS" },
  lbl_screen: { en: "Screen", ne: "स्क्रिन" },
  lbl_uptime: { en: "Uptime", ne: "चलेको समय" },
  lbl_born: { en: "Manufactured", ne: "निर्माण मिति" },
  lbl_life: { en: "Estimated life left", ne: "अनुमानित बाँकी आयु" },
  life_years: { en: "~{x} years (with good care)", ne: "~{x} वर्ष (राम्रो हेरचाहमा)" },
  life_soon: { en: "~{x} year — plan an upgrade", ne: "~{x} वर्ष — अपग्रेडको योजना बनाउनुहोस्" },
  life_unknown: { en: "Unknown (BIOS date hidden)", ne: "अज्ञात (BIOS मिति छैन)" },
  life_note: { en: "Rough guess from age + health. Typical laptop life ≈ 7 yrs.", ne: "उमेर + स्वास्थ्यबाट अनुमान। सामान्य ल्यापटप आयु ≈ ७ वर्ष।" },
  your_laptop: { en: "Your Laptop", ne: "तपाईंको ल्यापटप" },
  adv_backup: { en: "Back up your important files TODAY — failing drives rarely warn twice.", ne: "आज नै फाइलहरूको ब्याकअप लिनुहोस् — बिग्रँदा दोस्रो चेतावनी दिँदैनन्।" },
  adv_disk: { en: "Free disk space: run Disk Cleanup → empty Recycle Bin → clear old Downloads.", ne: "डिस्क खाली गर्नुहोस्: Disk Cleanup चलाउनुहोस्, Recycle Bin खाली गर्नुहोस्।" },
  adv_startup: { en: "Disable unneeded startup apps: Task Manager → Startup apps.", ne: "आवश्यक नभएका स्टार्टअप एपहरू बन्द गर्नुहोस्: Task Manager → Startup apps।" },
  adv_cpu: { en: "Close heavy apps you don't need — check 'Running Right Now'.", ne: "नचाहिने भारी एपहरू बन्द गर्नुहोस् — 'अहिले चलिरहेका' हेर्नुहोस्।" },
  adv_top_proc: { en: "'{x}' is eating {y} MB of RAM right now — close it if you're not using it.", ne: "'{x}' ले अहिले {y} MB RAM खाइरहेको छ — नचाहिए बन्द गर्नुहोस्।" },
  adv_restart: { en: "Restart your laptop — it has been awake for {x}. A reboot clears stuck memory.", ne: "ल्यापटप रिस्टार्ट गर्नुहोस् — {x} देखि खुला छ। रिबुटले RAM सफा हुन्छ।" },
  adv_batt_habit: { en: "Battery habit: stay between 20–80% charge when possible.", ne: "ब्याट्री बानी: सक्दो २०–८०% चार्जमा राख्नुहोस्।" },
  adv_maintain: { en: "Keep winning: monthly vent cleaning + Windows Update.", ne: "यस्तै राख्नुहोस्: महिनामा एक पटक भेन्ट सफा + Windows Update।" },
  adv_scan: { en: "Run DocCheck weekly to catch problems early.", ne: "हप्तामा एक पटक DocCheck चलाउनुहोस्, समस्या चाँडो समात्न।" },
  plan_title: { en: "Your Action Plan", ne: "तपाईंको कार्ययोजना" },
  p_trend: { en: "Health Trend", ne: "स्वास्थ्य ट्रेन्ड" },
  chart_hint: { en: "Scan twice to unlock your progress chart", ne: "चार्ट खोल्न दुई पटक स्क्यान गर्नुहोस्" },
  life_title: { en: "Laptop Life Expectancy", ne: "ल्यापटप आयु अनुमान" },
  born_line: { en: "Born {x} · {y} yrs old", ne: "{x} मा बनेको · {y} वर्ष" },
  startup_count: { en: "{x} apps wake up when you press the power button", ne: "पावर बटन थिच्दा {x} वटा एप ब्यूँझन्छन्" },
  fresh_detail: { en: "Awake for {x} — a reboot clears stuck memory", ne: "{x} देखि खुला — रिस्टार्टले RAM सफा गर्छ" },
  rx_note: { en: "Dr. DocCheck", ne: "डा. DocCheck" }
};

const MOODS = {
  A: "fa-face-laugh-beam",
  B: "fa-face-smile",
  C: "fa-face-meh",
  D: "fa-face-frown",
  F: "fa-face-dizzy"
};
const RING_COLORS = { good: "#2F6F5E", mid: "#C89B3C", bad: "#C1443B" };
const RING_TRACK = "#E3E6DA";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function t(key, vars) {
  let str = (T[key] && (T[key][LANG] || T[key].en)) || key;
  if (vars) {
    Object.keys(vars).forEach(function (k) {
      str = str.split("{" + k + "}").join(vars[k]);
    });
  }
  return str;
}

function faIcon(cls, extraClass) {
  const i = document.createElement("i");
  i.className = "fa-solid " + cls + (extraClass ? " " + extraClass : "");
  i.setAttribute("aria-hidden", "true");
  return i;
}

function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function toneClass(score) {
  if (score >= 80) return "good";
  if (score >= 60) return "mid";
  return "bad";
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem("doccheck-history") || "[]");
  } catch (e) {
    return [];
  }
}

let LAST_SUBJECTS = [];
let LAST_OVERALL = 0;

function uptimeHours(str) {
  const m = String(str || "").match(/^(\d+)h/);
  return m ? parseInt(m[1], 10) : null;
}

function scoreStartupApps(n) {
  if (!n || n <= 3) return 100;
  if (n === 4) return 92;
  if (n === 5) return 84;
  if (n === 6) return 74;
  if (n === 7) return 62;
  return Math.max(40, 52 - (n - 8) * 4);
}

function scoreFreshness(hours) {
  if (hours === null) return 90;
  if (hours < 48) return 100;
  if (hours < 96) return 88;
  if (hours < 168) return 72;
  if (hours < 240) return 58;
  return Math.max(35, 45 - Math.floor((hours - 240) / 72) * 5);
}

function buildSubjects(r, prevD) {
  let batteryDetail = r.charging ? t("charging_now", { x: r.battery }) : t("on_battery", { x: r.battery });
  if (typeof r.batteryWear === "number" && r.batteryWear >= 0) {
    batteryDetail += " · " + t("keeps_cap", { x: 100 - r.batteryWear });
  }
  const appCount = (r.startup || []).length;
  const upH = uptimeHours(r.uptime);
  const raw = [
    { key: "disk", icon: "fa-hard-drive", name: t("s_disk"), score: 100 - r.diskUsed, detail: t("disk_used", { x: r.diskUsed }) },
    { key: "ram", icon: "fa-memory", name: t("s_ram"), score: 100 - r.ramUsed, detail: t("ram_used", { x: r.ramUsed }) },
    { key: "cpu", icon: "fa-microchip", name: t("s_cpu"), score: 100 - r.cpuLoad, detail: t("cpu_load", { x: r.cpuLoad }) },
    { key: "bat", icon: "fa-battery-three-quarters", name: t("s_battery"), score: r.battery, detail: batteryDetail },
    {
      key: "startup",
      icon: "fa-rocket",
      name: t("s_startup"),
      score: scoreStartupApps(appCount),
      detail: t("startup_count", { x: appCount })
    },
    {
      key: "fresh",
      icon: "fa-arrows-rotate",
      name: t("s_fresh"),
      score: scoreFreshness(upH),
      detail: upH === null ? (r.uptime || "—") : t("fresh_detail", { x: r.uptime })
    }
  ];
  raw.forEach(function (s) {
    s.delta = (prevD && typeof prevD[s.key] === "number")
      ? Math.round(s.score) - prevD[s.key]
      : null;
  });
  return raw;
}

function diagnose(r) {
  const issues = [];
  if (r.diskUsed >= 85) issues.push({ level: "bad", key: "disk_bad", x: r.diskUsed });
  else if (r.diskUsed >= 70) issues.push({ level: "warn", key: "disk_warn", x: r.diskUsed });
  if (r.ramUsed >= 85) issues.push({ level: "bad", key: "ram_bad", x: r.ramUsed });
  else if (r.ramUsed >= 70) issues.push({ level: "warn", key: "ram_warn", x: r.ramUsed });
  if (r.cpuLoad >= 80) issues.push({ level: "bad", key: "cpu_bad", x: r.cpuLoad });
  else if (r.cpuLoad >= 60) issues.push({ level: "warn", key: "cpu_warn", x: r.cpuLoad });
  if (!r.charging && r.battery < 25) issues.push({ level: "bad", key: "batt_low", x: r.battery });
  else if (!r.charging && r.battery < 45) issues.push({ level: "warn", key: "batt_mid", x: r.battery });
  if (typeof r.batteryWear === "number" && r.batteryWear >= 25) issues.push({ level: "bad", key: "wear_bad", x: r.batteryWear });
  else if (typeof r.batteryWear === "number" && r.batteryWear >= 15) issues.push({ level: "warn", key: "wear_warn", x: r.batteryWear });
  (r.storage || []).forEach(function (d) {
    if (d.health && d.health.toLowerCase() !== "healthy") {
      issues.push({ level: "bad", key: "drive_fail", x: d.name });
    }
  });
  if (issues.length === 0) issues.push({ level: "ok", key: "all_ok" });
  return issues.map(function (i) {
    return { level: i.level, text: t(i.key, i.x !== undefined ? { x: i.x } : null) };
  });
}

function renderSubjects(subjects) {
  const wrap = document.getElementById("subjects");
  document.querySelectorAll("#subjects .subject-card").forEach(function (el) { el.remove(); });
  subjects.forEach(function (s, i) {
    const card = document.createElement("div");
    card.className = "subject-card";
    card.style.animationDelay = (i * 80) + "ms";

    const top = document.createElement("div");
    top.className = "subject-top";

    const icon = document.createElement("span");
    icon.className = "subject-icon";
    icon.appendChild(faIcon(s.icon));

    const name = document.createElement("span");
    name.className = "subject-name";
    name.textContent = s.name;

    if (s.delta !== null && !isNaN(s.delta)) {
      const delta = document.createElement("span");
      delta.title = LANG === "ne" ? "पछिल्लो स्क्यानसँग तुलना" : "vs last scan";
      if (s.delta > 0) {
        delta.className = "subject-delta up";
        delta.appendChild(faIcon("fa-arrow-up"));
        delta.appendChild(document.createTextNode(" +" + s.delta));
      } else if (s.delta < 0) {
        delta.className = "subject-delta down";
        delta.appendChild(faIcon("fa-arrow-down"));
        delta.appendChild(document.createTextNode(" " + s.delta));
      } else {
        delta.className = "subject-delta same";
        delta.appendChild(faIcon("fa-minus"));
        delta.appendChild(document.createTextNode(" 0"));
      }
      top.appendChild(delta);
    }

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

const ISSUE_ICON = { bad: "fa-triangle-exclamation", warn: "fa-circle-exclamation", ok: "fa-circle-check" };

function renderDiagnosis(issues) {
  const list = document.getElementById("diagnosis");
  list.innerHTML = "";
  issues.forEach(function (i) {
    const li = document.createElement("li");
    li.className = "issue issue-" + i.level;
    li.appendChild(faIcon(ISSUE_ICON[i.level]));
    li.appendChild(document.createTextNode(" " + i.text));
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
    label.className = "proc-name truncate";
    const rank = document.createElement("span");
    rank.className = "proc-rank";
    rank.textContent = "#" + (i + 1);
    label.appendChild(rank);
    label.appendChild(document.createTextNode(p.name));

    const mb = document.createElement("span");
    mb.className = "proc-mb";
    mb.textContent = p.mb + " MB";

    li.appendChild(label);
    li.appendChild(mb);
    list.appendChild(li);
  });
}

function renderStartup(apps) {
  const list = document.getElementById("startup");
  const summary = document.getElementById("startup-summary");
  list.innerHTML = "";

  if (!apps || !apps.length) {
    summary.textContent = "";
    return;
  }

  summary.textContent = t("startup_count", { x: apps.length });

  apps.forEach(function (a) {
    const li = document.createElement("li");
    li.className = "startup-chip";
    li.textContent = a.name;
    li.title = a.cmd;
    list.appendChild(li);
  });
}

function renderWifi(wifi) {
  const list = document.getElementById("wifi");
  list.innerHTML = "";

  if (!wifi || !wifi.ssid || wifi.ssid === "Not connected") {
    const li = document.createElement("li");
    li.className = "dim";
    li.textContent = t("not_connected_wifi");
    list.appendChild(li);
    return;
  }

  const nameRow = document.createElement("li");
  nameRow.className = "wifi-name";
  nameRow.appendChild(faIcon("fa-wifi"));
  const strong = document.createElement("strong");
  strong.textContent = " " + wifi.ssid;
  nameRow.appendChild(strong);

  const speedRow = document.createElement("li");
  speedRow.className = "spec-row";
  const speedLbl = document.createElement("span");
  speedLbl.textContent = t("link_speed");
  const speedVal = document.createElement("span");
  speedVal.className = "spec-val";
  speedVal.textContent = wifi.rxRate;
  speedRow.appendChild(speedLbl);
  speedRow.appendChild(speedVal);

  const signalRow = document.createElement("li");
  signalRow.className = "spec-row";

  let quality = t("q_poor"), qClass = "issue-bad";
  if (wifi.signal >= 80) { quality = t("q_excellent"); qClass = "issue-ok"; }
  else if (wifi.signal >= 60) { quality = t("q_good"); qClass = "issue-warn"; }
  else if (wifi.signal >= 40) { quality = t("q_fair"); qClass = "issue-warn"; }

  const sigLbl = document.createElement("span");
  sigLbl.textContent = t("signal_lbl");
  const sigVal = document.createElement("span");
  sigVal.className = qClass + " sig-pill";
  sigVal.textContent = (wifi.signal ? wifi.signal + "% — " : "") + quality;
  signalRow.appendChild(sigLbl);
  signalRow.appendChild(sigVal);

  list.appendChild(nameRow);
  list.appendChild(speedRow);
  list.appendChild(signalRow);
}

function estimateLife(specs, score) {
  if (!specs.biosDate || !/^\d{4}-\d{2}$/.test(specs.biosDate)) return null;
  const [y, m] = specs.biosDate.split("-").map(Number);
  const now = new Date();
  const ageYears = (now.getFullYear() + now.getMonth() / 12) - (y + (m - 1) / 12);
  if (ageYears < 0) return null;
  const remaining = Math.max(0.5, Math.round(((7 - ageYears) * (0.5 + score / 200)) * 10) / 10);
  return {
    born: specs.biosDate,
    age: Math.round(ageYears * 10) / 10,
    remaining: remaining
  };
}

function cleanCpu(name) {
  return String(name || "").replace(/\((R|TM|tm|r)\)/g, "").replace(/\s+/g, " ").trim();
}

function cleanOs(name) {
  return String(name || "").replace(/^Microsoft\s+/i, "").replace(/Single Language/i, "").replace(/\s+/g, " ").trim();
}

function renderLaptopStrip(specs) {
  const strip = document.getElementById("laptop-strip");
  if (!specs || !specs.brand) {
    strip.style.display = "none";
    return;
  }
  strip.style.display = "";

  document.getElementById("laptop-name").textContent =
    [specs.brand, specs.model].filter(Boolean).join(" ");

  let cpuText = cleanCpu(specs.cpu);
  if (specs.cpuCores) cpuText += " · " + specs.cpuCores + "C/" + specs.cpuThreads + "T";

  let screenText = specs.resolution || "";
  if (specs.refreshHz) screenText += " @ " + specs.refreshHz + " Hz";

  const chips = [
    ["fa-microchip", t("lbl_cpu"), cpuText],
    ["fa-display", t("lbl_gpu"), specs.gpu],
    ["fa-memory", t("lbl_ram"), specs.ramDetail],
    ["fa-desktop", t("lbl_os"), cleanOs(specs.os)],
    ["fa-tv", t("lbl_screen"), screenText],
    ["fa-clock", t("lbl_uptime"), specs.uptime]
  ];

  const wrap = document.getElementById("laptop-chips");
  wrap.innerHTML = "";
  chips.forEach(function (c) {
    if (!c[2]) return;
    const chip = document.createElement("div");
    chip.className = "strip-chip";

    const iconSpan = document.createElement("span");
    iconSpan.className = "strip-icon";
    iconSpan.appendChild(faIcon(c[0]));

    const body = document.createElement("span");
    body.className = "strip-body";
    const small = document.createElement("small");
    small.textContent = c[1];
    const b = document.createElement("b");
    b.textContent = c[2];
    body.appendChild(small);
    body.appendChild(b);

    chip.appendChild(iconSpan);
    chip.appendChild(body);
    wrap.appendChild(chip);
  });
}

function renderLifeBanner(specs, overall) {
  const banner = document.getElementById("life-banner");
  const life = estimateLife(specs, overall);
  if (!life) {
    banner.style.display = "none";
    return;
  }
  banner.style.display = "";

  document.getElementById("life-born").textContent =
    t("born_line", { x: life.born, y: life.age });

  const yearsEl = document.getElementById("life-years");
  yearsEl.textContent = life.remaining + " yrs";
  yearsEl.className = "life-big " +
    (life.remaining <= 1 ? "life-bad" : life.remaining >= 3 ? "life-good" : "life-mid");

  const usedPct = Math.max(2, Math.min(100, Math.round((life.age / 7) * 100)));
  const used = document.getElementById("life-used");
  used.style.width = "0%";
  requestAnimationFrame(function () {
    used.style.width = usedPct + "%";
  });

  document.getElementById("life-note-txt").textContent = t("life_note");
}

function buildAdvice(r, grade, subjects) {
  const acts = [];
  const sorted = subjects.slice().sort(function (a, b) { return a.score - b.score; });

  if (grade === "F" || grade === "D") {
    acts.push(t("adv_backup"));
  }

  sorted.forEach(function (s) {
    if (s.score >= 70) return;
    if (s.key === "disk" && acts.indexOf(t("adv_disk")) === -1) acts.push(t("adv_disk"));
    if ((s.key === "ram" || s.key === "cpu") && r.startup && r.startup.length > 4 && acts.indexOf(t("adv_startup")) === -1) acts.push(t("adv_startup"));
    if (s.key === "cpu" && acts.indexOf(t("adv_cpu")) === -1) acts.push(t("adv_cpu"));
    if (s.key === "bat" && acts.indexOf(t("adv_batt_habit")) === -1) acts.push(t("adv_batt_habit"));
  });

  if (grade === "A") {
    acts.push(t("adv_maintain"));
  } else if (acts.length === 0) {
    acts.push(t("adv_maintain"));
  }
  acts.push(t("adv_scan"));

  return acts.slice(0, 6);
}

function buildSmartAdvice(r, grade, subjects) {
  const acts = buildAdvice(r, grade, subjects);

  if (r.topProcesses && r.topProcesses.length && r.topProcesses[0].mb > 400) {
    const p = r.topProcesses[0];
    acts.unshift(t("adv_top_proc", { x: p.name, y: p.mb }));
  }

  const upMatch2 = String(r.uptime || "").match(/^(\d+)h/);
  if (upMatch2 && parseInt(upMatch2[1], 10) >= 48) {
    const restartMsg = t("adv_restart", { x: r.uptime });
    if (acts.indexOf(restartMsg) === -1) {
      acts.splice(1, 0, restartMsg);
    }
  }

  return acts.slice(0, 7);
}

function renderActionPlan(acts) {
  const list = document.getElementById("action-plan");
  list.innerHTML = "";
  acts.forEach(function (a) {
    const li = document.createElement("li");
    li.textContent = a;
    list.appendChild(li);
  });
}

function renderStorage(drives) {
  const list = document.getElementById("storage");
  list.innerHTML = "";

  (drives || []).forEach(function (d) {
    const li = document.createElement("li");
    li.className = "storage-row";

    const name = document.createElement("span");
    name.className = "storage-name truncate";
    name.textContent = d.name;

    const badge = document.createElement("span");
    badge.className = "type-badge";
    badge.textContent = d.type;

    const size = document.createElement("span");
    size.className = "spec-val";
    size.textContent = d.sizeGb + " GB";

    const health = document.createElement("span");
    const ok = d.health && d.health.toLowerCase() === "healthy";
    health.className = ok ? "pill-health h-ok" : "pill-health h-bad";
    health.textContent = d.health || "Unknown";

    li.appendChild(name);
    li.appendChild(badge);
    li.appendChild(size);
    li.appendChild(health);
    list.appendChild(li);
  });
}

function chartDate(str) {
  const m = String(str).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return MONTHS[parseInt(m[2], 10) - 1] + " " + parseInt(m[3], 10);
  return str;
}

function renderChart(hist) {
  const chart = document.getElementById("chart");
  if (hist.length < 2) {
    chart.removeAttribute("role");
    chart.removeAttribute("aria-label");
    chart.innerHTML = "";
    const hint = document.createElement("p");
    hint.className = "dim chart-hint";
    hint.appendChild(faIcon("fa-chart-column"));
    hint.appendChild(document.createTextNode(" " + t("chart_hint")));
    chart.appendChild(hint);
    return;
  }
  chart.innerHTML = "";

  const minV = Math.min.apply(null, hist.map(function (h) { return h.s; }));
  const maxV = Math.max.apply(null, hist.map(function (h) { return h.s; }));
  const base = Math.max(0, Math.floor((minV - 8) / 10) * 10);
  const top = Math.min(100, Math.ceil((maxV + 5) / 10) * 10);

  hist.forEach(function (h, i) {
    const col = document.createElement("div");
    col.className = "chart-col";
    col.title = h.t + " — " + h.s + "%";
    const score = document.createElement("span");
    score.className = "chart-score sc-" + toneClass(h.s);
    score.textContent = h.s;

    const bar = document.createElement("div");
    bar.className = "chart-bar";

    const fill = document.createElement("div");
    fill.className = "chart-fill fill-" + toneClass(h.s);
    fill.style.height = "0";
    const pctH = ((h.s - base) / (top - base)) * 100;
    setTimeout(function () {
      fill.style.height = Math.max(6, pctH) + "%";
    }, 80 + i * 90);

    bar.appendChild(fill);

    const delta = document.createElement("span");
    delta.className = "chart-delta";
    if (i > 0) {
      const d = h.s - hist[i - 1].s;
      if (d > 0) {
        delta.classList.add("up");
        delta.appendChild(faIcon("fa-arrow-up"));
        delta.appendChild(document.createTextNode(d));
      } else if (d < 0) {
        delta.classList.add("down");
        delta.appendChild(faIcon("fa-arrow-down"));
        delta.appendChild(document.createTextNode(Math.abs(d)));
      } else {
        delta.appendChild(faIcon("fa-minus"));
      }
    } else {
      delta.innerHTML = "&nbsp;";
    }

    const date = document.createElement("span");
    date.className = "chart-date";
    date.textContent = chartDate(h.t);

    col.appendChild(score);
    col.appendChild(bar);
    col.appendChild(delta);
    col.appendChild(date);
    chart.appendChild(col);
  });

  chart.setAttribute("role", "img");
  chart.setAttribute("aria-label",
    hist.map(function (h) { return chartDate(h.t) + ": " + h.s + " percent"; }).join(", "));
}

function updateHistory(overall, stamp, subjects) {
  const el = document.getElementById("history");
  const predEl = document.getElementById("prediction");
  const hist = loadHistory();

  el.innerHTML = "";
  if (hist.length > 0) {
    const prev = hist[hist.length - 1].s;
    const diff = Math.round(overall) - prev;
    if (diff > 0) {
      el.className = "trend-pill trend-up";
      el.appendChild(faIcon("fa-arrow-trend-up"));
      el.appendChild(document.createTextNode(" " + t("hist_up", { x: diff })));
    } else if (diff < 0) {
      el.className = "trend-pill trend-down";
      el.appendChild(faIcon("fa-arrow-trend-down"));
      el.appendChild(document.createTextNode(" " + t("hist_down", { x: Math.abs(diff) })));
    } else {
      el.className = "trend-pill trend-same";
      el.appendChild(faIcon("fa-minus"));
      el.appendChild(document.createTextNode(" " + t("hist_same")));
    }
  } else {
    el.className = "trend-pill trend-new";
    el.appendChild(faIcon("fa-sparkles"));
    el.appendChild(document.createTextNode(" " + t("hist_first")));
  }

  const dMap = {};
  subjects.forEach(function (s) { dMap[s.key] = Math.round(s.score); });
  const entry = { s: Math.round(overall), t: stamp, d: dMap };

  if (hist.length && hist[hist.length - 1].t === stamp) {
    hist[hist.length - 1] = entry;
  } else {
    hist.push(entry);
  }
  while (hist.length > 8) hist.shift();
  localStorage.setItem("doccheck-history", JSON.stringify(hist));

  renderChart(hist);

  if (hist.length >= 4) {
    const half = Math.floor(hist.length / 2);
    let oldSum = 0, newSum = 0;
    for (let i = 0; i < half; i++) oldSum += hist[i].s;
    for (let i = half; i < hist.length; i++) newSum += hist[i].s;
    const oldAvg = oldSum / half, newAvg = newSum / (hist.length - half);
    predEl.innerHTML = "";
    predEl.appendChild(faIcon("fa-wand-magic-sparkles"));
    if (newAvg > oldAvg) {
      predEl.appendChild(document.createTextNode(" " + t("pred_up", { x: Math.round(newAvg - oldAvg) })));
    } else {
      predEl.appendChild(document.createTextNode(" " + t("pred_down", { x: Math.round(newAvg - oldAvg) })));
    }
    predEl.style.display = "";
  }
}

function countUp(el, target) {
  let current = 0;
  const step = Math.max(1, Math.round(target / 30));
  const timer = setInterval(function () {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current;
  }, 25);
}

function confettiBurst() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#C1443B", "#C89B3C", "#2F6F5E", "#4C7EA8", "#1F2D3A"];
  const bits = [];
  for (let i = 0; i < 130; i++) {
    bits.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      w: 6 + Math.random() * 7,
      h: 8 + Math.random() * 9,
      vy: 2 + Math.random() * 3.5,
      vx: -1.5 + Math.random() * 3,
      rot: Math.random() * 360,
      vr: -6 + Math.random() * 12,
      color: colors[i % colors.length]
    });
  }

  let frames = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bits.forEach(function (b) {
      b.x += b.vx;
      b.y += b.vy;
      b.rot += b.vr;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot * Math.PI / 180);
      ctx.fillStyle = b.color;
      ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
      ctx.restore();
    });
    frames++;
    if (frames < 220) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  draw();
}

function exportCSV() {
  const r = window.REPORT;
  if (!r) return;
  const rows = [
    ["DocCheck Report", r.scannedAt],
    ["Overall Score (%)", document.getElementById("overall-percent").textContent],
    ["Grade", document.getElementById("overall-grade").textContent],
    [],
    ["Subject", "Score %"],
  ];
  LAST_SUBJECTS.forEach(function (s) {
    rows.push([s.name, Math.round(s.score)]);
  });
  rows.push([]);
  rows.push(["Drive", "Type", "Size GB", "Health"]);
  (r.storage || []).forEach(function (d) {
    rows.push([d.name, d.type, d.sizeGb, d.health]);
  });
  rows.push([]);
  rows.push(["Startup App", "Command"]);
  (r.startup || []).forEach(function (a) {
    rows.push([a.name, a.cmd]);
  });

  const csv = rows.map(function (row) {
    return row.map(function (cell) {
      return '"' + String(cell === undefined ? "" : cell).replace(/"/g, '""') + '"';
    }).join(",");
  }).join("\r\n");

  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "doccheck-report.csv";
  a.click();
}

function applyStaticLabels() {
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.getElementById("lang-btn").setAttribute(
    "aria-label",
    LANG === "en" ? "Switch to Nepali language" : "अंग्रेजी भाषामा बदल्नुहोस्"
  );
}

function main() {
  if (typeof window.REPORT === "undefined") {
    document.getElementById("teacher-note").textContent = t("no_scan");
    return;
  }

  const r = window.REPORT;

  document.getElementById("scan-date").textContent =
    (LANG === "ne" ? "स्क्यान गरिएको: " : "Scanned on ") + r.scannedAt;

  const hist = loadHistory();
  const prevEntry = hist.length ? hist[hist.length - 1] : null;

  const subjects = buildSubjects(r, prevEntry ? prevEntry.d : null);
  LAST_SUBJECTS = subjects;
  renderSubjects(subjects);
  renderDiagnosis(diagnose(r));
  renderProcesses(r.topProcesses || []);
  renderStartup(r.startup);
  renderWifi(r.wifi);
  renderStorage(r.storage);

  const overall = subjects.reduce(function (sum, s) { return sum + s.score; }, 0) / subjects.length;
  LAST_OVERALL = overall;
  const grade = getGrade(overall);

  if (r.specs) {
    renderLaptopStrip(r.specs);
    renderLifeBanner(r.specs, overall);
  }
  renderActionPlan(buildSmartAdvice(r, grade, subjects));

  countUp(document.getElementById("overall-percent"), Math.round(overall));
  document.getElementById("overall-grade").textContent = grade;
  document.getElementById("teacher-note").textContent =
    (LANG === "ne" ? '" ' : "\u201C") + T["note_" + grade][LANG] + (LANG === "ne" ? " \"" : "\"");

  const moodEl = document.getElementById("mood");
  moodEl.innerHTML = "";
  moodEl.appendChild(faIcon(MOODS[grade]));
  moodEl.style.animation = "none";
  void moodEl.offsetWidth;
  moodEl.style.animation = "";

  const stampEl = document.getElementById("overall-grade");
  stampEl.classList.remove("slam");
  void stampEl.offsetWidth;
  stampEl.classList.add("slam");

  const ring = document.getElementById("score-ring");
  const deg = Math.max(0, Math.min(100, Math.round(overall))) * 3.6;
  ring.style.background =
    "conic-gradient(" + RING_COLORS[toneClass(overall)] + " " + deg + "deg, " + RING_TRACK + " " + deg + "deg)";

  updateHistory(overall, r.scannedAt, subjects);

  if (grade === "A") {
    setTimeout(confettiBurst, 400);
  }
}

function syncHtmlLang() {
  document.documentElement.lang = LANG === "ne" ? "ne" : "en";
}

document.getElementById("print-btn").addEventListener("click", function () {
  window.print();
});

const PRINT_OPENED = [];
window.addEventListener("beforeprint", function () {
  document.querySelectorAll("details:not([open])").forEach(function (d) {
    d.open = true;
    PRINT_OPENED.push(d);
  });
});
window.addEventListener("afterprint", function () {
  PRINT_OPENED.forEach(function (d) { d.open = false; });
  PRINT_OPENED.length = 0;
});

document.getElementById("csv-btn").addEventListener("click", exportCSV);

const SCAN_BTN = document.getElementById("scan-btn");
const SCAN_STATUS = document.getElementById("scan-status");
const SCAN_ENDPOINTS = ["/api/scan", "http://localhost:8619/api/scan"];

function fetchScan(i) {
  return fetch(SCAN_ENDPOINTS[i], { cache: "no-store" }).then(function (res) {
    if (!res.ok) throw new Error("scan endpoint unavailable");
    return res.text();
  }).catch(function (err) {
    if (i + 1 < SCAN_ENDPOINTS.length) return fetchScan(i + 1);
    throw err;
  });
}

SCAN_BTN.addEventListener("click", function () {
  if (SCAN_BTN.disabled) return;
  const label = SCAN_BTN.querySelector("span");
  SCAN_BTN.disabled = true;
  SCAN_BTN.classList.add("scanning");

  let secs = 0;
  label.textContent = t("scan_running");
  if (SCAN_STATUS) SCAN_STATUS.textContent = t("scan_running");
  const tick = setInterval(function () {
    secs += 1;
    label.textContent = t("scan_running") + " " + secs + "s";
    if (SCAN_STATUS) SCAN_STATUS.textContent = t("scan_running") + " " + secs + "s";
  }, 1000);

  const finish = function (msg) {
    clearInterval(tick);
    SCAN_BTN.disabled = false;
    SCAN_BTN.classList.remove("scanning");
    label.textContent = t("scan_btn_label");
    if (SCAN_STATUS) SCAN_STATUS.textContent = msg;
  };

  const prevReport = window.REPORT;

  fetchScan(0)
    .then(function (txt) {
      const s = document.createElement("script");
      s.textContent = txt;
      document.body.appendChild(s);
      s.remove();
      if (!window.REPORT || window.REPORT === prevReport) {
        throw new Error("scan payload invalid");
      }
      main();
      const dateEl = document.getElementById("scan-date");
      if (dateEl) {
        dateEl.classList.remove("flash");
        void dateEl.offsetWidth;
        dateEl.classList.add("flash");
      }
      finish(t("scan_status_ok") + " — " + window.REPORT.scannedAt);
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    })
    .catch(function () {
      finish(t("scan_fail"));
    });
});

document.getElementById("lang-btn").addEventListener("click", function () {
  LANG = LANG === "en" ? "ne" : "en";
  localStorage.setItem("doccheck-lang", LANG);
  syncHtmlLang();
  applyStaticLabels();
  main();
});

syncHtmlLang();
applyStaticLabels();
main();