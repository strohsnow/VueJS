// 1. Adapter Pattern

// Целевой интерфейс, который ожидают клиенты
interface IPayment {
    processPayment(amount: number): void;
}

// Существующий (legacy) класс, который мы хотим адаптировать
class OldPaymentProcessor {
    public pay(amount: number): void {
        console.log(`Paid ${amount} with legacy processor.`);
    }
}

// Адаптер, приводящий OldPaymentProcessor к интерфейсу IPayment
class PaymentAdapter implements IPayment {
    private legacy: OldPaymentProcessor;

    constructor(legacy: OldPaymentProcessor) {
        this.legacy = legacy;
    }

    public processPayment(amount: number): void {
        this.legacy.pay(amount);
    }
}

// Пример использования Adapter
const legacyProcessor = new OldPaymentProcessor();
const payment: IPayment = new PaymentAdapter(legacyProcessor);
payment.processPayment(100);

// 2. Strategy Pattern

// Интерфейс стратегии оплаты
interface PaymentStrategy {
    pay(amount: number): void;
}

// Реализация стратегии кредитной картой
class CreditCardStrategy implements PaymentStrategy {
    private card_number: string;

    constructor(card_number: string) {
        this.card_number = card_number;
    }

    public pay(amount: number): void {
        console.log(`Paid ${amount} using credit card ${this.card_number}.`);
    }
}

// Реализация стратегии PayPal
class PaypalStrategy implements PaymentStrategy {
    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    public pay(amount: number): void {
        console.log(`Paid ${amount} using PayPal account ${this.email}.`);
    }
}

// Контекст, использующий стратегию
class ShoppingCart {
    private strategy: PaymentStrategy;

    constructor(strategy: PaymentStrategy) {
        this.strategy = strategy;
    }

    public set_strategy(strategy: PaymentStrategy): void {
        this.strategy = strategy;
    }

    public checkout(amount: number): void {
        this.strategy.pay(amount);
    }
}

const cart = new ShoppingCart(new CreditCardStrategy("1234-5678-9012-3456"));
cart.checkout(250);
cart.set_strategy(new PaypalStrategy("user@example.com"));
cart.checkout(75);

// 3. Observer Pattern

// Интерфейс наблюдателя
interface Observer<T> {
    update(data: T): void;
}

// Интерфейс субъекта
interface Subject<T> {
    subscribe(observer: Observer<T>): void;
    unsubscribe(observer: Observer<T>): void;
    notify(data: T): void;
}

// Реализация Subject
class DataStore implements Subject<number> {
    private observers: Observer<number>[] = [];

    public subscribe(observer: Observer<number>): void {
        this.observers.push(observer);
    }

    public unsubscribe(observer: Observer<number>): void {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }

    public notify(data: number): void {
        for (const observer of this.observers) {
            observer.update(data);
        }
    }

    public set_data(value: number): void {
        console.log(`DataStore: new value = ${value}`);
        this.notify(value);
    }
}

// Пример наблюдателя
class Logger implements Observer<number> {
    public update(data: number): void {
        console.log(`Logger: observed new data = ${data}`);
    }
}

class Analytics implements Observer<number> {
    public update(data: number): void {
        console.log(`Analytics: processing data = ${data * 2}`);
    }
}

const store = new DataStore();
const logger = new Logger();
const analytics = new Analytics();
store.subscribe(logger);
store.subscribe(analytics);
store.set_data(42);
