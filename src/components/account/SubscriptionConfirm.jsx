import Button from "../common/Button";

const SubscriptionConfirm = ({ modalHandler, modalMsg }) => {
  return (
    <div>
      <p className="text-xl">{modalMsg.modal}</p>
      <div className="flex justify-between items-center gap-2 my-5">
        <Button value={"Continue"} onClick={modalHandler} />
        <Button
          value={"No"}
          onClick={modalHandler}
          className={"!bg-green-600"}
        />
      </div>
    </div>
  );
};

export default SubscriptionConfirm;
