import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">
                            About
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link
                                    to="/about"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    About Wikidata Clone
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/help"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    Help & Documentation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">
                            Browse
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link
                                    to="/items"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    Browse Items
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/properties"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    Browse Properties
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">
                            Tools
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link
                                    to="/search"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    Search
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/recent-changes"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    Recent Changes
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">
                            Community
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link
                                    to="/community"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    Community Portal
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-8">
                    <p className="text-center text-base text-gray-400">
                        &copy; 2025 Wikidata Clone. Educational project inspired
                        by Wikidata.
                    </p>
                </div>
            </div>
        </footer>
    );
}
