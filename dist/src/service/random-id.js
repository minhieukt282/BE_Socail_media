"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomId = void 0;
class RandomId {
    constructor() {
        this.random = () => {
            let today = new Date();
            let time = today.getTime() * Math.floor(Math.random() * 1000);
            return time;
        };
        this.today = () => {
            let today = new Date();
            let day = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDay()}`;
            return day;
        };
    }
}
exports.RandomId = RandomId;
//# sourceMappingURL=random-id.js.map