# Note App

A simple note-taking application that allows users to create, update, delete, and organize their notes effectively. This application supports drag-and-drop functionality for reordering notes, deadline management, and a responsive design.


## Features

- **Create Notes**: Users can create new notes with content, deadlines, and optional deadline times.

- **Read Notes**: Fetch and display all notes in a user-friendly interface.

- **Update Notes**: Edit existing notes to modify their content, deadlines, or times.

- **Delete Notes**: Remove notes that are no longer needed.

- **Reorder Notes**: Drag and drop notes to reorder them as desired. The order is persisted across page reloads.

- **Deadline Management**: Set deadlines for notes and visually indicate overdue notes.

- **Toast Notifications**: Receive feedback on actions such as creating, updating, or deleting notes.

- **Loading Skeletons**: While notes are being fetched, loading skeletons provide a better user experience.

## Technologies Used

- **Frontend**: React, Redux, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeORM, SQLite
- **Other Libraries**: React DnD (for drag-and-drop functionality), Moment.js (for date formatting), zaman.js (for datepicker and timepicker)

## Usage


- **Editing a Note**: Click on a note to edit its content or deadline.
- **Deleting a Note**: Click the delete button on a note to remove it from your list.
- **Reordering Notes**: Click and drag a note to reorder it. The new order will be saved automatically.
- **Deadline Indicators**: Notes with deadlines will visually indicate if they are overdue. If a user does not select a deadline, the application will automatically set the deadline to the current date.

## Deadline Management

The note-taking application includes a deadline feature that allows users to set a deadline for each note. Here’s how it works:

- **Setting a Deadline**: When creating or editing a note, users can select a specific date and time as the deadline.
- **Default Behavior**: If a user does not choose a deadline, the application automatically sets the deadline to the current date. This ensures that every note has a deadline, making it easier to manage tasks and reminders.
- **Visual Indicators**: Notes that are past their deadline will be visually highlighted, allowing users to quickly identify overdue tasks.

## Toast Notifications

The application provides toast notifications to enhance user experience by giving instant feedback on actions performed. Here’s what you can expect:

- **Success Notifications**: When a note is successfully created, updated, or deleted, a toast notification will appear to inform the user of the successful action.
- **Error Notifications**: If there is an issue with creating, updating, or deleting a note (such as a network error), the user will receive an error toast notification.
