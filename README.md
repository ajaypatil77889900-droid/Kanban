FINAL CONFIRMED REQUIREMENTS (NO CONFUSION)
1️⃣ Drag & Drop
Use @hello-pangea/dnd
Works on:
Desktop (mouse)
Mobile & tablet (touch)
Supports:
✅ Reorder tasks within same column
✅ Move tasks between columns
2️⃣ Initial Data from API
On app load:
Fetch tasks from a public API
Store them in Redux Toolkit
Show:
Loading state
Error state
API data will be mapped into your task structure (id, title, description, priority, status)
3️⃣ Add Task via Modal
“Add Task” button at top
On click → Modal opens
Modal fields:
Task Name
Description
Priority (Low / Medium / High)
Status (Backlog / In Progress / Review / Done)
On submit:
Task added to Redux
Appears in correct column based on status
4️⃣ Task Card UI

Each task card will show:

✅ Task name
✅ Description
✅ Priority badge
✅ Action buttons:
Done → moves task to Done column
After moving → Done button disappears
Delete → removes task completely
5️⃣ Columns (Kanban)
Backlog
In Progress
Review
Done

Each column:

Is droppable
Supports reordering inside itself
Updates Redux state correctly
6️⃣ State Management
Redux Toolkit + TypeScript
Single source of truth
Clean reducers:
addTask
deleteTask
markDone
onDragEnd handler
7️⃣ Persistence
Redux state saved to localStorage
On refresh:
App restores last state
API fetch only if no stored state exists
8️⃣ Responsive UI
Desktop → full Kanban board
Mobile → stacked columns (scrollable)
Touch drag works correctly
Clean CSS (no libraries)
🔥 NEXT STEP (IMPORTANT)

The next message I send will include:

✅ EVERY FILE
✅ TypeScript only
✅ Vite + React + Redux Toolkit
✅ @hello-pangea/dnd
✅ Responsive CSS
✅ Modal implementation
✅ API integration

⚠️ It will be a long response, because you asked not to miss a single file. this requirement is right but dont change folder structure not out existing folder structure is like src 
 - components 
    - AddTask
    - Column
    - Taskcard
 - pages
   -Board
 - services
   -api.ts
- store
  -slices
   -tasksSlice.ts
  store.ts
-styles
 -board.css
 -modal
 -task

App.tsx