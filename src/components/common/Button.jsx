import { motion } from "framer-motion";

const Button = ({ value, onClick, className, btnCenter }) => {
  return (
    <div className={`flex ${btnCenter && "justify-center"}`}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        className={`bg-gray-900 text-white py-2.5 font-semibold mybutton px-10 ${className} capitalize`}
        onClick={onClick}
      >
        {value}
      </motion.button>
    </div>
  );
};

export default Button;
