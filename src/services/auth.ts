export type DummyLoginResponse = {
  token: string;
  user: {
    id: string;
    username: string;
    name: string;
  };
};

export class AuthError extends Error {
  code: string;
  constructor(message: string, code = "AUTH_FAILED") {
    super(message);
    this.code = code;
  }
}

// Dummy API to simulate network login
export function dummyLogin(
  username: string,
  password: string
): Promise<DummyLoginResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isValid =
        username.trim().toLowerCase() === "test" &&
        password === "password123";
      if (isValid) {
        resolve({
          token: "dummy-token-123",
          user: { id: "u_1", username: "test", name: "Test User" },
        });
      } else {
        reject(new AuthError("Invalid username or password"));
      }
    }, 800);
  });
}


