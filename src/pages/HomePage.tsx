export default function HomePage() {
    return (
        <div className="relative -mt-16 flex min-h-screen flex-col items-center justify-center pt-16">
            {/* 
                -mt-16 pt-16: Hack untuk membuat background naik ke atas header
                tapi content tetap di bawah header
            */}

            {/* Background Image - Full Screen */}
            <img
                src="/wikidata-welcome.png"
                alt="Wikidata Background"
                className="absolute inset-0 z-0 h-full w-full object-cover opacity-15"
                onError={(e) => {
                    e.currentTarget.style.display = "none";
                }}
            />

            {/* Content */}
            <div className="relative z-10 px-4 pb-32 text-center">
                <h1 className="mb-6 text-5xl font-bold text-[#373839]">
                    Welcome to Wikidata
                </h1>
                <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-700">
                    The free knowledge base of structured data items that anyone
                    can edit
                </p>

                <div className="space-x-4">
                    <a
                        href="/search"
                        className="inline-block rounded-md bg-[#3366cc] px-8 py-4 text-lg text-white shadow-lg transition-colors hover:bg-[#254990]"
                    >
                        Start Exploring
                    </a>
                    <a
                        href="/items"
                        className="inline-block rounded-md border-2 border-[#3366cc] px-8 py-4 text-lg text-[#3366cc] transition-colors hover:bg-[#3366cc] hover:text-white"
                    >
                        Browse Items
                    </a>
                </div>
            </div>
        </div>
    );
}
