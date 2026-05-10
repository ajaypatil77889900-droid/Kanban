Drag & Drop
Use @hello-pangea/dnd
Works on:
Desktop (mouse)
Mobile & tablet (touch)

Supports:
✅ Reorder tasks within same column
✅ Move tasks between columns

Initial Data from API
On app load:
Fetch tasks from a public API
Store them in Redux Toolkit

Loading state
Error state

 Add Task via Modal

Each column:

Is droppable
Supports reordering inside itself
Updates Redux state correctly

 
State Management
Redux Toolkit + TypeScript
Single source of truth
Clean reducers:

 Persistence
Redux state saved to localStorage
On refresh:

* Responsive UI *
Desktop → full Kanban board
Mobile → stacked columns (scrollable)
Touch drag works correctly
Clean CSS (no libraries)
