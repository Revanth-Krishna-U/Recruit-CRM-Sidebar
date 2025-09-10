# Recruit-CRM-Sidebar


A responsive and interactive sidebar component built with **HTML, CSS, and JavaScript**.  
It features expandable panels, dark/light theme toggle, and dynamic menu sections.

---

## 🚀 Features
- Modern **HTML & CSS** design with responsive layout  
- **Sidebar navigation** with icons and tooltips  
- **Expandable right panel** with dynamic menus and child items  
- **Dark / Light mode toggle** (saved with localStorage)  
- **Persistent state** for expanded/collapsed panel  
- Clean, minimal UI inspired by professional dashboards  

---

## 📂 Project Structure

├── index.html # Main HTML file

├── style.css # Styles (CSS with variables, transitions, responsive design)

├── script.js # JavaScript (menu rendering, theme, localStorage)

├── logo.png # Sidebar logo

└── README.md # Documentation


🧩 Approach

UI Structure:

Designed the layout using HTML semantic structure.

Created a left sidebar with icons for Dashboard, Checklist, Settings, Theme Toggle, and Profile.

Implemented a right expandable panel to display different menu items.

Styling & Responsiveness:

Used CSS variables for theme colors and transitions.

Added dark/light mode themes for better user experience.

Ensured responsive design with media queries for mobile view.

Functionality:

Built dynamic menus in JavaScript, with support for nested child items.

Implemented expand/collapse functionality for the right panel and child menus.

Used localStorage to remember user preferences (theme & panel state).

⚡ Challenges Faced

Dynamic Menu Rendering:
Initially, managing nested menus with expand/collapse was tricky. Solved it by programmatically generating child lists and toggling them with event listeners.

State Persistence:
Needed to ensure theme (dark/light) and panel expansion stayed consistent after refresh. Used localStorage to store user preferences and applied them on load.

Responsiveness:
Sidebar and panel widths broke on smaller screens. Fixed using flexbox layout and media queries for smoother adaptability.
