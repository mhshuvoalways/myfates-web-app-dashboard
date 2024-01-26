import { useState, useEffect } from "react";
import moment from "moment";
import Sidebar from "../components/sidebar";
import CalendarCompo from "../components/dReport";
import { useDispatch, useSelector } from "react-redux";
import { getFinance } from "../../store/actions/reportAction";

const Calendar = () => {
  const [selectSubItems, setSelectSubItems] = useState(null);
  const [reportWriting, setReportWriting] = useState([]);
  const [selectSubItemValue, setSelectSubItemValue] = useState("Insight");
  const [selectSubItemValueNext, setSelectSubItemValueNext] =
    useState("Insight");
  const [data, setData] = useState(null);
  const [dataNext, setDataNext] = useState(null);

  const reportReducer = useSelector((store) => store.reportReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFinance());
  }, [dispatch]);

  let today = new Date();
  let nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);

  const response = reportReducer.finances;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSub = (sub) => {
    if (response) {
      const subItem = response?.financeReport?.[sub].dailyData;
      subItem.forEach((el) => {
        const parsedDate = moment(el.date);
        const formattedDate = parsedDate.format("YYYY-MM-DD");
        if (moment(today).format("YYYY-MM-DD") === formattedDate) {
          setData(el);
        }
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSubNext = (sub) => {
    if (response) {
      const subItem = response?.financeReport?.[sub].dailyData;
      subItem.forEach((el) => {
        const parsedDate = moment(el.date);
        const formattedDate = parsedDate.format("YYYY-MM-DD");
        if (moment(nextDay).format("YYYY-MM-DD") === formattedDate) {
          setDataNext(el);
        }
      });
    }
  };

  useEffect(() => {
    getSub(selectSubItemValue);
  }, [getSub, selectSubItemValue]);

  useEffect(() => {
    getSubNext(selectSubItemValueNext);
  }, [getSubNext, selectSubItemValueNext]);

  useEffect(() => {
    setReportWriting(response?.financeReportWritings);
    setSelectSubItems(response?.financeReport);
  }, [response?.financeReport, response?.financeReportWritings]);

  return (
    <Sidebar>
      <CalendarCompo
        selectSubItemValue={selectSubItemValue}
        setSelectSubItemValue={setSelectSubItemValue}
        selectSubItemValueNext={selectSubItemValueNext}
        setSelectSubItemValueNext={setSelectSubItemValueNext}
        selectSubItems={selectSubItems}
        data={data}
        dataNext={dataNext}
        reportWriting={reportWriting}
      />
    </Sidebar>
  );
};

export default Calendar;
