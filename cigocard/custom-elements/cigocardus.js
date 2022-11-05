const template = document.createElement('template')

template.innerHTML = `
    <link rel="stylesheet" href="custom-elements/style.css">
    <div class="cigo-card">
        <div class="avatar">
            <img />
        </div>
        <div class="details">
            <h2></h2>
            <div class="info">
                <p class="breed"></p>
                <p class="age"></p>
                <p class="price"></p>
            </div>
            <div class="actions">
                <button id="greet">Köszönj!</button>
                <button id="toggle">Több</button>
            </div>
        </div>
    </div>
`

class CigoCard extends HTMLElement {
    constructor() {
        super();
        this.showInfo = false;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['name', 'avatar', 'breed', 'age', 'price']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.shadowRoot.querySelector('.details h2').textContent = this.getAttribute('name')
        this.shadowRoot.querySelector('.avatar img').src = this.getAttribute('avatar')
        this.shadowRoot.querySelector('.avatar img').alt = this.getAttribute('avatar')
        this.shadowRoot.querySelector('.info .breed').textContent = `Fajta: ${this.getAttribute('breed')}`
        this.shadowRoot.querySelector('.info .age').textContent = `Kor: ${this.getAttribute('age')}`
        this.shadowRoot.querySelector('.info .price').textContent = `Ár: ${this.getAttribute('price')}`
    }

    toggleInfo = () => {
        this.showInfo = !this.showInfo
        this.shadowRoot.querySelector('.info').style.display = this.showInfo ? 'block' : 'none'
        this.shadowRoot.querySelector('#toggle').textContent = this.showInfo ? 'Kevesebb' : 'Több'
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#toggle').addEventListener('click', this.toggleInfo)
        this.shadowRoot.querySelector('#greet').addEventListener('click', () => {
            alert(this.getAttribute('name') == 'Koszta Dani' ? `Köszöntél ${this.getAttribute('name')}nak, ezért megkéselt. Szar lehet.` : `Köszöntél ${this.getAttribute('name')}${this.getAttribute('name') == 'Horváth József' ? 'nek' : 'nak'}, ezért megkéselt.`)
        })
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector('#greet').removeEventListener('click', this.toggleInfo)
        this.shadowRoot.querySelector('#toggle').removeEventListener('click', () => {
            alert(this.getAttribute('name') == 'Koszta Dani' ? `Köszöntél ${this.getAttribute('name')}nak, ezért megkéselt. Szar lehet.` : `Köszöntél ${this.getAttribute('name')}${this.getAttribute('name') == 'Horváth József' ? 'nek' : 'nak'}, ezért megkéselt.`)
        })
    }
}

export default CigoCard;