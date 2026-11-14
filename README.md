# 🐼 A Little Date With You ❤️
### Premium Interactive 3D Romantic Invitation Website

A production-ready, interactive 3D romantic date invitation website crafted with love. Built with **React**, **Vite**, **Tailwind CSS**, **Three.js (Procedural 3D Kawaii Pandas)**, **Framer Motion**, and **EmailJS**.

---

## ✨ Features & Visual Highlights

- **3D Kawaii Panda Experience**:
  - Two cute 3D pandas (**Bao & Mochi**) crafted using Three.js procedural geometries (zero external CDN model failures, instant 60fps load on mobile).
  - Idle breathing, blinking glossy eyes with kawaii catchlights, ear twitches, mouse & touch tracking, waving greetings, and dynamic prop holding (holding a glowing pink heart, steaming coffee mug, or cutting chai glass).
  - Grand romantic success scene: The two pandas scoot together, look into each other's eyes, and hold paws together!
  - Built-in graceful animated SVG fallback for devices without WebGL.
- **Dreamy Pastel Kawaii Aesthetic**:
  - Soft pastel color palette: `#FFF5F7` (canvas), `#F8C8D8` (soft pink), `#EFA2BB` (rose), `#E8E0FF` (lavender), `#FFF9EF` (cream), and `#49343D` (dark text).
  - Rounded glassmorphism cards, soft ambient particle glows, floating 3D flowers, fluffy drifting clouds, and heart sparkles.
- **Cinematic Multi-Step Date Experience**:
  - **Hero Scene**: "Hey, you! ❤️" with "YES! OF COURSE ❤️" & "Maybe... tell me more 🙈" (both completely accessible and sweet).
  - **Step 1 — The Sip**: Interactive 3D Coffee Date ☕ vs Chai Date 🫖.
  - **Step 2 — The Destination**: Bhubaneswar, Odisha options (*Patia, Jaydev Vihar, Saheed Nagar, Nayapalli, KIIT Square, Master Canteen, Somewhere peaceful, You choose for us, Surprise me*).
  - **Step 3 — The Calendar**: Interactive calendar restricting past dates, date countdown, and quick pick buttons (*Tomorrow, This Weekend, Next Week*).
  - **Step 4 — The Time**: 10 time slots categorized by morning sunshine, afternoon glow, and evening starlight.
  - **Step 5 — The Outfit**: Cute illustrated vibes (*Casual and comfy, A little dressed up, Traditional, Surprise me, No dress code*).
  - **Step 6 — Sweet Touches**: Snack chooser (*You choose, I choose, Together*) and optional personal note.
  - **Step 7 — Plan Summary**: Romantic boarding-pass invitation ticket with review & edit capabilities.
  - **Step 8 — Success Celebration**: Pandas holding hands, heart confetti bursts, romantic fanfare, and "IT'S A DATE! ❤️".
- **Private EmailJS Delivery**:
  - Fixed recipient: `bariksuryakant094@gmail.com`.
  - Timestamped in `Asia/Kolkata` (IST) timezone.
  - Secure client-side configuration with test mode fallback.
- **Ambient Romantic Soundtrack**:
  - Built-in Web Audio API romantic lofi chime generator with visible floating mute/play toggle (defaults to muted).
  - Gentle bubble pop clicks and celebratory fanfare.
- **Mobile-First & Accessible**:
  - 100% responsive portrait layout, smooth touch targets, zero horizontal overflow.

---

## 📁 Project Structure

```
├── public/
│   └── _redirects                # SPA fallback configuration for Render
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── ProceduralPanda.js      # Three.js 3D panda character models & joint animators
│   │   │   ├── FloatingDecorations.js  # 3D floating flowers, clouds, and heart particles
│   │   │   ├── PandaScene.jsx          # Three.js canvas setup, lighting, and resizing
│   │   │   └── PandaFallback.jsx       # Beautiful SVG animated fallback for non-WebGL
│   │   ├── common/
│   │   │   ├── AudioPlayer.jsx         # Floating music player toggle (default muted)
│   │   │   ├── BackgroundDecorations.jsx # Floating hearts & twinkling sparkles
│   │   │   ├── CuteButton.jsx          # Tactile kawaii button with sound feedback
│   │   │   └── GlassCard.jsx           # Reusable glassmorphic card container
│   │   ├── steps/
│   │   │   ├── HeroScene.jsx           # Initial question: "Would you go on a date with me?"
│   │   │   ├── DrinkSelection.jsx      # Step 1: Coffee vs Chai
│   │   │   ├── LocationSelection.jsx   # Step 2: Bhubaneswar location picker
│   │   │   ├── DatePicker.jsx          # Step 3: Future date calendar
│   │   │   ├── TimeSelection.jsx       # Step 4: 10 selectable time slots
│   │   │   ├── OutfitSelection.jsx     # Step 5: Outfit vibes
│   │   │   ├── ExtrasSelection.jsx     # Step 6: Snack chooser & sweet note
│   │   │   ├── DateSummary.jsx         # Step 7: Boarding pass review & submit
│   │   │   └── SuccessScene.jsx        # Step 8: Final celebration & pandas holding hands
│   │   └── ProgressBar.jsx             # 01 → 07 step tracker with cute indicator
│   ├── services/
│   │   └── emailService.js             # EmailJS notification handler with Asia/Kolkata time
│   ├── utils/
│   │   ├── confetti.js                 # Romantic heart & pastel confetti triggers
│   │   └── soundEffects.js             # Web Audio API pop, sparkle, chime & lofi synth
│   ├── App.jsx                         # Main app state machine & scene switcher
│   ├── index.css                       # Tailwind CSS & custom glass styling
│   └── main.jsx                        # React entry point
├── .env.example                        # Environment variable templates
├── index.html                          # HTML5 viewport, Google Fonts & metadata
├── package.json                        # Dependencies and scripts
├── tailwind.config.js                  # Custom pastel colors, fonts & animations
└── vite.config.js                      # Vite build configuration
```

---

## 💌 How to Configure EmailJS

To receive her invitation selections directly at `bariksuryakant094@gmail.com`:

1. **Sign Up at [EmailJS](https://www.emailjs.com/)** (Free tier gives 200 emails/month).
2. **Add an Email Service**:
   - Go to **Email Services** -> Click **Add New Service**.
   - Select **Gmail** (connect your Google account) or default service.
   - Note down the **Service ID** (e.g., `service_abc123`).
3. **Create an Email Template**:
   - Go to **Email Templates** -> Click **Create New Template**.
   - Set the **Subject Line**:
     ```
     {{subject}}
     ```
   - In the **To Email** field, set:
     ```
     bariksuryakant094@gmail.com
     ```
   - In the **Template Content**, paste:
     ```html
     <h3>Someone just planned a little date with you! ❤️</h3>

     <p><strong>Response:</strong> {{hero_response}}</p>
     <p><strong>Warm Drink:</strong> {{drink}}</p>
     <p><strong>Location:</strong> {{location}}</p>
     <p><strong>Date:</strong> {{date}}</p>
     <p><strong>Time:</strong> {{time}}</p>
     <p><strong>Outfit Vibe:</strong> {{outfit}}</p>
     <p><strong>Snack Chooser:</strong> {{snacks}}</p>
     <p><strong>Her Sweet Note:</strong> {{personal_message}}</p>

     <hr/>
     <p><small>Submitted at: {{submission_timestamp}}</small></p>
     ```
   - Click **Save** and note down the **Template ID** (e.g., `template_xyz789`).
4. **Get Your Public Key**:
   - Go to **Account Settings** (bottom-left) -> **General**.
   - Copy your **Public Key** (e.g., `user_or_pub_key_123`).
5. **Add to `.env`**:
   - Create a file named `.env` in the root folder:
     ```env
     VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
     VITE_EMAILJS_SERVICE_ID=your_service_id_here
     VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
     ```

*(Note: If you run without `.env` keys, the app will gracefully show a "Simulate & See Success Scene" button so you can test all animations without errors).*

---

## 💻 How to Run Locally

1. **Clone or navigate to the directory**:
   ```bash
   cd c:\VS_CODE\static_website
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Open in browser**:
   - Visit `http://localhost:3000` (or the port displayed in your terminal).

---

## 🚀 How to Deploy on Render (Static Site)

1. **Push your code to GitHub / GitLab**.
2. **Log into [Render](https://render.com/)**.
3. **Click "New +" -> "Static Site"**.
4. **Connect your repository**.
5. **Configure the build settings**:
   - **Name**: `a-little-date-with-you` (or any custom name)
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
6. **Add Environment Variables in Render**:
   - Under the **Environment Variables** section, add:
     - `VITE_EMAILJS_PUBLIC_KEY` = *your public key*
     - `VITE_EMAILJS_SERVICE_ID` = *your service ID*
     - `VITE_EMAILJS_TEMPLATE_ID` = *your template ID*
7. **Click "Create Static Site"**.
   - Render will build and deploy your site with a free SSL HTTPS link (e.g., `https://a-little-date-with-you.onrender.com`).
   - The included `public/_redirects` file ensures all sub-routes handle SPA redirects cleanly.

---

## 🧪 How to Test Email Notifications

1. Open the website on your desktop or phone.
2. Click **"YES! OF COURSE ❤️"**.
3. Select a drink (e.g., **Chai Date**).
4. Select a location in Bhubaneswar (e.g., **Patia**).
5. Pick a future date from the calendar.
6. Choose a time slot (e.g., **5:00 PM**).
7. Pick an outfit (e.g., **A little dressed up**).
8. Choose snacks (e.g., **Together**) and write a cute personal note.
9. On the final **Date Plan Summary** card, click **"Looks perfect! Send it ❤️"**.
10. Check your inbox at `bariksuryakant094@gmail.com` to see the complete invitation details with timestamp in IST!

---

## 📋 Final Deployment Checklist

- [x] Responsive layout verified on mobile screens (iPhone, Android) and desktop.
- [x] Procedural Three.js 3D pandas with breathing, blinking, head tracking, and dynamic prop switching.
- [x] WebGL capability check and animated SVG fallback verified.
- [x] Fixed recipient set to `bariksuryakant094@gmail.com`.
- [x] Future-only date picker with real-time countdown preview.
- [x] Background music toggle defaults to muted with Web Audio API synthesizer.
- [x] Sound effects on clicks, selections, and success fanfare.
- [x] Production build tested and confirmed with `dist/_redirects`.
- [x] `.env.example` created with required EmailJS variables.

