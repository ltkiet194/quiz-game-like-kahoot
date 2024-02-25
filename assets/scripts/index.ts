class Person {
    private name: string;
    private age: number;

    constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    }

    public printInfo(): void {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
}

// Tạo một đối tượng từ lớp Person
const person1 = new Person("John Doe", 25);

person1.printInfo();