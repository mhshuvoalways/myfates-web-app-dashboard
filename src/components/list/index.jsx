import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDown, IoIosMan, IoMdHeart } from "react-icons/io";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaBook } from "react-icons/fa";
import { Link } from "react-scroll";

const Index = ({ reports, setState, showItem, setShowItem }) => {
  
  const itemHandler = (value) => {
    let temp = [...showItem];
    temp.push(value);
    setShowItem(temp);
    setTimeout(() => {
      const newShowItems = temp.filter((el) => el === value);
      setShowItem(newShowItems);
    }, 300);
  };

  const individualWord = (item) => {
    if (item) {
      const words = item.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
      const formattedString = words.replace(/&/g, " & ");
      return formattedString.replace(/\b\w/g, (char) => char.toUpperCase());
    }
  };

  return (
    <div className="bg-white shadow rounded-xl w-full md:w-3/12 static md:sticky top-10">
      {reports &&
        Object.keys(reports.reports).map((el) => {
          return (
            <div key={el}>
              <div
                className="flex justify-between items-center cursor-pointer shadow-sm p-5 gap-2"
                onClick={() => {
                  itemHandler(el);
                  setState(reports.reports[el]);
                }}
              >
                {el === "entireLife" && (
                  <IoIosMan
                    className={`text-2xl ${
                      showItem.includes(el) && "text-blue-500"
                    }`}
                  />
                )}
                {el === "love" && (
                  <IoMdHeart
                    className={`text-2xl ${
                      showItem.includes(el) && "text-blue-500"
                    }`}
                  />
                )}
                {el === "finance" && (
                  <HiCurrencyDollar
                    className={`text-2xl ${
                      showItem.includes(el) && "text-blue-500"
                    }`}
                  />
                )}
                {el === "learning&Career" && (
                  <FaBook
                    className={`text-xl ${
                      showItem.includes(el) && "text-blue-500"
                    }`}
                  />
                )}
                <p
                  className={
                    showItem.includes(el) && `text-blue-500 font-semibold`
                  }
                >
                  {individualWord(el)}
                </p>
                <IoIosArrowDown
                  className={`text-xl transition-all ${
                    showItem.includes(el)
                      ? "rotate-180 text-blue-500"
                      : "text-gray-400"
                  }`}
                />
              </div>
              <AnimatePresence>
                {showItem.includes(el) && (
                  <motion.div
                    className="my-3 px-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {Object.entries(reports.reports[el]).map((val) => {
                      return (
                        <Link
                          activeClass="bg-blue-50 font-semibold"
                          smooth={true}
                          spy={true}
                          to={val[0]}
                          key={val[0]}
                          onClick={() => {
                            setState(reports.reports[el]);
                          }}
                        >
                          <p className="border rounded-full p-1 mt-2 text-center cursor-pointer hover:bg-blue-50">
                            {individualWord(val[0])}
                          </p>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
    </div>
  );
};

export default Index;
