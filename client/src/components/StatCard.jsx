function StatCard({
  title,
  value,
  icon,
  color = "#6D4C41",
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-[#E8DDD5]">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2
            className="text-4xl font-bold mt-3"
            style={{ color }}
          >
            {value}
          </h2>

        </div>

        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: `${color}20`,
          }}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;