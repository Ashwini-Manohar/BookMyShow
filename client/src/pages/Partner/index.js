// import React from "react";
// import { Tabs } from "antd";
// import TheatreList from "./TheatreList";
// const Partner = () => {
// const items = [
// {
// key: "1",
// label: "Theatres",
// children: <TheatreList />,
// },
// {
//       key: "2",
//       label: "Theatre List",
//       children: <div>Theatre List Content</div>, // replace with component
//     },
//     {
//       key: "3",
//       label: "Bookings",
//       children: <div>Bookings Content</div>, // replace with component
//     },
// ];
// return (
// <>
// <h1>Partner Page</h1>
// <Tabs items={items} />
// </>
// );
// };
// export default Partner;
import React from "react";
import { Tabs } from "antd";
import TheatreList from "./TheatreList";
const Partner = () => {
  const items = [
    {
      key: "1",
      label: "Tab One",
      children: <TheatreList />,
    },
    // {
    //   key: "2",
    //   label: "Tab Two",
    //   children: <h2>Content Two</h2>,
    // },
  ];

  return (
    <div >
      <h1>Partner Page</h1>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Partner;


