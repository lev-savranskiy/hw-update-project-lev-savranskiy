class CardList {
// el - DOM-элемент — контейнер, куда нужно складывать карточки;
// list - массив карточек, которые будут на странице при загрузке.
    constructor(el, list) {
        this.el = el;
        this.initialCards = list;
        console.info('CardList constructor')
    }

    // addCard для добавления карточки в список;
    addCard(options) {
        this.el.appendChild(new Card(options).create());
    }
    // render для отрисовки карточек при загрузке страницы
    render () {
        this.initialCards.forEach((options) => {
            this.addCard(options);
        })
    }
}

