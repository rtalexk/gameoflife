import s from './ClearBtn.module.css';
import React from 'react'

export default ClearBtn;

interface IClearBtnProps {
  onClick(): void;
}

function ClearBtn(props: IClearBtnProps) {
  const { onClick } = props;

  return (
    <button className={s.ClearBtn} onClick={onClick}>Clear</button>
  );
}
