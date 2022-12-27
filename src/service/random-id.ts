export class RandomId {
    random = (): number => {
        let today = new Date()
        return today.getTime() * Math.floor(Math.random() * 1000)
    }
    today = (): string => {
        let today = new Date()
        return `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDay()}`
    }
}
