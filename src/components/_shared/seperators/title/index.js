const OCSTitleSeperator = ({
  title,
  titleClassName,
  justifyItems = "center",
}) => {
  return (
    <div className={`flex items-center w-full justify-${justifyItems}`}>
      <div className={titleClassName}>{title}</div>
    </div>
  );
};

export default OCSTitleSeperator;
