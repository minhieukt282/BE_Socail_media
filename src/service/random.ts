export class Random {
    today = new Date()

    randomNumber = (): number => {
        return this.today.getTime() * (Math.floor(Math.random() * 100) + 1)
    }

    getTime = (): string => {
        return `${this.today.getFullYear()}-${this.today.getMonth() + 1}-${this.today.getDate()} ${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getSeconds()}`
    }
}
