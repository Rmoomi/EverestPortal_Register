import "./Nav_bar.css";
import "./Home_page.css";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

// Simple reusable ConfirmModal
function ConfirmModal({ message, isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={() => onConfirm(true)} className="btn-blue">
            Yes
          </button>
          <button onClick={() => onCancel(false)} className="btn-red">
            No
          </button>
        </div>
      </div>
    </div>
  );
}

function Homepage() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [open, setOpen] = useState(false);
  const [displayUser, setUser] = useState("");

  // ✅ put this in useEffect so it doesn’t re-run endlessly
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.displayName || user.email);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const logoutClicked = () => {
    setOpen(true); // open the modal
  };

  const handleConfirm = (result) => {
    setOpen(false);
    if (result) {
      // user clicked YES
      signOut(auth)
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.error("Logout error:", error.message);
        });
    }
    // if result is false, do nothing (cancel)
  };

  return (
    <>
      {/* NAVIGATION BAR */}
      <div className="navbar">
        <div className="logo">🔷 EveRest Portal</div>
        <nav>
          <a href="homepage.html">Home</a>
          <a href="">Digital Cemetery Map</a>
          <a href="reservation.html">Reservations</a>
          <a href="">Notifications</a>
          <a href="">Feedback</a>
          <div className="navbar-right">
            <button onClick={logoutClicked}>Logout</button>
          </div>
        </nav>
      </div>

      {/* HOMEPAGE CONTENT */}
      <main className="dashboard-container">
        <h2>Welcome to Your Dashboard</h2>
        <p className="welcome-msg">
          Hello, you are logged in as <strong>{displayUser}</strong>.
        </p>

        <section className="dashboard-cards">
          <div className="dash-card">
            <h3>🗺️ Digital Cemetery Map</h3>
            <p>View available plots in a visual map.</p>
            <a href="" className="btn-blue">
              Open Map
            </a>
          </div>

          <div className="dash-card">
            <h3>📝 Reservations</h3>
            <p>Manage or request a burial plot reservation.</p>
            <a href="reservation.html" className="btn-blue">
              View Reservations
            </a>
          </div>

          <div className="dash-card">
            <h3>🔔 Notifications</h3>
            <p>Stay updated with recent activity and alerts.</p>
            <a href="" className="btn-blue">
              Check Alerts
            </a>
          </div>

          <div className="dash-card">
            <h3>💬 Feedback</h3>
            <p>Send us a message, question or concern.</p>
            <a href="" className="btn-blue">
              Submit Feedback
            </a>
          </div>
        </section>
      </main>

      {/* ✅ Confirmation Modal */}
      <ConfirmModal
        message="Are you sure you want to log out?"
        isOpen={open}
        onConfirm={handleConfirm}
        onCancel={handleConfirm}
      />
    </>
  );
}

export default Homepage;
