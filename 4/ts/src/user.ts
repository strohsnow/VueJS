interface IUser {
    name: string;
    age: number;
    hello(): void;
}

class User implements IUser {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    public hello(): void {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}

const user_t: IUser = new User("Max", 20);
user_t.hello();
