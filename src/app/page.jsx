import Link from "next/link";

export default async function Home() {

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-linear-to-r from-indigo-800 to-purple-800 rounded-lg text-white">
        <div className="py-15 flex justify-center items-center gap-5 flex-col px-5 w-fit mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold">Discover Your Style</h1>
          <p className="text-lg md:text-xl text-indigo-100">Shop the latest products from top brands at the best prices</p>
          <div className="flex flex-col sm:flex-row gap-3 flex-nowrap w-full">
            <Link href="/products" className="w-3/4 mx-auto text-center bg-black text-white font-semibold px-8 py-3 rounded-lg hover:bg-black/80 transition">Shop Now</Link>
            <Link href="/categories" className="w-3/4 mx-auto text-center bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition">Explore Categories</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {["Men", "Women", "Electronics", "Accessories"].map((cat) => (
            <div
              key={cat}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-center cursor-pointer"
            >
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="font-semibold text-lg">{cat}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="border rounded-xl p-4 hover:shadow-lg transition"
              >
                <div className="h-40 bg-gray-100 rounded mb-4"></div>
                <h3 className="font-semibold mb-2">Product Name</h3>
                <p className="text-indigo-600 font-bold mb-3">$99.99</p>
                <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Top Brands
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 items-center">
          {[1, 2, 3, 4, 5, 6].map((brand) => (
            <div
              key={brand}
              className="bg-white shadow rounded-lg p-4 text-center"
            >
              <span className="font-semibold">Brand</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white rounded-lg">
        <div className="py-15 flex justify-center items-center gap-3 flex-col px-5">
          <h2 className="text-3xl font-bold">
            Ready to Start Shopping?
          </h2>
          <p className="text-indigo-100">
            Browse all products and enjoy a smooth shopping experience
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Explore Products
          </Link>
        </div>
      </section>

    </main>
  );
}
