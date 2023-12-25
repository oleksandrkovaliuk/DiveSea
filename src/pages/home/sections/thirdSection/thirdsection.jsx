import React from "react";
import { Table } from "../../../../components/table";
import s from "./thirdsection.module.scss";
const TableUserInfo = [
  {
    img: process.env.PUBLIC_URL + "/images/avatar1.jpeg",
    volume: "8,456",
    floorprice: "3,5",
    userName: "Alex Ca.",
    userNick: "by Alex",
    profit: "+27.5%",
    owners: "2.2k",
    items: 500,
  },
  {
    img: process.env.PUBLIC_URL + "/images/avatar2.jpeg",
    volume: "4,768",
    floorprice: "2,5",
    userName: "Tigran Sh.",
    userNick: "by Tigr",
    profit: "+13.5%",
    owners: "1.2k",
    items: 800,
  },
  {
    img: process.env.PUBLIC_URL + "/images/avatar1.jpeg",
    volume: "9,768",
    floorprice: "7,5",
    userName: "Jhon Tk.",
    userNick: "by Jhon",
    profit: "+35.5%",
    owners: "0.5k",
    items: 300,
  },
  {
    img: process.env.PUBLIC_URL + "/images/avatar2.jpeg",
    volume: "10,001",
    floorprice: "9,5",
    userName: "Richard Ml.",
    userNick: "by Rich",
    profit: "+55.5%",
    owners: "0.2k",
    items: 200,
  },
];

export const ThirdSection = () => {
  return (
    <div className={s.top_colection}>
      <h2 className={s.main_text}>Top Collection</h2>
      <Table data={TableUserInfo}>
      </Table>
    </div>
  );
};
