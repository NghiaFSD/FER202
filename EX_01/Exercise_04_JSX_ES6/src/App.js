import { useState } from "react";
import { ages, companies, numbers, people, person } from "./data";
import {
  collectValues,
  createCounter,
  getQueryParams,
  getRandomNumber,
  Rectangle,
  sumNumbers,
  Triangle
} from "./utils";

const counter = createCounter();

function App() {
  const [promiseResult, setPromiseResult] = useState("Chưa chạy");
  const [counterValue, setCounterValue] = useState(null);

  const isTeenager = ({ age }) => age >= 10 && age <= 20;
  const firstTeenager = people.find(isTeenager);
  const allTeenagers = people.filter(isTeenager);
  const everyPersonIsTeenager = people.every(isTeenager);
  const anyPersonIsTeenager = people.some(isTeenager);

  const numberSum = numbers.reduce((sum, number) => sum + number, 0);
  const numberProduct = numbers.reduce((product, number) => product * number, 1);

  const startedAfter1987 = companies.filter((company) => company.start > 1987);
  const retailCompanies = companies
    .filter((company) => company.category === "Retail")
    .map((company) => ({ ...company, start: company.start + 1 }));
  const companiesByEnd = [...companies].sort((a, b) => a.end - b.end);
  const agesDescending = [...ages].sort((a, b) => b - a);
  const ageSum = ages.reduce((sum, age) => sum + age, 0);

  const { name, category } = companies[0];
  const companyObject = {
    name,
    category,
    print() {
      return this.name;
    }
  };

  const {
    address: { street }
  } = person;

  const rectangle = new Rectangle(4, 5);
  const triangle = new Triangle(6, 3);
  const queryObject = getQueryParams("https://example.com?page=2&course=FER202");

  const runPromise = () => {
    setPromiseResult("Đang xử lý...");
    getRandomNumber()
      .then((number) => setPromiseResult(`Thành công: ${number} > 5`))
      .catch((error) => setPromiseResult(error.message));
  };

  return (
    <main>
      <h1>Hello <span>React</span></h1>
      <div className="react-symbol">⚛</div>
      <p>This is the React logo.</p>

      <nav>
        <a href="#home">Home</a>
        <a href="#sports">Sports</a>
        <a href="#contact">Contact</a>
        <a href="#login">Login</a>
      </nav>

      <h2>This is JSX</h2>
      <h2>Course names</h2>
      <ul>
        <li>React</li>
        <li>ReactNative</li>
        <li>Node.Js</li>
      </ul>

      <hr />
      <h2>1. People</h2>
      <p>Người tuổi teen đầu tiên: {firstTeenager.name} - {firstTeenager.age}</p>
      <p>Tất cả người tuổi teen: {allTeenagers.map((item) => item.name).join(", ")}</p>
      <p>Mọi người đều là tuổi teen: {String(everyPersonIsTeenager)}</p>
      <p>Có ít nhất một người tuổi teen: {String(anyPersonIsTeenager)}</p>

      <h2>2. Reduce và arrow function</h2>
      <p>Mảng: {numbers.join(", ")}</p>
      <p>Tổng: {numberSum}</p>
      <p>Tích: {numberProduct}</p>

      <h2>3. Companies, ages và ES6</h2>
      <h3>Tên tất cả công ty (forEach)</h3>
      <ul>
        {(() => {
          const names = [];
          companies.forEach((company) => names.push(<li key={company.name}>{company.name}</li>));
          return names;
        })()}
      </ul>

      <h3>Công ty bắt đầu sau năm 1987</h3>
      <p>{startedAfter1987.map((company) => company.name).join(", ")}</p>

      <h3>Công ty Retail (start + 1)</h3>
      {retailCompanies.map((company) => (
        <div key={company.name} className="company">
          <p>Name: {company.name}</p>
          <p>Category: {company.category}</p>
          <p>Start: {company.start}</p>
          <p>End: {company.end}</p>
        </div>
      ))}

      <p>Công ty sắp xếp theo năm kết thúc tăng dần:</p>
      <ol>{companiesByEnd.map((company) => <li key={company.name}>{company.name} - {company.end}</li>)}</ol>
      <p>Tuổi giảm dần: {agesDescending.join(", ")}</p>
      <p>Tổng tất cả tuổi: {ageSum}</p>
      <p>Object mới: {companyObject.print()} - {companyObject.category}</p>
      <p>Hàm tổng rest parameter: {sumNumbers(1, 2, 3, 4, 5)}</p>
      <p>Gộp đối số và mảng: {collectValues(1, [2, 3], "React", [4, 5]).join(", ")}</p>
      <p>Street destructuring: {street}</p>
      <p>Query parameters: {JSON.stringify(queryObject)}</p>

      <button onClick={() => setCounterValue(counter())}>Gọi counter</button>
      <p>Giá trị counter: {counterValue === null ? "Chưa gọi" : counterValue}</p>

      <h2>4. Classes</h2>
      <p>{rectangle.toString()} - Area: {rectangle.getArea()}</p>
      <p>{triangle.toString()} - Area: {triangle.getArea()}</p>

      <h2>5. Promise</h2>
      <button onClick={runPromise}>Tạo số ngẫu nhiên</button>
      <p>Kết quả: {promiseResult}</p>
    </main>
  );
}

export default App;
