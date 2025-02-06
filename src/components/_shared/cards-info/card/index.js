const OCSInfoCard = ({ idx, title, value }) => {
  const bgColors = ["#e6ecf5", "#e6f4fe"];
  const bgColor = bgColors[idx % 2];

  return (
    <div
      className="flex flex-col flex-1 min-w-[12.5rem] p-[2rem] gap-[.5rem] rounded-3xl"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <span className="text-lg font-semibold">{title}</span>
      <span className="text-3xl font-bold">{value}</span>
    </div>
  );
};

export default OCSInfoCard;
