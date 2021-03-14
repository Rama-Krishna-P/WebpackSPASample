import {LitElement, html} from "lit-element";

class LoginView extends LitElement {
    render() {
        return html`
            <h1>Login</h1>
        `
    }
}

customElements.define('login-view', LoginView);