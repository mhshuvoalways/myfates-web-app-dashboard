const index = ({ reports, user }) => {
  return (
    <div className="time-top py-10 title-font">
      <div className="w-10/12 mx-auto mycontainer">
        <p className="text-5xl text-gray-200">{reports?.title}</p>
        <p className="text-blue-400 mt-8 text-xl">
          {`${user?.profile?.firstName || ""} ${user?.profile?.lastName || ""}`}
        </p>
      </div>
    </div>
  );
};

export default index;
