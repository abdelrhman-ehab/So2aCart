import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="bg-linear-to-r from-indigo-700 to-purple-700 text-white rounded-lg">
        <div className="py-20 text-center px-6 max-w-3xl mx-auto flex flex-col gap-3">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Shop Smarter. Live Better.
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8">
            Everything you need in one place — fast, simple, and reliable shopping experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-black px-8 py-3 rounded-lg font-semibold hover:bg-black/80 transition mx-auto w-full sm:w[75%] md:w-[50%]"
            >
              Browse Products
            </Link>

            <Link
              href="/categories"
              className="bg-white text-indigo-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition mx-auto w-full sm:w[75%] md:w-[50%]"
            >
              View Categories
            </Link>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="container mx-auto px-6 py-16 text-center flex flex-col gap-3">
        <h2 className="text-3xl font-bold mb-4">Brands</h2>
        <p className="text-gray-600 mb-6">
          Discover top brands and trusted names in the market.
        </p>

        <Link
          href="/brands"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition mx-auto w-full sm:w[75%] md:w-[50%]"
        >
          View Brands
        </Link>
      </section>

      {/* CART */}
      <section className="bg-white py-16 text-center flex flex-col gap-3">
        <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-600 mb-6">
          Review your selected items and proceed to checkout بسهولة.
        </p>

        <Link
          href="/cart"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition mx-auto w-full sm:w[75%] md:w-[50%]"
        >
          Go to Cart
        </Link>
      </section>

      {/* WISHLIST */}
      <section className="container mx-auto px-6 py-16 text-center flex flex-col gap-3">
        <h2 className="text-3xl font-bold mb-4">Wishlist</h2>
        <p className="text-gray-600 mb-6">
          Save your favorite products and come back to them anytime.
        </p>

        <Link
          href="/wishlist"
          className="inline-block bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition mx-auto w-full sm:w[75%] md:w-[50%]"
        >
          View Wishlist
        </Link>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white rounded-lg">
        <div className="py-20 text-center px-6 flex flex-col gap-3">
          <h2 className="text-3xl font-bold mb-4">
            Start Your Shopping Journey Now
          </h2>
          <p className="text-indigo-100 mb-6">
            Fast, secure, and built for you.
          </p>

          <Link
            href="/products"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition mx-auto w-full sm:w[75%] md:w-[50%]"
          >
            Get Started
          </Link>
        </div>
      </section>

    </main>
  );
}
