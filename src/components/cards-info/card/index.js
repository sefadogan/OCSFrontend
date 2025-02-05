const OCSInfoCard = ({ title, value }) => {
  return (
    <div className="flex-1 min-w-[12.5rem] p-[1rem] bg-blue-50 rounded-lg w-full">
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
};

export default OCSInfoCard;
