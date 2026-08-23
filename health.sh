#!/bin/bash

echo "DocCheck is scanning your laptop (takes a few seconds)..."

DISK=$(df /c 2>/dev/null | awk 'END{print $5}' | tr -d '%')
if [ -z "$DISK" ]; then DISK=$(df /mnt/c 2>/dev/null | awk 'END{print $5}' | tr -d '%'); fi

RAM=$(powershell.exe -NoProfile -Command "\$os = Get-CimInstance Win32_OperatingSystem; [math]::Round(((\$os.TotalVisibleMemorySize - \$os.FreePhysicalMemory) / \$os.TotalVisibleMemorySize) * 100)" 2>/dev/null | tail -1 | tr -d '\r')

CPU=$(powershell.exe -NoProfile -Command "(Get-CimInstance Win32_Processor | Measure-Object -Property LoadPercentage -Average).Average" 2>/dev/null | tail -1 | tr -d '\r')

BATTERY=$(powershell.exe -NoProfile -Command "(Get-CimInstance Win32_Battery).EstimatedChargeRemaining" 2>/dev/null | tail -1 | tr -d '\r')

STATUS=$(powershell.exe -NoProfile -Command "(Get-CimInstance Win32_Battery).BatteryStatus" 2>/dev/null | tail -1 | tr -d '\r')

PROCS=$(powershell.exe -NoProfile -Command "Get-Process | Sort-Object WS -Descending | Select-Object -First 5 | ForEach-Object { '{0}|{1}' -f \$_.Name, [math]::Round(\$_.WS/1MB) }" 2>/dev/null | tr -d '\r')

case $DISK in ''|*[!0-9]*) DISK=0 ;; esac
case $RAM in ''|*[!0-9]*) RAM=0 ;; esac
case $CPU in ''|*[!0-9]*) CPU=0 ;; esac
case $BATTERY in ''|*[!0-9]*) BATTERY=100 ;; esac

if [ "$STATUS" = "2" ]; then CHARGING=true; else CHARGING=false; fi

PROC_JSON=""
FIRST=1
while IFS='|' read -r pname pmb; do
  if [ -n "$pname" ]; then
    if [ $FIRST -eq 1 ]; then FIRST=0; else PROC_JSON="$PROC_JSON,"; fi
    PROC_JSON="$PROC_JSON{\"name\":\"$pname\",\"mb\":$pmb}"
  fi
done <<< "$PROCS"

if [ -z "$PROC_JSON" ]; then PROC_JSON='{\"name\":\"unknown\",\"mb\":0}'; fi

cat > data.js << EOF
window.REPORT = {
  scannedAt: "$(date '+%Y-%m-%d %H:%M')",
  diskUsed: ${DISK},
  ramUsed: ${RAM},
  cpuLoad: ${CPU},
  battery: ${BATTERY},
  charging: ${CHARGING},
  topProcesses: [${PROC_JSON}]
};
EOF

echo ""
echo "Scan complete!"
echo "  Disk used:   ${DISK}%"
echo "  RAM used:    ${RAM}%"
echo "  CPU load:    ${CPU}%"
echo "  Battery:     ${BATTERY}% (charging: ${CHARGING})"
echo ""
echo "Now open index.html in your browser."
