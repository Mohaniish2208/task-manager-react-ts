# Lexora Task Manager

A responsive task-management application built with React, TypeScript, Firebase Authentication, and Vite.

Users can register, sign in securely, manage a private task list, reset their password, and preserve their tasks after refreshing the browser.

## Live Demo

[View the Task Manager on Vercel](https://task-manager-react-ts.vercel.app/)

## Screenshots

### Sign In Page

Email/password and Google authentication options.

![Sign In Page](src/Screenshots/Sign-In-Page.png)

### Sign Up Page

Registration form with profile information, validation, and Google signup.

![Sign Up Page](src/Screenshots/Sign-Up-Page.png)

### Google Account Selection

Firebase Google authentication allows users to select an account.

![Google Account Selection](src/Screenshots/Google-Account-Selection.png)

### Tasks After Sign In

Each authenticated user receives a UID-specific task list.

![Tasks After Sign In](src/Screenshots/Tasks-After-Sign-In.png)

### Task Manager Main Page

![Task Manager Main Page](src/Screenshots/Task-Manager-Main.png)

### Completed Task

![Completed Task](src/Screenshots/Checkbox-clicked.png)

## Features

### Authentication

- Register with an email and password
- Sign in with an email and password
- Sign up or sign in with Google
- Select a Google account during authentication
- Restore Firebase authentication sessions after refreshing
- Display a loading state while Firebase restores the session
- Protect the Tasks page from unauthenticated access
- Log out securely with Firebase
- Request password-reset emails
- Display authentication loading, success, and error feedback
- Store passwords securely through Firebase instead of `localStorage`

### Task Management

- Add tasks with the **Add** button
- Add tasks by pressing `Enter`
- Edit task text
- Save edits by pressing `Enter` or clicking **Save**
- Delete individual tasks
- Mark tasks as complete
- Clear all completed tasks
- Assign High, Medium, or Low priority
- Assign Personal, Work, or School categories
- Display completed and total task counts
- Preserve tasks after refreshing
- Separate each user's tasks using their Firebase UID

### Validation and Accessibility

- Controlled registration and sign-in inputs
- Numeric phone-number input with ten-digit validation
- Password confirmation validation
- Accessible inline validation messages
- `aria-invalid` and `aria-describedby` relationships
- Accessible status and error feedback
- Loading states that disable buttons during Firebase requests

## Tech Stack

- React 19
- TypeScript
- Vite 8
- React Router
- Firebase Authentication
- Vitest
- React Testing Library
- `jest-dom`
- `user-event`
- `jsdom`
- Plain CSS
- ESLint
- Capacitor for Android support
- Vercel for deployment

## Application Routes

| Route | Purpose |
| --- | --- |
| `#/` | Sign-in page |
| `#/signup` | Registration page |
| `#/forgotpassword` | Password-reset page |
| `#/tasks` | Protected task-management page |

The application uses `HashRouter`, so each route appears after the `#` in the browser URL.

## Project Structure

```text
task-manager-react-ts/
  public/
    background.svg
    lexora-browser-icon.svg
    lexora-logo.svg
    Mindfulness Flower.svg
    notepad.svg

  src/
    Pages/
      ForgotPasswordPage.test.tsx
      ForgotPasswordPage.tsx
      SignInPage.tsx
      SignUpPage.tsx

    Screenshots/
      Checkbox-clicked.png
      Google-Account-Selection.png
      Sign-In-Page.png
      Sign-Up-Page.png
      Task-Manager-Main.png
      Tasks-After-Sign-In.png

    images/
      delete.png
      pen.png

    styles/
      App.css
      SignInPage.css
      SignUpPage.css
      variables.css

    test/
      setup.ts

    types/
      localStorage.ts
      task.ts

    App.tsx
    firebase.ts
    main.tsx

  package.json
  tsconfig.app.json
  tsconfig.node.json
  vite.config.ts
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Mohaniish2208/task-manager-react-ts.git
cd task-manager-react-ts
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a Firebase project

1. Open the Firebase Console.
2. Create or select a Firebase project.
3. Add a Web application.
4. Open **Authentication**.
5. Enable the **Email/Password** provider.
6. Enable the **Google** provider.

### 4. Configure environment variables

Create a `.env.local` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Copy the corresponding values from the Firebase Web application configuration.

Do not commit real environment values to a public repository.

### 5. Start the development server

```bash
npm run dev
```

Open the local address shown in the terminal.

## Available Scripts

### Start the development server

```bash
npm run dev
```

### Build the production application

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run ESLint

```bash
npm run lint
```

### Run tests once

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Synchronize the web build with Android

```bash
npm run android:sync
```

### Open the Android project

```bash
npm run android:open
```

### Build the Android release bundle

```bash
npm run android:bundle
```

## Authentication Flow

1. Firebase restores the existing session through `onAuthStateChanged`.
2. The application displays a loading state while Firebase checks the session.
3. Authenticated users can access `#/tasks`.
4. Unauthenticated users who open `#/tasks` are redirected to sign in.
5. Logging out updates the Firebase authentication state and returns the user to the sign-in page.
6. Email/password users can request a reset link from `#/forgotpassword`.

## Data Persistence

Task and profile information is stored in browser `localStorage`.

### Task Storage

Tasks are stored with a Firebase UID-specific key:

```text
tasks-${user.uid}
```

This prevents one signed-in account from seeing another account's task list through the application.

### Profile Storage

Profile information collected during email/password registration is stored with:

```text
profile-${user.uid}
```

Passwords are not stored in `localStorage`. Firebase Authentication handles password storage and verification.

## Testing

The project uses Vitest and React Testing Library with a `jsdom` environment.

The current tests verify that the password-reset page:

1. Renders its heading, email input, submit button, and navigation link.
2. Allows the user to enter an email address.
3. Calls the mocked Firebase password-reset function and displays success feedback.

Run the tests with:

```bash
npm test
```

Current result:

```text
Test Files  1 passed
Tests       3 passed
```

## Deployment

The application is deployed through Vercel.

The following environment variables must also be added under the Vercel project's **Settings > Environment Variables**:

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

After adding or changing an environment variable, redeploy the project.

## Current Limitations

- Tasks and profiles are stored only in the current browser.
- Data does not synchronize between devices.
- `localStorage` can be inspected through browser developer tools.
- UID-based keys separate accounts in the interface but do not provide encrypted cloud storage.
- Firestore has not been connected.
- Automated tests currently cover the password-reset page only.

## Links

- [Live Vercel Deployment](https://task-manager-react-ts.vercel.app/)
- [GitHub Repository](https://github.com/Mohaniish2208/task-manager-react-ts)
- [StackBlitz](https://stackblitz.com/~/github.com/Mohaniish2208/task-manager-react-ts)
