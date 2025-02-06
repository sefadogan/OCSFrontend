const OCSTitleSeperator = ({
  title,
  titleClassName,
  justifyContent = "center",
}) => {
  return (
    <div
      className="flex items-center"
      style={{
        justifyContent: justifyContent,
      }}
    >
      <div className={titleClassName}>{title}</div>
    </div>
  );
};

export default OCSTitleSeperator;
