import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import SearchBar from "../SearchBar";

export default function Header() {
    const { user, isAuthenticated, signOut } = useAuth();

    return (
        <header className="relative z-50 border-b border-gray-200 bg-white shadow-sm">
            {/* 👆 Tambahkan relative z-50 untuk memastikan header di atas semua */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center space-x-4">
                        <Link
                            to="/"
                            className="flex flex-shrink-0 items-center space-x-2"
                        >
                            <img
                                src="/wikidata.png"
                                alt="Wikidata Clone"
                                className="h-8 w-8"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    e.currentTarget.nextElementSibling?.classList.remove(
                                        "hidden",
                                    );
                                }}
                            />
                            <span className="text-xl font-bold text-gray-900">
                                Wikidata
                            </span>
                        </Link>

                        <div className="max-w-md flex-1">
                            <SearchBar />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="text-sm text-gray-700 hover:text-gray-900"
                                >
                                    {user?.username}
                                </Link>
                                <button
                                    onClick={signOut}
                                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="text-sm font-medium text-[#3366cc] hover:text-[#254990] hover:underline"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
