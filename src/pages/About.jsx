import "../pages/css/About.css";

function About() {
  return (
    <div className="about-page">
      {/* HERO SECTION */}
      <section className="about-hero">
        <h1>About My Fruits Shop 🍎</h1>
        <p>
          Fresh fruits, smart inventory management, and a smooth shopping
          experience — all in one place.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section className="about-container">
        <div className="about-card">
          <h2>🌱 Who We Are</h2>
          <p>
            My Fruits Shop is designed to manage fruit products efficiently while providing
            a clean and user-friendly shopping experience.
          </p>
        </div>

        <div className="about-card">
          <h2>🎯 Our Mission</h2>
          <p>
            Our mission is to simplify product management and make
            online fruit shopping fast, easy, and reliable for users.
          </p>
        </div>
        
      </section>
    </div>
  );
}

export default About;
