class App {
    constructor(options) {
        this.cardList = new CardList(document.querySelector('.places-list'), initialCards);
        this.toggleFormAdd =  this.toggleFormAdd.bind(this);
        this.openProfile =  this.openProfile.bind(this);
    }

    start() {
        document.querySelector(".user-info__edit").addEventListener("click", this.openProfile);
        document.querySelector(".user-info__button").addEventListener("click", this.toggleFormAdd);
        this.cardList.render();
    }

    toggleFormAdd() {

        const tpl = `<div class="popup__content">
                    <img src="./images/close.svg" alt="" class="popup__close">
                    <h3 class="popup__title">Новое место</h3>
                    <form class="popup__form" id="form"></form>
                    <button class="button popup__button">+</button>
                </div>`;

        let input1 = new InputField({
            classList: ["popup__input", "popup__input_type_name"],
            classListError: ["popup__input-error"],
            name: "name",
            placeholder: "Название",
            validation: ['validateLenghtStr', 2, 32]
        });
        let input2 = new InputField({
            classList: ["popup__input", "popup__input_type_link-url"],
            classListError: ["popup__input-error"],
            name: "link",
            placeholder: "Ссылка на картинку",
            validation: ['validateURL']
        });

        const popup = new Popup({innerHTML: tpl}).open();
        new Form({
            el: document.getElementById('form'),
            submitEl: document.querySelector(".popup__button"),
            inputs: [input1, input2],
            cb: () => {
                this.cardList.addCard(  {
                    name: input1.input.value,
                    link: input2.input.value
                });
                popup.close();
            }
        }).render();

    }


    openProfile() {
        const userInfoName = document.querySelector('.user-info__name');
        const userInfoJob = document.querySelector('.user-info__job');
        const tpl = `<div class="popup__content">
                    <img src="./images/close.svg" alt="" class="popup__close">
                     <h3 class="popup__title">Редактировать профиль</h3>
                    <form class="popup__form" id="form"></form>
                    <button class="button popup__button popup__button_text18">Сохранить</button>
                </div>`;

        let input1 = new InputField({
            classList: ["popup__input"],
            classListError: ["popup__input-error"],
            name: "name",
            placeholder: "Имя",
            value: userInfoName.innerText,
            validation: ['validateLenghtStr', 2, 32]
        });
        let input2 = new InputField({
            classList: ["popup__input"],
            classListError: ["popup__input-error"],
            name: "job",
            placeholder: "О себе",
            value: userInfoJob.innerText,
            validation: ['validateLenghtStr', 2, 32]
        });
        const popup = new Popup({innerHTML: tpl}).open();
        new Form({
            el: document.getElementById('form'),
            submitEl: document.querySelector(".popup__button"),
            inputs: [input1, input2],
            cb: () => {
                userInfoName.innerText = input1.input.value;
                userInfoJob.innerText = input2.input.value;
                popup.close();
            }
        }).render().validate();

    }
}

