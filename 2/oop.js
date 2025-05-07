function UserFunc(name, age, tel) {
    if (typeof age !== "number") {
        throw new Error("Age must be a number")
    }
    if (age < 0 || age > 100) {
        throw new Error("Age must be between 0 and 100");
    }

    const tel_regex = /^\+7\d{10}$/;
    if (!tel_regex.test(tel)) {
        throw new Error("Invalid phone number");
    }

    this._name = name;
    this._age = age;
    this._tel = tel;
}

UserFunc.prototype.hello = function() {
    console.log(`Hi! My name is ${this._name}. And I am ${this._age} years old.`)
}

class User {
    _name;
    _age;
    _tel;

    constructor(name, age, tel) {
        if (typeof age !== "number") {
            throw new Error("Age must be a number")
        }
        if (age < 0 || age > 100) {
            throw new Error("Age must be between 0 and 100");
        }

        const tel_regex = /^\+7\d{10}$/;
        if (!tel_regex.test(tel)) {
            throw new Error("Invalid phone number");
        }

        this._name = name;
        this._age = age;
        this._tel = tel;
    }

    get tel() {
        return this._tel;
    }

    set tel(tel) {
        const tel_regex = /^\+7\d{10}$/;
        if (!tel_regex.test(tel)) {
            throw new Error("Invalid phone number");
        }
        this._tel = tel;
    }

    get age() {
        return this._age;
    }

    set age(age) {
        if (typeof age !== "number") {
            throw new Error("Age must be a number")
        }
        if (age < 0 || age > 100) {
            throw new Error("Age must be between 0 and 100");
        }
        this._age = age;
    }

    hello() {
        console.log(`Hi! My name is ${this._name}. And I am ${this._age} years old.`)
    }
}

class Student extends User {
    #knowledge;

    constructor(name, age, tel) {
        super(name, age, tel);
        this.#knowledge = 0;
    }

    get knowledge() {
        return this.#knowledge;
    }

    hello() {
        console.log(`Hi! My name is ${this._name}. And I am ${this._age} years old. And I am a student!`);
    }

    learn() {
        this.#knowledge++;
    }
}

Array.prototype.reverse = function() {
    return this.concat(this);
}

let user = new UserFunc("Max", 20, "+71234567890");
user.hello();

user = new User("Max", 20, "+71234567890");
user.hello();
console.log(user.tel);
user.tel = "+70987654321";
console.log(user.tel);

let student = new Student("Max", 20, "+71234567890");
student.hello();
console.log(student.knowledge);
student.learn();
console.log(student.knowledge);

let arr = [1, 2, 3, 4, 5];
console.log(arr);
let rev = arr.reverse();
console.log(rev);
