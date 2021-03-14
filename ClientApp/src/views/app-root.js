import { html } from "lit-element";
import { BaseView } from "./base-view";
import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { sampleModel } from "../models/sampleModel";
import { updateMessage } from "../redux/actions";

class AppRoot extends connect(store)(BaseView) {
    static get properties() {
        return {
            name: { type: String },
        }
    }

    stateChanged(state = sampleModel) {
        this.name = state.name;
    }

    changeMessage() {
        store.dispatch(updateMessage("Rama"));
    }

    render() {
        return html`
            <div>
                <h1>Hello ${this.name}</h1>
                <button @click="${e => this.changeMessage()}" class="btn-primary">Change message!</button>
            </div>
        `
    }
}

customElements.define('app-root', AppRoot);

