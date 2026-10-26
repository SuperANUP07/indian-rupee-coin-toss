# ₹ Rupee Coin Toss - Interactive Simulator

A modern, polished web application that simulates tossing an authentic-looking Indian Rupee coin with realistic 3D animations, comprehensive statistics tracking, and a beautiful premium UI.

![Rupee Coin Toss](https://img.shields.io/badge/Version-1.0.0-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## 🎲 Features

### Core Functionality
- **Realistic 3D Coin Animation**: Smooth spinning and landing animations using CSS 3D transforms
- **Genuine Randomization**: True random number generation for heads/tails results
- **Multiple Denominations**: Select from ₹1, ₹2, ₹5, ₹10, or ₹20 coins
- **Batch Tossing**: "Toss 10×" feature for rapid consecutive tosses
- **Sound Effects**: Optional Web Audio API sound effects (woosh on toss, thud on landing)

### Statistics & Tracking
- **Live Statistics Dashboard** displaying:
  - Total tosses
  - Heads count & percentage
  - Tails count & percentage
  - Current streak
  - Longest streak
  - Visual chart of results ratio

- **Result History**: Last 10 tosses displayed with visual indicators
- **Persistent Storage**: All statistics saved to localStorage
- **Reset Functionality**: Clear all data with one click

### Design & UX
- **Modern Premium UI**: Dark gradient background with glassmorphism effects
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Smooth Micro-interactions**: Subtle animations and transitions
- **Metallic 3D Coin**: Realistic gold/silver appearance with lighting and depth
- **Accessibility**: Full keyboard navigation, ARIA labels, screen reader support
- **Reduced Motion Support**: Respects `prefers-reduced-motion` preference

### Animation
- Coin spins rapidly during toss (5 full rotations)
- Natural deceleration before landing
- Flat landing with smooth transition
- Shadow animation for depth perception
- Smooth opacity transitions for results

## 📁 Project Structure

```
rupee-coin-toss/
├── index.html          # Main HTML structure
├── style.css           # Complete styling and animations
├── script.js           # Application logic and interactions
└── README.md           # This file
```

## 🚀 Quick Start

### Option 1: Direct File Opening
Simply open `index.html` in any modern web browser:
```bash
# On macOS
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

### Option 2: Local Server (Recommended)
For the best experience with sound effects, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📋 Usage Guide

### Basic Toss
1. Click the **Toss Coin** button or press **Space**
2. Watch the coin spin and land
3. See the result with denomination and message
4. Statistics update automatically

### Select Denomination
- Click any of the ₹1, ₹2, ₹5, ₹10, or ₹20 buttons
- Selected coin appears on the button and displays on the coin

### Batch Tossing
- Click **Toss 10×** for rapid consecutive tosses
- Watch all 10 results with slight delays between tosses
- Statistics update with each toss

### Sound Control
- Click the 🔔 icon in the header to toggle sound
- Visual feedback shows if sound is enabled/disabled
- Sound plays automatically when tosses are performed

### View Statistics
- **Chart**: Visual ratio of heads vs tails
- **Stats Cards**: Detailed numeric information
- **History**: Last 10 results as labeled circles

### Reset Statistics
- Click the **Reset** button in the statistics section
- Confirm the action in the dialog
- All statistics reset to zero

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Perform single toss |
| `Tab` | Navigate between buttons |
| `Enter`/`Space` | Activate focused button |

## 🎨 Design Details

### Coin Faces

**Heads (Front)**
- ₹ Symbol prominently displayed
- Denomination number (1, 2, 5, 10, or 20)
- "INDIA" text at bottom
- Gold/yellow metallic gradient
- Realistic lighting and shadows

**Tails (Back)**
- Emblem symbol (◉)
- Ashoka Chakra symbol (⚙)
- "BHARAT" text
- Silver metallic gradient
- India-inspired design elements

### Color Palette
- **Primary Accent**: Gold (#d4af37)
- **Secondary Accent**: Silver (#c0c0c0)
- **Heads Color**: Golden (#ffd700)
- **Tails Color**: Sky Blue (#87ceeb)
- **Background**: Dark gradient (#0f1419 → #1a1f2e)
- **Text**: White (#ffffff) and light gray (#e8eef5)

### Animation Timings
- **Coin Spin**: 1 second (batch: 0.8s)
- **Landing**: 0.4 seconds
- **Result Display**: 0.25 seconds
- **Chart Updates**: 0.35 seconds (smooth ease)
- **Transitions**: 150-250ms (various)

## 📱 Mobile-First Layout

The app is optimized for mobile users with **Primary Focus** on the coin toss experience:

### Mobile View (< 480px)
**Above-the-fold Priority:**
1. **Coin** - Centered, 180px size for perfect thumb reach
2. **Result Display** - Shows immediate feedback
3. **TOSS COIN Button** - **Large, prominent button positioned directly below coin** with ~1.5cm spacing for easy single-handed operation
4. **Control Panel** - Denomination selector + additional features
5. **Statistics** - Hidden by default, toggle with "Stats 📊" button

**Key Mobile Features:**
- All touch targets 44px+ (WCAG compliant)
- Thumb-friendly button placement
- Compact denominations (2 columns on mobile)
- Statistics collapsible to save screen space
- Full-width responsive layout
- Optimized font sizes for readability on small screens

### Tablet View (480px - 768px)
- Coin: 200px
- Statistics visible in 2-column grid
- Enhanced spacing for larger screens
- All controls easily accessible

### Desktop View (> 768px)
- Coin: 280px (full experience)
- All statistics always visible
- Premium dashboard layout
- Full feature set displayed

## 🛠️ Technical Implementation

### HTML
- Semantic structure with proper ARIA labels
- Accessible form controls
- Live regions for dynamic content
- Screen reader friendly markup

### CSS
- CSS 3D Transforms for coin rotation
- CSS Grid and Flexbox for responsive layout
- CSS Variables for consistent theming
- Keyframe animations for coin physics
- Gradient overlays for metallic effects
- Glassmorphism effects with backdrop filters

### JavaScript
- Pure vanilla JavaScript (no dependencies)
- Object-oriented design with `CoinTossApp` class
- Event delegation for efficient handling
- localStorage for persistent statistics
- Web Audio API for sound effects
- Proper async/await for animation sequences

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Statistics Explained

### Current Streak
Shows the current consecutive results of the same type (e.g., "3 Heads in a row")

### Longest Streak
Records the longest consecutive streak throughout the session

### Percentage Calculation
Calculated as: `(Count / Total Tosses) × 100`, rounded to nearest integer

### Chart Visualization
- Heights of bars represent percentage
- Smooth animation when statistics update
- Color-coded: Gold for heads, blue for tails

## 🔊 Sound Effects

The app uses Web Audio API to generate synthetic sound effects:

**Toss Sound**: Descending pitch woosh (400Hz → 200Hz, 300ms duration)
**Landing Sound**: Quick thud click (800Hz → 400Hz, 150ms duration)

Sound generation respects:
- Browser autoplay restrictions
- User sound toggle preference
- No external audio files required

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmark regions
- **ARIA Labels**: `aria-label`, `aria-live`, `aria-atomic` attributes
- **Keyboard Navigation**: Full control via Tab, Space, and Enter
- **Focus Indicators**: Clear visual focus states on interactive elements
- **Screen Reader Support**: Descriptive button labels and live regions
- **Motion Preferences**: Respects `prefers-reduced-motion` media query
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Touch Targets**: 44px minimum touch target size on mobile

## 💾 Data Persistence

Statistics are automatically saved to browser's `localStorage`:
- Key: `coinTossStats`
- Format: JSON
- Auto-saves after each toss
- Loads automatically on page load
- Survives browser closes (same device/browser)

**Note**: Clearing browser data or using private/incognito mode will reset statistics.

## 🎯 Performance Optimizations

- CSS transforms for GPU acceleration
- Minimal DOM manipulation
- Efficient event delegation
- Debounced statistics updates
- Optimized animation frame rates
- Small JavaScript bundle (~15KB uncompressed)
- No external dependencies
- Fast load time (<100ms)

## 🐛 Troubleshooting

### Sound Not Working?
1. Check browser sound permissions
2. Click the sound toggle to enable
3. Check browser console for errors
4. Try on a different browser
5. Some browsers restrict autoplay audio

### Animations Laggy?
1. Check browser hardware acceleration settings
2. Close other resource-heavy applications
3. Try in a different browser
4. Reduce browser zoom level
5. Check for browser extensions that might interfere

### Statistics Not Saving?
1. Check if localStorage is enabled
2. Verify browser isn't in private/incognito mode
3. Check browser storage quota
4. Clear browser cache and try again
5. Check browser privacy settings

### Mobile Issues?
1. Ensure viewport meta tag is correct (it is)
2. Try in full-screen for better experience
3. Check touch target visibility
4. Verify browser supports CSS 3D transforms
5. Test on device, not just mobile emulation

## 📝 License

MIT License - Feel free to use, modify, and distribute this project.

## 🤝 Contributing

Suggestions and improvements welcome! Consider:
- Additional coin denominations
- Different currency implementations
- Betting/gaming features
- Multiplayer statistics sharing
- More sophisticated streak tracking
- Additional sound effect variations

## 📧 Support

For issues or questions:
1. Check the Troubleshooting section
2. Verify browser compatibility
3. Test with browser dev tools open
4. Clear cache and reload
5. Try on a different device/browser

## 🎓 Learning Resources

This project demonstrates:
- CSS 3D Transforms and Perspective
- Web Audio API for sound synthesis
- localStorage API for data persistence
- Responsive web design techniques
- Accessible web development practices
- Vanilla JavaScript OOP patterns
- Animation and timing functions
- Event handling and delegation

## 🏆 Features Roadmap

Potential future enhancements:
- [ ] Multiple game modes (prediction game, lucky numbers)
- [ ] Leaderboard with high scores
- [ ] Coin flip animation customization
- [ ] Theme selector (light/dark/auto)
- [ ] Export statistics as JSON/CSV
- [ ] Multiplayer mode (WebSocket)
- [ ] Cryptocurrency coin tosses
- [ ] Custom denomination inputs
- [ ] Advanced statistics analysis
- [ ] PWA (Progressive Web App) support

---

**Enjoy flipping! May the odds be ever in your favor! 🪙✨**

*Last Updated: 2026 | Version 1.0.0*
