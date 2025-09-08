
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


