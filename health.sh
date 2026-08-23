#!/bin/bash

echo "DocCheck is scanning your laptop..."

DISK=$(df -h /c 2>/dev/null | awk 'END{print $5}' | tr -d '%')

RAM=$(powershell.exe -NoProfile -Command "$os = Get-CimInstance Win32_OperatingSystem; [math]::Round((($os.TotalVisibleMemorySize - $os.FreePhysicalMemory) / $os.TotalVisibleMemorySize) * 100)" 2>/dev/null | tail -1 | tr -d '\r')

BATTERY=$(powershell.exe -NoProfile -Command "(Get-CimInstance Win32_Battery).EstimatedChargeRemaining" 2>/dev/null | tail -1 | tr -d '\r')

case $DISK in ''|*[!0-9]*) DISK=0 ;; esac
case $RAM in ''|*[!0-9]*) RAM=0 ;; esac
case $BATTERY in ''|*[!0-9]*) BATTERY=100 ;; esac

cat > data.js << EOF
window.REPORT = {
  scannedAt: "$(date '+%Y-%m-%d %H:%M')",
  diskUsed: ${DISK},
  ramUsed: ${RAM},
  battery: ${BATTERY}
};
EOF

echo "Scan complete!"
echo "  Disk used: ${DISK}%"
echo "  RAM used:  ${RAM}%"
echo "  Battery:   ${BATTERY}%"
echo ""
echo "Now open index.html in your browser."
