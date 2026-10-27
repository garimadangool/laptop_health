
# DocCheck 🩺💻

**A doctor for your laptop that grades it like homework.**

DocCheck is a Windows laptop health diagnostic tool that uses real system information to assess your laptop's condition and present the results in a simple, report-card-style dashboard.

Instead of overwhelming users with technical numbers, DocCheck assigns letter grades from A to F across different areas of laptop health, combines them into an overall health score, and provides practical suggestions to help users address potential issues.

## ✨ Features

- **Health Grades:** Get individual A–F grades for CPU activity, RAM usage, disk space, battery health, startup programs, storage, Wi-Fi, and system uptime.
- **Doctor's Prescription:** Receive straightforward suggestions for improving your laptop's condition.
- **Scan History:** Save previous scan results and track changes in laptop health over time.
- **Deep Dive:** Explore additional diagnostic details, including running processes and startup programs.
- **Bilingual Interface:** Switch between English and Nepali.
- **Export Reports:** Print health reports or download scan results as CSV files.
- **Real System Data:** Collect actual Windows system information rather than relying on simulated sample data.

## 🩺 How It Works

1. **Scan:** Collect system information from your Windows laptop.
2. **Assess:** Evaluate different health indicators and assign letter grades.
3. **Review:** View your overall health score and individual category grades.
4. **Improve:** Follow the suggested prescriptions to address potential issues.
5. **Track:** Review previous scans to monitor changes over time.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML | Dashboard structure |
| CSS | Layout and visual styling |
| JavaScript | Diagnostic logic and dashboard interactions |
| PowerShell | Collecting Windows system information |
| Git Bash | Development workflow and command-line operations |
| localStorage | Saving scan history in the browser |
| Git & GitHub | Version control and project hosting |

## 🚀 Getting Started

### Prerequisites

- A Windows laptop or PC
- PowerShell
- A modern web browser
- Git, if you want to clone the repository

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd YOUR_PROJECT_FOLDER
   ```

3. Follow the project's instructions for running the PowerShell diagnostic scripts and opening the dashboard.

> **Note:** Browser-based JavaScript cannot independently access all Windows hardware and system diagnostics. Follow the project's actual data-collection workflow to ensure the dashboard receives real system information.

## 📊 Understanding the Grades

DocCheck presents laptop health indicators using a familiar school report-card format, with grades ranging from A to F.

Each category is evaluated separately, and the category grades contribute to an overall laptop health score.

The grades are intended to make diagnostic information easier to understand. They are not a substitute for professional hardware testing or repair.

## 💡 What Makes DocCheck Different?

Traditional system-monitoring tools often present users with technical metrics that can be difficult to interpret.

DocCheck takes a more approachable route by turning those metrics into a familiar report card, pairing grades with practical recommendations and keeping previous reports available for comparison.

**The goal:** Make laptop health easier to understand, not just easier to measure.

## 🔮 Future Improvements

Potential areas for further development include:

- More detailed diagnostic explanations
- Additional hardware health indicators
- Improved scan-to-scan comparisons
- More personalized maintenance recommendations

## 👩‍💻 Author

**Garima Dangol**

- GitHub: [garimadangool](https://github.com/garimadangool)
- LinkedIn: [Garima Dangol](https://np.linkedin.com/in/garima-dangol-78b0b9368)
