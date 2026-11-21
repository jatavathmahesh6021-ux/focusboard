FocusBoard - Task Management Dashboard


Project Overview

FocusBoard is a responsive task management dashboard built with React.js and Vite. It allows users to create, edit, delete, search, and filter tasks while tracking live completion statistics and reading productivity tips through a three-slide Focus Notes carousel. All task data is persisted in the browser using localStorage.

Technology Stack
- HTML5
- CSS3 (Responsive Grid and Flexbox)
- JavaScript (ES6+)
- React.js with Hooks
- Vite
- Lucide React (Icons)
- Browser localStorage

Key Features Implemented
- Full CRUD operations (Create, Read, Update, Delete with confirmation dialog)
- 6 pre-loaded sample tasks for first-time users
- Dynamic dashboard statistics (Total Tasks, In Progress, Completed, Completion Rate)
- Three-slide Focus Notes carousel with Previous, Next, and dot indicators
- Case-insensitive title search
- Combined Status tabs (All, To do, In progress, Completed) and Priority filter (High, Medium, Low)
- Automatic browser persistence using localStorage
- Responsive layout tested at 1440px (Desktop), 768px (Tablet), and 390px (Mobile)
- Accessible semantic HTML, form labels, and keyboard focus states

Project Folder Structure

focusboard/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── StatCard.jsx
│   │   ├── FocusNotes.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   ├── SearchBar.jsx
│   │   └── FilterTabs.jsx
│   ├── data/
│   │   └── sampleTasks.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── screenshots/
├── README.md
├── AI_USAGE.md
├── package.json
└── .gitignore

Installation and Local Setup

1. Clone the repository:
   git clone https://github.com/jatavathmahesh6021-ux/focusboard
2. Go into the project folder:
   cd focusboard
3. Install dependencies:
   npm install
4. Start the development server:
   npm run dev

State Management Explanation
This project uses React built-in hooks (useState and useEffect) along with a custom useLocalStorage hook.
- Task Data: Stored in App.jsx and passed down to child components via props.
- CRUD Updates: Creating, editing, deleting, or changing a task status updates the main tasks array in App.jsx.
- Derived Statistics and Filters: Total tasks, in-progress count, completed count, completion percentage, and the filtered task list are calculated directly from the tasks state on every render so they are never out of sync.
- Carousel State: Managed locally inside FocusNotes.jsx using useState to track the active slide index.

localStorage Persistence
The custom hook useLocalStorage.js reads the key "focusboard_tasks" when the app loads. If saved data exists, it parses and restores it. If no saved data exists, it loads the 6 default tasks from sampleTasks.js. Whenever tasks change, a useEffect hook converts the array to JSON and saves it back to localStorage.

Links

- Live Application URL: https://focusboard-rust.vercel.app/
- GitHub Repository URL: https://github.com/jatavathmahesh6021-ux/focusboard

Known Limitations
- Data is stored locally in the browser and does not sync across different devices.
- No backend database or user login is included, as per the assignment scope.