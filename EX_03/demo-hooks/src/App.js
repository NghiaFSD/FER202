import './App.css';
import { useEffect, useState, useRef, createContext, useMemo, useReducer } from 'react';
//useState,useEffect,useRef
//useState : thay đổi trạng thái
// const[value,setvalue]=useState(initialValue)

function DemoState(){
  const[count,setcount]=useState(0);
  return(
    <div>
      <p>Giá trị hiện tại : <strong>{count}</strong></p>
      <button onClick={()=>setcount(count+1)}>Tăng</button>
      <button onClick={()=>setcount(count-1)}>Giảm</button>
      <button onClick={()=>setcount(0)}>Reset</button>
    </div>
  )
}

//useEffect
function DemoEffect(){
  const [count,setCount]=useState(0);
  useEffect(()=>{
    document.title = `Bạn đã bấm ${count}lần`;
  },[count])//chạy lại mỗi khi biến count thay đổi
  return(
    <div>
      <p>Số lần bấm : {count}</p>
      <button onClick={()=>setCount(count+1)} style={{marginLeft: "5px"}}>Click xem tiêu đề thay đổi </button>
    </div>
  )
}

//useContext
// tạo context
const ThemeContext = createContext('light');
function DemoContext(){
  const [theme,setTheme]=useState('light');
  return(
    <ThemeContext.Provider value={theme}>
      <div 
      style={{backgroundColor:theme==='light'?'#fff':'#000',
        color:theme==='light'?'#000':'#fff'}}
      >
      </div>
      <button onClick={()=>setTheme(theme==='light'?'dark':'light')} style={{marginLeft: "5px"}}>Đổi theme</button>
    </ThemeContext.Provider>
  )
}

//useRef: tham chiếu đến 1 phần tử trong DOM vaf lưu trữ giá trị không làm render lại component
//const inputRef = useRef(initialValue);
function DemoRef(){
const myRef = useRef(null);
const handleFocus = () => {
  myRef.current.focus();
}
return(
  <div>
    <input ref={myRef} type="text" placeholder="Nhập gì đó"/>
    <button onClick={handleFocus} style={{marginLeft: "5px"}}>Focus vào input</button>
  </div>
)
}

//useMemo: ghi nhớ giá trị trả về của 1 hàm khi các tham số truyền vào không thay đổi và kết quả tính toán
//useCallback: ghi nhớ 1 hàm khi các tham số truyền vào không thay đổi và kết quả tính toán
//mà không làm render lại component
//cả 2 hook đều nhận mảng dependencies: chỉ tính toán lại hoặc tạo hàm mới khi giá trị dêpndencies thay đổi
function DemoMemo(){
  //ghi nho lai ket qua tinh toan, chi render lai khi gia tri number thay doi
  const [number,setNumber]=useState(10);
  const doubleNumber = useMemo(()=>{
    return number*2;
  },[number]);//chi chay lai khi number thay doi
  return(
    <div>
      <input type="number" value={number} onChange={(e)=>setNumber(parseInt(e.target.value) || 0)}/>
    <p>Giá trị gấp đôi: {doubleNumber}</p>
    </div>
  )
}

//useReducer: quản lý state phức tạp hơn useState, sử dụng reducer function để cập nhật state
//const [state, dispatch] = useReducer(reducer, initialState);
//reducer: ham nhận vào (state, action), trả về state mới tuong ứng với action
//dispatch: hàm để gửi action de kich hoạt reducer thay doi state
function DemoReducer(){
  const initialState = {count: 0};
  function reducer(state, action){
    switch(action.type){
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      case 'reset':
        return initialState;
      default:
        return state;
    }
  } 
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <div>
      <p>Giá trị hiện tại: {state.count}</p>
      <button onClick={()=>dispatch({type:'increment'})}>Tăng</button>
      <button onClick={()=>dispatch({type:'decrement'})}>Giảm</button>
      <button onClick={()=>dispatch({type:'reset'})}>Reset</button>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <DemoState></DemoState>
      <DemoEffect></DemoEffect>
      <DemoContext></DemoContext>
      <DemoRef></DemoRef>
      <DemoMemo></DemoMemo>
      <DemoReducer></DemoReducer>
    </div>
  );
}

export default App;