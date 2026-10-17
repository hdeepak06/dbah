# DBAH QUAD DIGITAL LABS — Official Company Portfolio Website

> **"Four Minds. One Vision. Infinite Innovation."**

A luxury-grade, high-performance, animated digital agency portfolio website for **DBAH Quad Digital Labs**, crafted with a deep black (`#04060A`), midnight navy (`#080D1A`), and metallic gold (`#D4AF37`) visual identity.

Rooted in **Kondanayakana Halli (KN Halli)**, Hosapete / Hampi region, Karnataka, India.

---

## 🌟 Highlights & Features

- **Official Map Emblem & Logo Integration**: Features the authentic high-resolution emblem (`assets/images/dbah-quad-logo.png`) showcasing the four innovator silhouettes, infinity loop, and the geographic map of Kondanayakana Halli by the Tungabhadra river.
- **Fast 1.8s Logo Reveal Animation**: Subtle golden glow, rotating golden orbit ring, light sweep, and progress indicator with a dedicated "Skip" button and `sessionStorage` guard to avoid repetitive replays.
- **Ambient Gold Particle Atmosphere**: Custom interactive HTML5 Canvas particle system simulating floating gold dust and ambient luxury lighting.
- **Micro-Interactions & Golden Button System**:
  - Reusable `.btn-gold` with dynamic 45° light sweep shimmer, hover elevation, and gold glow.
  - Secondary `.btn-gold-outline` for balanced hierarchy.
  - Custom focus states and accessible keyboard navigation.
- **Verified Portfolio Showcase**:
  - **Sri Sai Blossom Kids** — Live deployment verified (`https://sri-sai-blossom-kids.vercel.app`)
  - **Maya Valley Resort Hampi** — Live deployment verified (`https://maya-valley-resort-hampi-sxdc.vercel.app`)
  - **Sri Manjunatha Tours & Travels** — GitHub repository verified (`https://github.com/hdeepak06/sri-manjunatha-travels`)
  - **Anil Bike Rental Hampi** — Live deployment verified (`https://anil-bike-rental-hampi.vercel.app`)
  - **FinalMealmate Food Delivery & Surplus Donation** — Live deployment verified (`https://finalmealmate-food-delivery-app.vercel.app`)
  - **Medico Clinic & Pharmacy Management** — Live deployment verified (`https://medico-six-sigma.vercel.app`)
  - **BallotBridge Secure E-Voting Platform** — Live deployment verified (`https://ballot-bridge-lovat.vercel.app`)
  - **Course Registration Academic Portal** — GitHub repository verified (`https://github.com/hdeepak06/course-registration`)
- **Direct Interactive Lead System**: Validated contact form with two-tier confirmation allowing clients to send their project enquiry directly via **formatted WhatsApp message** or a pre-filled **Email draft** (`mailto:`).
- **Zero Heavy Frameworks**: Pure HTML5, CSS3, and Vanilla JavaScript with `IntersectionObserver` scroll animations and complete `prefers-reduced-motion` compliance.

---

## 📁 Project Directory Structure

```text
dbah/
├── assets/
│   ├── images/
│   │   ├── dbah-quad-logo.png          # Official Kondanayakana Halli emblem (1254x1254)
│   │   ├── favicon.png                 # Crisp 192x192 favicon
│   │   └── projects/
│   │       ├── sri-sai-blossom.png     # Genuine school exterior photo
│   │       ├── maya-valley-resort.webp # Genuine Hampi resort photo
│   │       ├── sri-manjunatha-travels.png # Genuine fleet photo
│   │       └── anil-bike-rental.png    # Genuine rental fleet photo
│   └── icons/
├── css/
│   └── style.css                       # Luxury black & gold design system & responsive layout
├── js/
│   └── main.js                         # Intro controller, particle canvas, nav, modals, forms
├── 404.html                            # Custom branded error page
├── index.html                          # Semantic SEO-optimized website markup
├── vercel.json                         # Vercel CDN caching and header configuration
├── .gitignore                          # Clean repository rules
└── README.md                           # Documentation & deployment guide
```

---

## 🚀 Local Preview Instructions

You can preview the website locally using any static web server:

### Option 1: Python HTTP Server (Recommended)
```bash
# In PowerShell or terminal from G:\websites\dbah:
python -m http.server 8080
```
Open **[http://localhost:8080](http://localhost:8080)** in your browser.

### Option 2: Direct File Open
Double click `index.html` or run via PowerShell:
```powershell
Start-Process "index.html"
```

---

## 🐙 Publishing to GitHub

To create and push to a new GitHub repository named `dbah-quad-digital-labs`:

1. Create a new public repository on GitHub:
   [https://github.com/new](https://github.com/new)
   - Repository name: `dbah-quad-digital-labs`
   - Description: `Official website for DBAH Quad Digital Labs — Four Minds. One Vision. Infinite Innovation.`
   - Leave "Initialize with README" unchecked.

2. Run the following Git commands in `G:\websites\dbah`:
   ```bash
   git init
   git add .
   git commit -m "Initial release: DBAH Quad Digital Labs official portfolio website"
   git branch -M main
   git remote add origin https://github.com/hdeepak06/dbah-quad-digital-labs.git
   git push -u origin main
   ```

---

## ▲ Deploying to Vercel (Free Hosting)

Because this website is built with clean static HTML5, CSS3, and JavaScript, deploying to Vercel takes under 60 seconds with 100% Core Web Vitals score:

### Method 1: Via Vercel Web Dashboard (Zero Config)
1. Navigate to **[https://vercel.com/new](https://vercel.com/new)**.
2. Select your GitHub account and import the repository **`dbah-quad-digital-labs`**.
3. Framework Preset: **Other** (Root directory: `./`).
4. Click **Deploy**. Vercel will instantly provision a live URL (e.g. `https://dbah-quad-digital-labs.vercel.app`).

### Method 2: Via Vercel CLI
```bash
npx vercel
```
Follow the interactive prompts and confirm deployment of the current directory.

---

## 🏛️ Founding Team ("DBAH")

| Initial | Founder | Role | Focus |
|:---:|:---|:---|:---|
| **D** | **Deepak** | Full-Stack Lead | Python/Django, System Architecture & APIs |
| **B** | **Bharath** | Frontend Strategist | UI/UX Design, Modern CSS & Responsive Layouts |
| **A** | **Adarsh** | Solutions Architect | Systems Design, Workflow Optimization & Logic |
| **H** | **Hari** | Quality Assurance | Rigorous Cross-device Testing & Performance |

**Quad** represents four distinct minds working seamlessly toward one shared vision of digital excellence.
