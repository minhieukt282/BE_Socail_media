import {RandomId} from "./random-id";

export class UserService {
    private randomId: RandomId

    constructor() {
        this.randomId = new RandomId()
    }

}