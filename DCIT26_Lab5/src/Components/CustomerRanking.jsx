export const CustomerRank = () => {
    const topCustomers = [
        { id: 1, name: "Lime Serenity", orders: 48 },
        { id: 2, name: "Kiyotaka Ayanokoji", orders: 42 },
        { id: 3, name: "Horikita Suzune", orders: 35 },
        { id: 4, name: "Shiina Hiyori", orders: 29 },
        { id: 5, name: "Kei Karuizawa", orders: 22 },
    ];

    const getRankBadge = (rank) => {
        switch (rank) {
            case 1: return <span className="text-2xl">🥇</span>;
            case 2: return <span className="text-2xl">🥈</span>;
            case 3: return <span className="text-2xl">🥉</span>;
            default: return <span className="font-bold text-sm text-[#605146]/60 w-6 text-center">{rank}</span>;
        }
    };

    return (
        <div className="p-6 text-[#605146] max-w-2xl mx-auto">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold tracking-wide">🏆 TOP CUSTOMER RANK</h3>
                <p className="text-xs opacity-75 mt-1 italic">Our most loyal coffee lovers this month</p>
            </div>

            <div className="flex flex-col gap-3">
                {topCustomers.map((customer, index) => {
                    const rank = index + 1;
                    return (
                        <div
                            key={customer.id}
                            className={`grid grid-cols-3 items-center p-4 rounded-xl shadow-sm border border-[#605146]/10 transition-all duration-300 hover:scale-[1.01] ${
                                rank === 1 ? "bg-[#ffde59]/20 border-[#ffde59]" : "bg-white"
                            }`}
                        >
                            <div className="flex items-center justify-start">
                                <div className="w-8 flex justify-center">
                                    {getRankBadge(rank)}
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <span className="font-bold text-sm bg-[#605146]/10 px-3 py-1 rounded-full whitespace-nowrap">
                                    {customer.orders} {customer.orders === 1 ? "Order" : "Orders"}
                                </span>
                            </div>

                            <div className="flex justify-end">
                                <span className={`font-semibold text-base text-right ${rank === 1 ? "text-amber-900 font-bold" : ""}`}>
                                    {customer.name}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};