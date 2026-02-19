import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">

            {/* Top Footer */}
            <div className="container mx-auto px-6 py-14 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">
                        So<span className="text-indigo-600">Cart</span>
                    </h2>
                    <p className="text-sm leading-relaxed">
                        Your one-stop destination for quality products, top brands,
                        and unbeatable prices.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Shop</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/products" className="hover:text-white">Products</Link></li>
                        <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
                        <li><Link href="/brands" className="hover:text-white">Brands</Link></li>
                        <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
                        <li><Link href="/wishlist" className="hover:text-white">Wishlist</Link></li>
                    </ul>
                </div>

                {/* Help */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Help</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
                        <li><Link href="#" className="hover:text-white">Shipping & Returns</Link></li>
                        <li><Link href="#" className="hover:text-white">FAQs</Link></li>
                        <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Newsletter</h3>
                    <p className="text-sm ">
                        Subscribe to get special offers and updates.
                    </p>
                    <form className="flex gap-2 mt-3">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="w-full px-4 py-2 rounded bg-gray-800 text-sm text-white focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-indigo-600 px-4 py-2 rounded text-sm text-white hover:bg-indigo-700 transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                    <p>
                        © {new Date().getFullYear()} ShopNow. All rights reserved.
                    </p>

                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-white">Facebook</Link>
                        <Link href="#" className="hover:text-white">Instagram</Link>
                        <Link href="#" className="hover:text-white">Twitter</Link>
                    </div>
                </div>
            </div>

        </footer>
    );
}

