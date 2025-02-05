import OCSInfoCard from "./card";

const OCSInfoCards = ({ data }) => {
  return (
    <div className="flex flex-wrap gap-[1.5rem]">
      {data.map((item, idx) => (
        <OCSInfoCard key={idx} title={item.title} value={item.value} />
      ))}
    </div>
  );
};

export default OCSInfoCards;
