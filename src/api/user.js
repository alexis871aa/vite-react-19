export const loginUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "user" && password === "pass") {
        resolve({
          success: true,
          data: {
            username,
            email: "user@example.com",
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5ydSIsImlkIjoiNjZkYjZlYjg0ZTQyZmVlNmJkMDFjMzYwIiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJpYXQiOjE3Mjc5NjUxOTYsImV4cCI6MTcyNzk2NjA5Nn0.UIRdBhog9Fpj5fRsOOAlqxZzlNbsbYp1Bz4EckSbfZ8",
          },
        });
      } else {
        reject({ success: false, error: "Invalid credentials" });
      }
    }, 1000);
  });
};
