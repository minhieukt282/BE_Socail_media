export class RandomId {
    random = () => {
        let today = new Date()
        let time = today.getTime()*Math.floor(Math.random() * 1000);
        return time
    }
    today = ()=>{
        let today = new Date()
        let day = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDay()}`
        return day
    }
}