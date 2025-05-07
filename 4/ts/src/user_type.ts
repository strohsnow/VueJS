type UserType = {
    name: string;
    age: number;
    hello(): void;
};

class UserT implements UserType {
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

const user: UserType = new UserT("Max", 20);
user.hello();
