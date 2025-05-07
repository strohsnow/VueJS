"use strict";
// 1. Adapter Pattern
// Существующий (legacy) класс, который мы хотим адаптировать
class OldPaymentProcessor {
    pay(amount) {
        console.log(`Paid ${amount} with legacy processor.`);
    }
}
// Адаптер, приводящий OldPaymentProcessor к интерфейсу IPayment
class PaymentAdapter {
    constructor(legacy) {
        this.legacy = legacy;
    }
    processPayment(amount) {
        this.legacy.pay(amount);
    }
}
// Пример использования Adapter
const legacyProcessor = new OldPaymentProcessor();
const payment = new PaymentAdapter(legacyProcessor);
payment.processPayment(100);
// Реализация стратегии кредитной картой
class CreditCardStrategy {
    constructor(card_number) {
        this.card_number = card_number;
    }
    pay(amount) {
        console.log(`Paid ${amount} using credit card ${this.card_number}.`);
    }
}
// Реализация стратегии PayPal
class PaypalStrategy {
    constructor(email) {
        this.email = email;
    }
    pay(amount) {
        console.log(`Paid ${amount} using PayPal account ${this.email}.`);
    }
}
// Контекст, использующий стратегию
class ShoppingCart {
    constructor(strategy) {
        this.strategy = strategy;
    }
    set_strategy(strategy) {
        this.strategy = strategy;
    }
    checkout(amount) {
        this.strategy.pay(amount);
    }
}
const cart = new ShoppingCart(new CreditCardStrategy("1234-5678-9012-3456"));
cart.checkout(250);
cart.set_strategy(new PaypalStrategy("user@example.com"));
cart.checkout(75);
// Реализация Subject
class DataStore {
    constructor() {
        this.observers = [];
    }
    subscribe(observer) {
        this.observers.push(observer);
    }
    unsubscribe(observer) {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }
    notify(data) {
        for (const observer of this.observers) {
            observer.update(data);
        }
    }
    set_data(value) {
        console.log(`DataStore: new value = ${value}`);
        this.notify(value);
    }
}
// Пример наблюдателя
class Logger {
    update(data) {
        console.log(`Logger: observed new data = ${data}`);
    }
}
class Analytics {
    update(data) {
        console.log(`Analytics: processing data = ${data * 2}`);
    }
}
const store = new DataStore();
const logger = new Logger();
const analytics = new Analytics();
store.subscribe(logger);
store.subscribe(analytics);
store.set_data(42);
