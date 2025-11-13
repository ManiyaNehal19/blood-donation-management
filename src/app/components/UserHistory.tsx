"use client";
type UserHistoryRecord = {
  _id: string;
  cnic: string;
  historyDate: string;
  bloodVolume: number;
  unitId: string;
};

interface UserHistoryProps {
  user: UserHistoryRecord[];
}

const UserHistory = ({ user }: UserHistoryProps) => {
  if (!user || user.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mt-6 w-4/5 mx-auto">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="text-red-600 mr-2 text-2xl">🩸</span> Donation History
        </h2>
        <p className="text-gray-500">No donation records found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6 w-4/5 mx-auto">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <span className="text-red-600 mr-2 text-2xl">📋</span> Donation History
      </h2>

      <div>
        {user.map((record) => (
          <div
            key={record._id}
            className="flex justify-between mb-2 cursor-pointer items-center border-l-3 border-green-500 bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="">
              <h3 className="font-semibold text-gray-800">Whole Blood Donation</h3>
              <p className="text-sm text-gray-500">
                {new Date(record.historyDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                • Blood Center
              </p>
              <p className="text-green-600 font-medium mt-1">
                ✅ Completed Successfully
              </p>
            </div>
            <span className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
              {record.bloodVolume}ml
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHistory;
