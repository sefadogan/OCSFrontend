import OCSInfoCard from "./card";

const OCSInfoCards = ({ data }) => {
  return (
    <div className="flex flex-wrap gap-[2rem]">
      {data.map((item, idx) => (
        <OCSInfoCard
          key={idx}
          idx={idx}
          title={item.title}
          value={item.value}
        />
      ))}
    </div>
  );
};

export default OCSInfoCards;
