import s from './NextGenBtn.module.css';
import React from 'react'

interface INextGenBtnProps {
  onClick(): void;
}

export default NextGenBtn;

function NextGenBtn(props: INextGenBtnProps) {
  const { onClick } = props;
  return (
    <button onClick={onClick} className={s.NextGenBtn}>
      Next
    </button>
  );
}
