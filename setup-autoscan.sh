#!/bin/bash

echo "DocCheck Auto-Scan Installer"
echo "============================="
echo ""
echo "This registers a Windows Scheduled Task so your laptop"
echo "scans itself automatically - no manual commands ever again."
echo ""
echo "  1) Every Sunday at 5:00 PM   (no admin needed)"
echo "  2) Every day at 9:00 AM      (no admin needed)"
echo "  3) Every time you log on     (needs admin once)"
echo "  4) Remove the scheduled task (uninstall)"
echo ""
read -p "Choose 1, 2, 3 or 4: " CHOICE

TASKNAME="DocCheckAutoScan"
FOLDER=$(cd "$(dirname "$0")" && pwd)
WINFOLDER=$(cygpath -w "$FOLDER" 2>/dev/null || echo "$FOLDER")
BASHPATH=$(cygpath -w "$(which bash)" 2>/dev/null || echo "bash")
CMD="\"$BASHPATH\" \"$WINFOLDER\\health.sh\""

case $CHOICE in
  1)
    schtasks.exe /Create /TN "$TASKNAME" /TR "$CMD" /SC WEEKLY /D SUN /ST 17:00 /F
    echo "Done! DocCheck will scan every Sunday at 5:00 PM."
    ;;
  2)
    schtasks.exe /Create /TN "$TASKNAME" /TR "$CMD" /SC DAILY /ST 09:00 /F
    echo "Done! DocCheck will scan every day at 9:00 AM."
    ;;
  3)
    schtasks.exe /Create /TN "$TASKNAME" /TR "$CMD" /SC ONLOGON /F
    if [ $? -eq 0 ]; then
      echo "Done! DocCheck will scan every time you log on."
    else
      echo "Needs admin. Right-click Git Bash > Run as administrator, then run this again."
    fi
    ;;
  4)
    schtasks.exe /Delete /TN "$TASKNAME" /F
    echo "Scheduled scan removed."
    ;;
  *)
    echo "Invalid choice. Nothing changed."
    ;;
esac

echo ""
echo "Verify it exists:  schtasks //Query //TN $TASKNAME"
