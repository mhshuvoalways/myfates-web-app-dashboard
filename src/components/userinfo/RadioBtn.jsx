import { motion } from "framer-motion";

const RadioField = ({ radioHandler, selectBtn, myName }) => {
  return (
    <motion.label
      className="inline-flex items-center cursor-pointer"
      onClick={() => radioHandler(myName)}
      whileTap={{ scale: 0.95 }}
    >
      <span className="w-5 h-5 mr-2 inline-flex justify-center items-center rounded-full bg-gray-600">
        <span
          className={`w-[16px] border-white border-[3px] h-[16px] inline-flex justify-center items-center rounded-full ${
            selectBtn === myName ? "bg-gray-600" : "bg-white"
          }`}
        ></span>
      </span>
      {myName.toUpperCase()}
    </motion.label>
  );
};

export default RadioField;
