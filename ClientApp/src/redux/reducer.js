import { sampleModel } from "../models/sampleModel";
import { UPDATE_MESSAGE } from "./actions";

export const reducer = (state = sampleModel, action) => {
    switch (action.type) {
        case UPDATE_MESSAGE:
            return {
                ...state,
                name: action.message
            }
        default:
            return state
    }
}