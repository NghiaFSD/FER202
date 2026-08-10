export const sumNumbers = (...values) => values.reduce((sum, value) => sum + value, 0);

export const collectValues = (...values) => values.flat();

export const createCounter = () => {
  let value = 0;
  return () => value++;
};

export const getQueryParams = (url) => {
  const queryString = url.split("?")[1] || "";
  return Object.fromEntries(new URLSearchParams(queryString));
};

export class Shape {
  constructor(color = "black") {
    this.color = color;
  }

  getArea() {
    return 0;
  }

  toString() {
    return `Shape color: ${this.color}`;
  }
}

export class Rectangle extends Shape {
  constructor(width, length, color = "blue") {
    super(color);
    this.width = width;
    this.length = length;
  }

  getArea() {
    return this.width * this.length;
  }

  toString() {
    return `Rectangle ${this.width} x ${this.length}, color: ${this.color}`;
  }
}

export class Triangle extends Shape {
  constructor(base, height, color = "green") {
    super(color);
    this.base = base;
    this.height = height;
  }

  getArea() {
    return (this.base * this.height) / 2;
  }

  toString() {
    return `Triangle base: ${this.base}, height: ${this.height}, color: ${this.color}`;
  }
}

export const getRandomNumber = () =>
  new Promise((resolve, reject) => {
    const number = Math.floor(Math.random() * 10) + 1;
    setTimeout(() => {
      if (number > 5) resolve(number);
      else reject(new Error("Error"));
    }, 500);
  });
