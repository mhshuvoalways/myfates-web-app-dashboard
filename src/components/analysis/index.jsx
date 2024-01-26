import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Element } from "react-scroll";
import LazyImage from "../utils/LazyImage";
import Header from "../header";
import List from "../list";
import { getreports } from "../../../store/actions/reportsAction";

const Index = () => {
  const [state, setState] = useState(null);
  const [showItem, setShowItem] = useState([]);
  const userReducer = useSelector((state) => state.userReducer);
  const reportsReducer = useSelector((state) => state.reportsReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getreports());
  }, [dispatch]);

  useEffect(() => {
    if (showItem.length === 0) {
      const temp = [...showItem];
      reportsReducer.reports &&
        temp.push(Object.keys(reportsReducer.reports?.reports)[0]);
      setShowItem(temp);
    }
  }, [reportsReducer.reports, showItem]);

  useEffect(() => {
    if (!state) {
      if (showItem[0] === "entireLife") {
        setState(reportsReducer.reports?.reports?.entireLife);
      } else {
        setState(reportsReducer.reports?.reports?.人生の全体);
      }
    }
  }, [
    reportsReducer.reports?.reports?.entireLife,
    reportsReducer.reports?.reports?.人生の全体,
    showItem,
    state,
  ]);

  const individualWord = (item) => {
    if (item) {
      const words = item.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
      const formattedString = words.replace(/&/g, " & ");
      return formattedString.replace(/\b\w/g, (char) => char.toUpperCase());
    }
  };

  return (
    <div>
      <Header reports={reportsReducer.reports} user={userReducer.user} />
      <div className="w-10/12 mx-auto mycontainer">
        <img src="/images/treesun.png" className="w-full rounded-3xl mt-10" />
        <div className="flex justify-between items-start flex-wrap md:flex-nowrap flex-col-reverse md:flex-row relative mt-10 gap-5">
          <div className="w-full md:w-7/12 lg:w-8/12">
            <p className="text-4xl font-bold mb-10">
              {individualWord(showItem[0])}
            </p>
            {state &&
              Object.entries(state).map((el, index) => {
                return (
                  <Element name={el[0]} key={index} className="mb-10">
                    <p className="font-semibold text-3xl mb-5 sticky top-0 bg-[#fcfcfc] py-2">
                      {individualWord(el[0])}
                    </p>
                    <LazyImage imgSrc={el[1].image} />
                    <p className="text-xl leading-loose text-justify mt-2">
                      {el[1].data}
                    </p>
                  </Element>
                );
              })}
            <p className="h-0 md:h-80"></p>
          </div>
          <List
            reports={reportsReducer.reports}
            setState={setState}
            showItem={showItem}
            setShowItem={setShowItem}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
