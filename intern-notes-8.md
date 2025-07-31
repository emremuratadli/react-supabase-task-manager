# React, Form Management, Authentication, and Session Control with Supabase

## 1. What is the main difference between Controlled and Uncontrolled Components?

**Controlled Component:** Form data is managed by React state. The state updates on every change.

```jsx
const [value, setValue] = useState("");
<input value={value} onChange={(e) => setValue(e.target.value)} />;
```

**Uncontrolled Component:** Form data is accessed directly from the DOM. React state is not used.

```jsx
const inputRef = useRef();
<input ref={inputRef} />
<button onClick={() => alert(inputRef.current.value)}>Show</button>
```

---

## 2. What is form validation? How is basic validation done?

Form validation checks if the data received from the user meets certain rules.

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  if (!email.includes("@")) {
    alert("Please enter a valid email.");
  }
};
```

---

## 3. What are the HTML5 built-in validation features?

- You can use attributes like `required`, `minLength`, `maxLength`, `pattern`, `type="email"` for automatic browser validation.

```jsx
<input type="email" required minLength={5} />
```

---

## 4. How is form management done in React? What are the roles of onBlur, onChange, and onSubmit events?

- **onChange:** Updates state on every change.
- **onBlur:** Triggered when the field loses focus, often used for field validation.
- **onSubmit:** Runs when the form is submitted.

```jsx
<form onSubmit={handleSubmit}>
  <input onChange={handleChange} onBlur={handleBlur} />
</form>
```

---

## 5. What are popular libraries like react-hook-form, formik, and yup used for?

- **react-hook-form:** Provides performant and easy form management.
- **formik:** Popular for managing form state and validation.
- **yup:** Schema-based validation, often used with formik.

```jsx
import { useForm } from "react-hook-form";
const { register, handleSubmit, errors } = useForm();
<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register("email", { required: true })} />
</form>;
```

---

## 6. How are errors shown in form validation and how is successful submission feedback given to the user?

```jsx
{
  error && <span style={{ color: "red" }}>{error}</span>;
}
{
  success && <span style={{ color: "green" }}>Success!</span>;
}
```

---

## 7. What are the basics of login/logout/session concepts?

- **Login:** User logs into the system.
- **Logout:** Ends the session.
- **Session:** Stores user session information.

---

## 8. What are the differences between localStorage, sessionStorage, and httpOnly cookies?

- **localStorage:** Persistent, stores data in the browser.
- **sessionStorage:** Cleared when the tab is closed.
- **httpOnly Cookie:** Not accessible via JavaScript, used for security.

---

## 9. What is a Protected Route? How to redirect unauthenticated users with React Router?

A Protected Route is a page that only authenticated users can access. If the user is not logged in, they are automatically redirected to the login page. In React Router, this is done by checking the user's session.

```jsx
<Route
  path="/dashboard"
  element={user ? <Dashboard /> : <Navigate to="/login" />}
/>
```

---

## 10. How is a global auth state managed and shared with components?

A global auth state is a centralized and accessible way to keep the user's session (login) information available to all components. This is usually done with Context API or a state management library (Redux, Zustand, etc.).

### How to manage?

1. **With Context API:**
   - Create an `AuthContext` and provide user info (e.g., user, isAuthenticated) to the whole app with a Provider.
2. **With State Management Libraries:**
   - Use Redux, Zustand, etc. to keep auth state globally.

### How to share with components?

Child components access auth info via Context or state management library. With Context API, use `useContext(AuthContext)` to get user info.

#### Example (with Context API):

```jsx
// AuthContext.js
import { createContext, useContext, useState } from "react";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Usage in any component:
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);
  return <div>User: {user?.email}</div>;
}
```

---

## 11. What is Supabase? What features does it provide? How is it different from alternatives like Firebase?

- It is an open-source backend platform.
- Provides real-time database, authentication, storage, REST and GraphQL API.
- Based on Postgres.
- **Differences from Firebase:**
  - Supabase is fully open-source, Firebase is closed-source.
  - Supabase uses a Postgres database and supports SQL; Firebase uses NoSQL (Firestore, Realtime Database).
  - You can run direct SQL queries and advanced relational data modeling in Supabase.
  - Supabase supports Row Level Security (RLS) for row-based security.
  - Supabase can be self-hosted, Firebase is only hosted on Google infrastructure.

---

## 12. What does the Supabase Auth service do? How to register (signUp), login (signInWithPassword), logout (signOut), and check session (getSession, onAuthStateChange) with email and password?

Supabase Auth service allows you to easily handle user authentication (register, login, logout, session check) in your app. It provides ready-to-use functions for creating users, logging in, logging out, and checking the current session. You can also listen to session changes to manage app flow based on user state.

```js
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("url", "anonKey");

// Register
await supabase.auth.signUp({ email, password });
// Login
await supabase.auth.signInWithPassword({ email, password });
// Logout
await supabase.auth.signOut();
// Session check
const {
  data: { session },
} = await supabase.auth.getSession();
supabase.auth.onAuthStateChange((event, session) => {
  /* ... */
});
```

---

## 13. How is user session managed in Supabase? What is a session and how is it used in the app?

In Supabase, user session is managed with a session object that contains authentication info (e.g., access token, user info) after login. This session allows the user to perform authorized actions in the app.

Usually, session info is kept in a Context or global state and shared between components. The UI can update dynamically based on login/logout state.

```js
const {
  data: { session },
} = await supabase.auth.getSession();
```

- The `session` object contains user info and tokens.
- Use `onAuthStateChange` to listen for session changes.

---

## 14. How is database connection established with Supabase in React? How does createClient work? How should connection info be stored?

Database connection in React is established with the `createClient` function. This function creates a client using your Supabase project's URL and public (anon) key. All database operations are performed through this client.

Connection info (URL and key) should be stored in a `.env` file for security, not hardcoded in the code.

```js
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);
```

---

## 15. How to create a table, insert, update, delete, and list data in Supabase database?

Basic CRUD operations in Supabase are as follows:

- **Insert:**

```js
await supabase.from("tasks").insert([{ title: "New Task" }]);
```

- **Select:**

```js
const { data } = await supabase.from("tasks").select("*");
```

- **Update:**

```js
await supabase.from("tasks").update({ done: true }).eq("id", 1);
```

- **Delete:**

```js
await supabase.from("tasks").delete().eq("id", 1);
```

---

## 16. What is Row-Level Security (RLS)? How to ensure only the user's own data is visible in Supabase?

**Row-Level Security (RLS)** provides row-based access control in Supabase database. When RLS is enabled, only users who meet certain conditions can view or modify specific rows. For example, you can define an RLS policy so that a user can only see the data they created.

---

## 17. What is programmatic navigation and how is it done?

Programmatic navigation is done with the `useNavigate` hook in React Router. It is used to redirect the user to another page after an event in code:

```js
const navigate = useNavigate();
navigate("/dashboard");
```
