import React from "react";

const Page = () => {
  const userHeader = [
    {
      name: "Total Donations",
      attribute: 0,
      emoji: "🩸",
      color: "#ef4444", // red-500
    },
    {
      name: "Eligibility Status",
      attribute: "Eligible",
      emoji: "✅",
      color: "#22c55e", // green-500
    },
    {
      name: "Blood Type",
      attribute: "B+",
      emoji: "🔴",
      color: "#3b82f6", // blue-500
    },
    {
      name: "Next Eligible",
      attribute: "Ready Now",
      emoji: "📅",
      color: "#a855f7", // purple-500
    },
  ];

  return (
    <div className="w-full px-4 py-4 text-gray-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {userHeader.map((head) => (
          <div
            key={head.name}
            className="flex items-center  rounded-xl p-5 shadow-md bg-white border-l-4 hover:shadow-lg hover:scale-105 transition-transform duration-300"
            style={{ borderLeftColor: head.color }}
          >
            <div className="text-4xl mb-2">{head.emoji}</div>
            <div>
            <h4 className="text-lg font-semibold">{head.name}</h4>
            <p className="text-sm mt-1 font-medium opacity-80">
              {head.attribute}
            </p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
