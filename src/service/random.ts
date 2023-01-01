export class Random {
    randomNumber = (): number => {
        let today = new Date()
        return today.getTime() * Math.floor(Math.random() * 1000)
    }
    randomTime = (): string => {
        let today = new Date()
        return `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}+`
    }
}
