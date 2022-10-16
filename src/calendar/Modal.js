import React, { useState } from 'react';
import './Modal.css';
import diary from "./data/diary.json";

function Modal(props) {  
  const { open, set, month, day, Input } = props;
  let [inputValue, setInputValue] = useState("");


  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {month}월 {day}일 일정 추가하기
            <button className="close" onClick={() => set(false)}> &times; </button>
          </header>
          <main>
            <input type="text" placeholder="일정 저장까진 구현을 못했어요.." maxLength={100}  onChange={(event) => setInputValue(event.target.value)}></input>
          </main>
          <footer>
            <button className="save" onClick={() => {
              Input(inputValue);
              set(false);
            }}>
              save
            </button>
            <button className="close" onClick={() => set(false)}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;