✅ Interactive Question Management Sheet

Live Demo: https://question-management-sheet-ohtj.vercel.app/

🚀 Overview

The Interactive Question Management Sheet is a modern, drag-and-drop enabled web application that allows users to organize, track, and manage coding questions in a structured, hierarchical format — just like a real interview preparation sheet.

It is inspired by structured sheets like Striver’s SDE Sheet, but enhances usability by making the experience interactive, editable, and dynamic.

This project was built as part of a design problem statement that required:

A clean, intuitive UI

Full CRUD functionality (Create, Read, Update, Delete)

Drag-and-drop reordering

Nested structure (Topics → Subtopics → Questions)

State consistency across interactions

✨ Key Features
📌 1. Hierarchical Structure

The sheet follows a three-level hierarchy:

Topics (e.g., Arrays, Binary Search)

Subtopics (e.g., Sliding Window, Two Pointers)

Questions (individual problems)

Users can:

Add new Topics

Add Subtopics inside Topics

Add Questions inside Subtopics

🖱️ 2. Drag & Drop Reordering

Using @hello-pangea/dnd, users can reorder:

Topics

Subtopics within a Topic

Questions within a Subtopic

The UI updates instantly and preserves structure.

✅ 3. Progress Tracking

Each question has a checkbox. When checked:

It updates:

Subtopic completion count

Topic completion count

Overall sheet progress in the circular badge

This gives real-time feedback on how much of the sheet is completed.

✏️ 4. Inline Editing (Edit Mode)

Users can edit:

Topic names

Subtopic names

Question text

Editing supports:

Click-to-edit

Save on blur

Save on pressing Enter

🗑️ 5. Delete Functionality

Users can delete:

Entire Topics

Individual Subtopics

Individual Questions

Progress is recalculated automatically after deletion.

🔗 6. Optional Problem Links

Each question can optionally have a link (LeetCode, GFG, Codeforces, etc.).

If a link exists:

The question text becomes clickable

Clicking opens the problem in a new tab

If no link is provided, it behaves like normal text.


🛠️ Tech Stack
Frontend:

React (Vite / Create React App)

Tailwind CSS

@hello-pangea/dnd (Drag & Drop)

📂 Project Structure
src/
│
├── App.js
├── components/
│   ├── Header/
│   │   └── Header.jsx
│   │
│   ├── Topics/
│   │   ├── hooks/
│   │   │   └── useTopics.js
│   │   │
│   │   ├── TopicCard/
│   │   │   └── TopicCard.jsx
│   │   │
│   │   ├── SubTopicCard/
│   │   │   └── SubTopicCard.jsx
│   │   │
│   │   ├── QuestionRow/
│   │   │   └── QuestionRow.jsx
│   │   │
│   │   └── TopicsSection.jsx

🔧 Setup & Installation
1️⃣ Clone the repository
git clone https://github.com/Dishank_Jha/question-management-sheet.git
cd question-management-sheet

2️⃣ Install dependencies
npm install

3️⃣ Start the development server
npm run dev


App will be available at:

http://localhost:3000

🌍 Deployment

The project is deployed on Vercel:

🔗 https://question-management-sheet-ohtj.vercel.app/

To deploy your own version:

npm install -g vercel
vercel


Follow the prompts.

🎯 Future Improvements (Optional)

If you later decide to extend this project:

Add User Authentication

Store progress in a database (MongoDB + Node.js)

Sync progress across devices

Add analytics for problem completion trends

👨‍💻 Author

Dishank Jha

Passionate about DSA, Web Development, and building intuitive tools for developers.

Actively preparing for SDE internships and competitive programming.
