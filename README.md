# 🏛️ Hosteler Records

> A modern, beautiful, and feature-rich student directory platform for hostel communities

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://your-demo-url.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Made with Love](https://img.shields.io/badge/made%20with-%E2%9D%A4-red)](https://github.com/yourusername)

---

## 📖 Table of Contents

- [Why Hosteler Records?](#-why-hosteler-records)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [How It Helps Users](#-how-it-helps-users)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Setup Guide](#-setup-guide)
- [File Structure](#-file-structure)
- [Configuration](#-configuration)
- [Contributing](#-contributing)
- [Support](#-support)
- [License](#-license)

---

## 🎯 Why Hosteler Records?

Hosteler Records was created to solve a common problem in hostel communities: **staying connected after graduation**. When students leave the hostel, they often lose touch with batchmates and juniors. Important contacts are scattered across WhatsApp groups, paper registers, and personal notebooks.

### The Problem
- 📱 Contact information gets lost over time
- 🔍 No easy way to find alumni from specific batches or branches
- 💭 Memories and messages fade away
- 🤝 Difficult to network with seniors or juniors
- 📊 No centralized database of hostel residents

### The Solution
Hosteler Records creates a **living, searchable directory** of every student who called the hostel home. It's more than just a contact list — it's a digital memory book that preserves connections, stories, and community.

---

## ✨ Features

### 🎨 **Beautiful Modern UI**
- **Dark & Light Mode** — Toggle between themes with a smooth animated switch
- **Responsive Design** — Perfect on desktop, tablet, and mobile
- **Animated Backgrounds** — Floating particles, gradient orbs, and grid patterns
- **Smooth Animations** — Cards fade in, buttons pulse, transitions are buttery smooth
- **No Text Selection** — Clean UX without accidental text highlighting

### 📋 **Smart Directory**
- **Live Data Sync** — Automatically fetches latest data from Google Forms
- **Fast Loading** — Parallel proxy racing loads data in 1-3 seconds
- **Profile Cards** — Each student gets a beautiful card with:
  - 4:3 aspect ratio profile photo
  - Name, branch, and admission year
  - Hostel years stayed
  - Personal memory/message
  - Direct action buttons (Call, WhatsApp, Email)

### 🔍 **Powerful Search & Filters**
- **Real-time Search** — Search by name, branch, year, or memory text
- **Filter by Year** — Find all students from a specific batch
- **Filter by Branch** — View only Electronics, Computer Science, etc.
- **Combined Filters** — Search "Aditya" + "2024" + "Electronics" simultaneously
- **Results Counter** — Shows "X of Y students" with active filters
- **Reset Button** — Clear all filters instantly

### 🖼️ **Image Management**
- **Google Drive Integration** — Photos uploaded via Google Forms
- **CORS Bypass** — Uses wsrv.nl proxy to display Drive images reliably
- **Click to Expand** — Tap any photo for fullscreen lightbox view
- **Lazy Loading** — Images load only when needed for better performance
- **Fallback Placeholders** — Shows initials if photo is missing

### 💬 **Shoutout Wall**
- **Scrolling Messages** — Horizontal auto-scroll of student memories
- **Pause on Hover** — Stop scrolling to read a message
- **Animated Icon** — Bullhorn icon shakes to grab attention
- **Randomized Display** — Shuffled each page load for variety
- **Expandable Messages** — Click truncated messages to read full text

### 📞 **Direct Contact Actions**
- **One-Tap Call** — `tel:` links open phone dialer
- **WhatsApp Chat** — Pre-filled message: "Hi [Name]! Found you on Hosteler Records 👋"
- **Email Compose** — Opens email client with subject line
- **Smart Validation** — Buttons disabled if contact info is missing
- **Privacy First** — Phone/email hidden from card display (only in action buttons)

### 💝 **Support & Feedback System**
- **Donation Modal** — UPI QR code + copy button
- **Support Page** — Dedicated page with:
  - UPI payment with auto-generated QR code
  - Social media links (Twitter, GitHub, LinkedIn, Instagram)
  - Feature request form
  - Bug report submission
- **Google Sheets Integration** — All feedback saved automatically
- **Animated Heart Button** — Floating button + header/footer buttons

### 🎨 **Theme System**
- **Persistent Preference** — Theme saved to localStorage
- **Smooth Transitions** — All colors fade gracefully when switching
- **Dark Theme** — Deep blacks, cyan accents, neon highlights
- **Light Theme** — Clean whites, blue accents, professional look
- **System-wide** — Theme applies to main site and support page

### 🛠️ **Developer Features**
- **Manual CSV Paste** — Fallback if proxies fail
- **Debug Mode** — Press `Ctrl+Shift+D` to see column mapping
- **Error Handling** — Clear error messages with troubleshooting steps
- **Console Logging** — Detailed logs for debugging
- **Fallback Parser** — Works even if PapaParse CDN fails

---

## 📸 Screenshots

### Desktop View
```
┌─────────────────────────────────────────────────────────────┐
│  ⬡ HOSTELER RECORDS        [Stats]      [💝 Support] [🌙] [●LIVE] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              ━━━ STUDENT DIRECTORY · HOSTEL COMMUNITY ━━━   │
│                                                             │
│                      HOSTELER RECORDS                       │
│            Every student. Every memory. Every batch.        │
│                  $> fetching records...                     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  🔊 SHOUTOUTS & MEMORIES                                    │
│  ╔═══════╗  ╔═══════╗  ╔═══════╗                           │
│  ║ Card  ║  ║ Card  ║  ║ Card  ║  ← Scrolling              │
│  ╚═══════╝  ╚═══════╝  ╚═══════╝                           │
├─────────────────────────────────────────────────────────────┤
│  SRC:// [Search...]    [Year ▾] [Branch ▾] [↻ Reset]      │
├─────────────────────────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                       │
│  │ Card │ │ Card │ │ Card │ │ Card │                       │
│  │      │ │      │ │      │ │      │                       │
│  └──────┘ └──────┘ └──────┘ └──────┘                       │
└─────────────────────────────────────────────────────────────┘
```

### Mobile View (2-column grid)
```
┌───────────────────────┐
│ ⬡ HOSTELER  [💝] [🌙] │
├───────────────────────┤
│   HOSTELER RECORDS    │
│   ━━━━━━━━━━━━━━━     │
├───────────────────────┤
│ 🔊 SHOUTOUT WALL →    │
├───────────────────────┤
│ [Search box]          │
│ [Year ▾] [Branch ▾]   │
├───────────────────────┤
│  ┌─────┐ ┌─────┐      │
│  │Card │ │Card │      │
│  └─────┘ └─────┘      │
│  ┌─────┐ ┌─────┐      │
│  │Card │ │Card │      │
│  └─────┘ └─────┘      │
└───────────────────────┘
```

---

## 🤝 How It Helps Users

### For Current Students
- 📚 **Find Seniors** — Get guidance from students in higher years
- 🏠 **Connect with Batchmates** — Easy way to reach hostel friends
- 💡 **Learn from Memories** — Read advice and experiences from alumni
- 📞 **Quick Contact** — One tap to call or message anyone

### For Alumni
- 🎓 **Stay Connected** — Keep in touch with the hostel community
- 👥 **Network with Juniors** — Mentor students in your field
- 📝 **Share Wisdom** — Leave messages for future generations
- 🔍 **Find Old Friends** — Search by batch year or branch

### For Hostel Administration
- 📊 **Maintain Records** — Digital archive of all residents
- 📈 **Track Statistics** — See distribution by branch, year, etc.
- 🔄 **Easy Updates** — Data syncs automatically from Google Forms
- 💾 **Permanent Storage** — Never lose student information

### For Recruiters/Organizations
- 🎯 **Targeted Outreach** — Find students by branch or batch
- 📧 **Bulk Communication** — Export contacts for event invitations
- 🤝 **Alumni Network** — Connect with graduated students
- 🏢 **Campus Hiring** — Reach out to specific batches

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** — Semantic markup, accessible structure
- **CSS3** — Custom properties (CSS variables), grid, flexbox
- **JavaScript (ES6+)** — Async/await, modules, modern syntax
- **Google Fonts** — Outfit (headings), Space Grotesk (body), JetBrains Mono (monospace)
- **Font Awesome 6** — Icons for UI elements

### Libraries & APIs
- **Papa Parse** — Robust CSV parsing with quoted field support
- **QRCode.js** — Generate UPI payment QR codes
- **wsrv.nl** — Image proxy CDN to bypass Google Drive CORS
- **Google Sheets API** — Data storage via published CSV
- **Google Apps Script** — Form submission handling

### Design Principles
- **Mobile-First** — Built for phones, enhanced for desktop
- **Progressive Enhancement** — Works without JavaScript (basic functionality)
- **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation
- **Performance** — Lazy loading, efficient rendering, minimal reflows
- **Dark Mode** — System preference + manual toggle

### Architecture
```
┌─────────────────┐
│  Google Forms   │ ← Students submit data
└────────┬────────┘
         │
         ↓ (Auto-publish)
┌─────────────────┐
│  Google Sheets  │ ← Data stored
└────────┬────────┘
         │
         ↓ (Published as CSV)
┌─────────────────┐
│  CORS Proxies   │ ← Fetch CSV (parallel race)
│  • allorigins   │
│  • corsproxy    │
│  • codetabs     │
└────────┬────────┘
         │
         ↓ (Parse CSV)
┌─────────────────┐
│  Papa Parse     │ ← Handle quoted commas
└────────┬────────┘
         │
         ↓ (Render)
┌─────────────────┐
│   Web App       │ ← Display cards
│  • Search       │
│  • Filter       │
│  • Lightbox     │
└─────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime, Notepad++)
- Google account (for Forms & Sheets)

### Quick Start (3 steps)

1. **Download the files**
   ```bash
   # Clone or download the repository
   git clone https://github.com/yourusername/hosteler-records.git
   cd hosteler-records
   ```

2. **Open in browser**
   ```bash
   # Just open index.html in your browser
   # Or use a local server:
   python -m http.server 8000
   # Visit: http://localhost:8000
   ```

3. **Configure your data source**
   - Create a Google Form for student data
   - Publish the response sheet as CSV
   - Update the `SHEET_CSV` URL in `app.js`

That's it! 🎉

---

## 📚 Setup Guide

### Step 1: Create Google Form

Create a form with these fields:

| Field Name | Type | Required |
|------------|------|----------|
| Name | Short answer | ✅ Yes |
| Branch | Dropdown | ✅ Yes |
| Admission Year | Dropdown | ✅ Yes |
| Hosteller in | Short answer | ✅ Yes |
| Contact Detailed | Short answer | ❌ Optional |
| Email | Email | ❌ Optional |
| Upload Your Profile Picture | File upload | ❌ Optional |
| Hostel Memories & Message to Juniors | Paragraph | ❌ Optional |

**Important:** Set file upload to accept images and save to Google Drive.

### Step 2: Publish Sheet as CSV

1. Open the Google Sheet with form responses
2. Click **File → Share → Publish to web**
3. Select **Entire Document** and **Comma-separated values (.csv)**
4. Click **Publish**
5. Copy the published URL (looks like `https://docs.google.com/spreadsheets/d/e/2PACX-...`)

### Step 3: Update Configuration

Open `app.js` and find this line (around line 14):

```javascript
const SHEET_CSV = "YOUR_GOOGLE_SHEET_CSV_URL_HERE";
```

Replace with your actual URL:

```javascript
const SHEET_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQU5qme...";
```

### Step 4: Configure Support Page (Optional)

If using the support/feedback feature:

1. Create a new Google Sheet for feedback
2. Add columns: `Timestamp | Name | Email | Type | Message`
3. Go to **Extensions → Apps Script**
4. Paste the feedback handler code (see `support.html` comments)
5. Deploy as web app
6. Copy the deployment URL
7. Update `SCRIPT_URL` in `support.html`

### Step 5: Customize Branding

**Update social links in `support.html`:**
```html
<a href="https://twitter.com/YOUR_HANDLE" ...>
<a href="https://github.com/YOUR_USERNAME" ...>
<a href="https://linkedin.com/in/YOUR_PROFILE" ...>
<a href="https://instagram.com/YOUR_HANDLE" ...>
```

**Update UPI ID:**
```javascript
// In app.js and support.html
const upiId = "yourupi@bank";
```

**Update colors (optional):**
Edit CSS variables in `style.css`:
```css
:root {
  --cyan: #00e5ff;  /* Change to your color */
  --orange: #ff6b00; /* Change to your color */
  /* ... */
}
```

---

## 📁 File Structure

```
hosteler-records/
│
├── index.html              # Main directory page
├── support.html            # Support & feedback page
├── style.css               # All styles (dark/light themes)
├── app.js                  # Main application logic
│
├── README.md               # This file
├── LICENSE                 # MIT License
│
└── assets/                 # (optional) Store local images
    └── logo.png
```

### File Purposes

| File | Purpose | Lines |
|------|---------|-------|
| `index.html` | Main page structure, includes header, hero, controls, cards, lightbox, footer | ~180 |
| `support.html` | Support page with donation, social links, feedback form (single file) | ~500 |
| `style.css` | All styling: layout, colors, animations, responsive design, themes | ~660 |
| `app.js` | Data fetching, parsing, rendering, search, filters, lightbox, theme toggle | ~540 |

**Total:** ~1,880 lines of clean, commented code

---

## ⚙️ Configuration

### Column Name Mapping

If your Google Form uses different column names, update `COL_DEF` in `app.js`:

```javascript
const COL_DEF = {
  name    : { name: "Student Name",     idx: 1 }, // Update name here
  branch  : { name: "Department",       idx: 2 }, // Match your sheet
  year    : { name: "Year of Joining",  idx: 3 },
  // ... etc
};
```

### Customizing Features

**Disable shoutout wall:**
```javascript
// In app.js, comment out this line:
// buildShoutoutWall();
```

**Change card grid columns:**
```css
/* In style.css */
.cards-grid {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  /* Change 280px to your preferred min width */
}
```

**Adjust search debounce:**
```javascript
// Add debounce to search input in app.js:
let searchTimeout;
si.addEventListener("input", () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(apply, 300); // 300ms delay
});
```

### Performance Tuning

**Reduce animation complexity (for older devices):**
```css
/* In style.css, disable heavy animations: */
.orb { display: none; }
.grid-bg { opacity: 0.5; }
* { animation: none !important; }
```

**Lazy load images more aggressively:**
```javascript
// In app.js, change lazy loading threshold:
img.loading = "lazy";
img.decoding = "async";
// Add intersection observer for better control
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs
1. Check if the bug already exists in [Issues](https://github.com/yourusername/hosteler-records/issues)
2. Create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser/device info

### Suggesting Features
1. Open an issue with `[Feature Request]` in the title
2. Describe the feature and its use case
3. Explain how it helps users

### Pull Requests
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly (desktop + mobile)
5. Commit: `git commit -m "Add amazing feature"`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style
- Use 2 spaces for indentation
- Comment complex logic
- Follow existing naming conventions
- Test in both light and dark themes
- Ensure mobile responsiveness

---

## 💬 Support

### Get Help
- 📧 Email: adityahgamer@gmail.com (or your email)
- 🐛 [Report Bug](https://github.com/yourusername/hosteler-records/issues)
- 💡 [Request Feature](https://github.com/yourusername/hosteler-records/issues)
- 💬 [Discussions](https://github.com/yourusername/hosteler-records/discussions)

### Donate
If this project helped you, consider supporting the developer:

**UPI:** `adityahgamer@oksbi`

Scan QR code in the app or visit the [Support Page](support.html)

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Aditya Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 Acknowledgments

- **Google Forms & Sheets** — Free data storage and management
- **wsrv.nl** — Image proxy CDN for CORS bypass
- **Papa Parse** — Reliable CSV parsing library
- **Font Awesome** — Beautiful icon library
- **QRCode.js** — UPI QR code generation
- **All Contributors** — Everyone who helped improve this project

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/hosteler-records&type=Date)](https://star-history.com/#yourusername/hosteler-records&Date)

---

## 📈 Roadmap

### Planned Features
- [ ] **Export to PDF** — Download directory as formatted PDF
- [ ] **Stats Dashboard** — Charts showing branch/batch distribution
- [ ] **Student Profile Modal** — Full-screen detail view on card click
- [ ] **Batch Grouping** — Toggle between grid and grouped-by-year view
- [ ] **Share Profile Links** — Copy URL with filters to share specific profiles
- [ ] **Offline Mode** — Cache data for offline access
- [ ] **PWA Support** — Install as app on mobile/desktop
- [ ] **Multi-language** — Hindi, regional language support
- [ ] **Admin Panel** — Moderate content, manage users
- [ ] **Advanced Search** — Boolean operators, regex support

### Version History
- **v1.0.0** (Current) — Initial release with all core features
- **v0.9.0** — Beta testing phase
- **v0.5.0** — Alpha with basic functionality

---

## 📞 Contact

**Aditya Kumar**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: adityahgamer@gmail.com
- LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- Twitter: [@yourhandle](https://twitter.com/yourhandle)

---

<div align="center">

**Made with ❤️ for the Hostel Community**

[⬆ Back to Top](#️-hosteler-records)

</div>
