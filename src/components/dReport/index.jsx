import { useEffect, useState } from "react";
import moment from "moment";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Header from "../header";
import Chatjs from "../chart/Chart";
import Timer from "../timer";
import SubItem from "../subItem";
import Items from "../chart/Items";
import Modal from "../utils/Modal";

const Index = ({
  selectSubItemValue,
  setSelectSubItemValue,
  selectSubItemValueNext,
  setSelectSubItemValueNext,
  selectSubItems,
  data,
  dataNext,
  reportWriting,
}) => {
  const [value, setValue] = useState("");
  const [submit, setSubmit] = useState(false);
  const [todaySentence, setTodaySentence] = useState(null);
  const userReducer = useSelector((store) => store.userReducer);
  const reportsReducer = useSelector((store) => store.reportsReducer);

  const { t } = useTranslation();
  const dashboard = t("dashboard", { returnObjects: true });

  const sum = data?.scores.reduce((a, b) => {
    return a + b.score;
  }, 0);
  const average = sum !== undefined && (sum / data?.scores.length).toFixed(2);

  const sumNext = dataNext?.scores.reduce((a, b) => {
    return a + b.score;
  }, 0);
  const averageNext =
    sumNext !== undefined && (sumNext / dataNext?.scores.length).toFixed(2);

  useEffect(() => {
    const today = new Date();
    reportWriting?.forEach((el) => {
      if (moment(today).format("YYYY-MM-DD") === el?.date) {
        setTodaySentence(el);
      }
    });
  }, [reportWriting]);

  return (
    <div>
      <Header reports={reportsReducer.reports} user={userReducer.user} />
      <div className="mycontainer">
        <img src="/images/treesun.png" className="w-full rounded-3xl mt-10" />
        <p className="text-3xl mt-10 title-font capitalize">
          {todaySentence?.sentence}
        </p>
        <div className="flex justify-between items-start flex-wrap lg:flex-nowrap gap-10 mt-10">
          <div className="w-full lg:w-6/12 space-y-10">
            <div className="flex sm:justify-between justify-center gap-5 flex-wrap md:flex-nowrap">
              <Items
                textcolor={"text-red-800"}
                bgcolor={"bg-[#F1E7FF]"}
                title={dashboard.reports.as}
                number={average}
              />
              <Items
                textcolor={"text-green-800"}
                bgcolor={"bg-[#E5F5FF]"}
                title={dashboard.reports.se}
                number={data?.scoreEval}
              />
            </div>
            <div className="bg-white shadow rounded-xl p-5 space-y-5">
              <p className="text-3xl mb-5 text-[teal] title-font">
                {dashboard.reports.today}
              </p>
              <hr />
              <SubItem
                selectSubItemValue={selectSubItemValue}
                setSelectSubItemValue={setSelectSubItemValue}
                selectSubItems={selectSubItems}
                bgColor={"bg-[teal]"}
              />
              <Chatjs data={data} chartColor={"teal"} />
              <p className="text-[teal] text-center mt-10">
                {data?.dailyContent}
              </p>
            </div>
            <Timer />
          </div>
          <div className="w-full lg:w-6/12 space-y-10">
            <div className="flex sm:justify-between justify-center gap-5 flex-wrap md:flex-nowrap">
              <Items
                textcolor={"text-red-800"}
                bgcolor={"bg-[#F1E7FF]"}
                title={dashboard.reports.as}
                number={averageNext}
              />
              <Items
                textcolor={"text-green-800"}
                bgcolor={"bg-[#E5F5FF]"}
                title={dashboard.reports.se}
                number={dataNext?.scoreEval}
              />
            </div>
            <div className="bg-white shadow rounded-xl p-5 space-y-5">
              <p className="text-3xl mb-5 text-[purple] title-font">
                {dashboard.reports.tmrw}
              </p>
              <hr />
              <SubItem
                selectSubItemValue={selectSubItemValueNext}
                setSelectSubItemValue={setSelectSubItemValueNext}
                selectSubItems={selectSubItems}
                bgColor={"bg-[purple]"}
              />
              <Chatjs data={dataNext} chartColor={"purple"} />
              <p className="text-[purple] text-center mt-10">
                {dataNext?.dailyContent}
              </p>
            </div>
            <div>
              <p className="text-4xl title-font">
                {dashboard.reports.prayers.title}
              </p>
              <form className="bg-blue-100 rounded-xl p-5 mt-5 flex justify-between items-center gap-5 flex-wrap sm:flex-nowrap">
                <input
                  type="text"
                  className="border border-gray-400 px-2 py-2 rounded-xl font-semibold w-full outline-0"
                  placeholder={dashboard.reports.prayers.ph}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setSubmit(false);
                  }}
                  value={value}
                  required
                />
                <motion.button
                  whileTap={{
                    scale: 0.9,
                  }}
                  onClick={(e) => {
                    setSubmit(true);
                    if (value) {
                      e.preventDefault();
                    }
                  }}
                  className="border border-gray-400 px-5 py-2 rounded-xl font-semibold w-full sm:w-24 text-center ml-auto cursor-pointer"
                >
                  {dashboard.reports.prayers.btn}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {submit && value && (
        <Modal
          modalHandler={() => {
            setSubmit(false);
            setValue("");
          }}
        >
          <p className="text-xl font-semibold text-center pb-16">
            {dashboard.reports.prayers.sd}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default Index;
