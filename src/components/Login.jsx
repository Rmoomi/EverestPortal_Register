import "./Login.css";
import { useNavigate } from "react-router-dom";
import { use, useState } from "react";
import { auth, db } from "./javascriptDB/connectDB.js";
import { ref, onValue } from "firebase/database";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [displayInput, setInput] = useState({
    email: "",
    pass: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, displayInput.email, displayInput.pass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in:", user.email);

        // OPTIONAL: Load user data from DB
        const usersRef = ref(db, "createAcc");
        onValue(
          usersRef,
          (snapshot) => {
            const data = snapshot.val();
            for (let id in data) {
              if (data[id].email === user.email) {
                console.log("DB user data:", data[id]);
                break;
              }
            }
          },
          { onlyOnce: true }
        );

        // Redirect to reservation page
        navigate("/homepage");
      })
      .catch((error) => {
        console.error("Login failed:", error.message);

        // Show popup if username or password is wrong
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          alert("Incorrect email or password. Please try again.");
        } else if (error.code === "auth/invalid-email") {
          alert("Invalid email format.");
        } else {
          alert("Login failed: " + error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <main className="login-container">
        <div className="login-box">
          <h2>Welcome To Everest Portal</h2>
          <p className="subtitle">Sign in to access your account</p>

          <form id="login_main" onSubmit={submitForm}>
            <label>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={displayInput.email}
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              id="pass"
              name="pass"
              placeholder="Enter your password"
              value={displayInput.pass}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn-blue" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="signup-link">
            Don’t have an account?
            <a onClick={() => navigate("/register")}> Sign up</a>
          </p>
        </div>
      </main>
    </>
  );
}
export default Login;
