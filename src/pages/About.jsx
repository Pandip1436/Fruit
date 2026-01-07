function About() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          About My Fruits Shop 🍎
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Fresh fruits, smart inventory management, and a smooth shopping
          experience — all in one place.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-3">
            🌱 Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed">
            My Fruits Shop is designed to manage fruit products efficiently while providing
            a clean and user-friendly shopping experience.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-3">
            🎯 Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to simplify product management and make
            online fruit shopping fast, easy, and reliable for users.
          </p>
        </div>

      </section>
    </div>
  );
}

export default About;
