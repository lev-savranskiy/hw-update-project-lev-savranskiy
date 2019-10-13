class Popup {
    constructor(options) {
        this.innerHTML = options.innerHTML || 'No data';
        this.popup__close = options.popup__close || 'popup__close';
        this.popup__opener = options.popup__opener || 'popup_is-opened';
        this.popupEl = document.getElementById('popupEl');
        console.info('Popup constructor')
    }

    // Method
    open() {
        this.popupEl.innerHTML += this.innerHTML;
        this.popupEl.classList.add(this.popup__opener);
        document.addEventListener('click', (event) => {
            if (event.target && event.target.className === this.popup__close) {
                this.close();
            }
        });
        return this;
    }

    // Method
    close() {
        this.popupEl.innerHTML = '';
        this.popupEl.classList.remove(this.popup__opener);
        return this;
    }
}

