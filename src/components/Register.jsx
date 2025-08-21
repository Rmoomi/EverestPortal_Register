import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { auth, db } from "./javascriptDB/connectDB.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, push } from "firebase/database";

function RegisterAcc() {
  const navigate = useNavigate();
  const initialForm = {
    fullname: "",
    email: "",
    pass: "",
    confirmPass: "",
  };
  const [loading, setLoading] = useState(false);
  const [displayInput, setInput] = useState(initialForm);

  //create function to when submitting
  const submitForm = async (e) => {
    e.preventDefault();
    if (displayInput.pass !== displayInput.confirmPass) {
      alert("Passwords do not match! Try again");
      return; // stop execution, do not proceed with Firebase
    }
    setLoading(true);
    try {
      const usersRef = ref(db, "createAcc");

      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        displayInput.email,
        displayInput.pass
      );
      const user = userCredential.user;

      // 2. Update displayName
      await updateProfile(user, {
        displayName: displayInput.fullname,
      });

      // 3. Save user info in Realtime Database
      await push(usersRef, {
        fullname: displayInput.fullname,
        email: displayInput.email,
        uid: user.uid,
      });

      // 4. Navigate after everything is done
      alert("Account created successfully!");
      setInput(initialForm);
      navigate("/homepage");
    } catch (error) {
      console.error("Signup error:", error.message);
      alert("Signup failed: " + error.message);
    } finally {
      setLoading(false);
    }
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
      <div className="form_container">
        <h2>Create Account</h2>
        <form onSubmit={submitForm}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={displayInput.fullname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={displayInput.email}
            onChange={handleChange}
            required
          />
          <div className="pass_input">
            <input
              type="password"
              name="pass"
              placeholder="Password"
              value={displayInput.pass}
              onChange={handleChange}
              required
            />
            {displayInput.pass.length > 0 && displayInput.pass.length < 8 && (
              <p className="pass_feedback">
                Password must be at least 8 characters with a number.
              </p>
            )}
          </div>
          <input
            type="password"
            name="confirmPass"
            value={displayInput.confirmPass}
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          <button type="submit" className="submitBtn">
            {loading ? "Creating Account...." : "Register"}
          </button>
          <button className="btn_link" onClick={() => navigate("/login")}>
            I already have an account
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterAcc;
