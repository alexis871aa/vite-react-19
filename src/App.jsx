import { useState, useActionState } from "react";
import { loginUser } from "./api/user";

export const App = () => {
  const [state, submitAction, isPending] = useActionState(handleAction, {
    user: null,
    error: null,
  });

  async function handleAction(prevState, formData) {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const response = await loginUser(username, password);
      return { user: response.data, error: null };
    } catch (error) {
      return { ...prevState, error: error.error };
    }
  }

  return (
    <form action={submitAction}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" required />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>

      {state.user && (
        <p style={{ color: "green" }}>Logged in: {state.user.email}</p>
      )}
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
    </form>
  );
};
