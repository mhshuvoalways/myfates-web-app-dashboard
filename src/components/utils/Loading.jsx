import { useSelector } from "react-redux";

const ClickedLoading = () => {
  const btnReducer = useSelector((state) => state.btnReducer);

  return (
    <>
      {!btnReducer && (
        <>
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <img src='/icons/loading.svg' alt="" />
          </div>
          <p className="fixed inset-0 z-40 opacity-60 bg-gray-900"></p>
        </>
      )}
    </>
  );
};

export default ClickedLoading;