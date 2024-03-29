import React from "react";
import { Table } from "../../../../components/table";
import s from "./thirdsection.module.scss";
import { userData } from "../../../../shared/userData";
export const ThirdSectione = () => {
  return (
    <div id="thirdSection" className={s.top_colection}>
      <h2 id="table" className={s.main_text}>Cryptocurrency Prices Live</h2>
      <Table limit data={userData}></Table>
    </div>
  );
};
