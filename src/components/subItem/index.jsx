const index = ({
  selectSubItemValue,
  setSelectSubItemValue,
  selectSubItems,
  bgColor,
}) => {
  const keyOfObject = selectSubItems && Object.keys(selectSubItems);
  return (
    <div className="flex items-center gap-0 sm:gap-5 justify-center flex-wrap sm:flex-nowrap">
      {keyOfObject?.map((el, index) => (
        <p
          className={`${
            selectSubItemValue === el
              ? `${bgColor} text-white px-3 py-2 rounded-xl font-semibold cursor-pointer`
              : "cursor-pointer px-3 py-2"
          }`}
          key={index}
          onClick={() => setSelectSubItemValue(el)}
        >
          {el}
        </p>
      ))}
    </div>
  );
};

export default index;
