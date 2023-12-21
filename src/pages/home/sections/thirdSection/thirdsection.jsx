import React from "react";
import { Table } from "../../../../components/table";
import s from "./thirdsection.module.scss";

export const ThirdSection = () => {
  return (
    <div className={s.top_colection}>
      <h2 className={s.main_text}>Top Collection</h2>
      <Table />
    </div>
  );
};
