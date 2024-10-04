import { useState } from "react";
import { loginUser } from "./api/user";

export const App = () => {
  // Теперь состояния username и password не нужны, они берутся из объекта formData
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (formData) => {
    setIsPending(true);
    setUser(null);
    setError(null);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await loginUser(username, password);
      setUser(response.data);
    } catch (error) {
      setError(error.error);
    } finally {
      setIsPending(false);
    }

    // КАК БЫЛО РАНЬШЕ!!!
    // e.preventDefault();
    //
    // setIsPending(true);
    // setUser(null);
    // setError(null);
    //
    // try {
    //   const response = await loginUser(username, password);
    //   setUser(response.data);
    // } catch (error) {
    //   setError(error.error);
    // } finally {
    //   setIsPending(false);
    // }
  };

  return (
    <form action={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          // value={formData.username}
          // onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>

      {user && <p style={{ color: "green" }}>Logged in: {user.email}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};
