import { useAuth } from "../features/auth/hooks/useAuth";

export default function DashboardPage() {
    const { user, signOut } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Wikidata Clone
                        </h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                                Welcome, {user?.username}
                            </span>
                            <button
                                onClick={signOut}
                                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-4 text-xl font-semibold">
                            Dashboard
                        </h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-md bg-gray-50 p-4">
                                <h3 className="font-medium">User Info</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Email: {user?.email}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Role: {user?.role}
                                </p>
                                {user?.tokenExpiresAt && (
                                    <p className="text-sm text-gray-600">
                                        Session expires:{" "}
                                        {new Date(
                                            user.tokenExpiresAt,
                                        ).toLocaleString()}
                                    </p>
                                )}
                            </div>
                            <div className="rounded-md bg-gray-50 p-4">
                                <h3 className="font-medium">Quick Actions</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Your Wikidata clone features will appear
                                    here.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
