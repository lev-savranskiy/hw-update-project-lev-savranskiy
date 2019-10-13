class Card {
    constructor(options) {
        this.data = options;
        this.cardEl = document.createElement("div");
        console.info('Card constructor')
    }

    // Method create
    create() {
        //making card element
        this.cardEl.classList.add("place-card");

        //image + handler
        const imgCard = document.createElement("div");
        imgCard.classList.add("place-card__image");
        imgCard.style.backgroundImage = `url(${this.data.link})`;
        imgCard.setAttribute('title', 'Просмотр картинки');
        imgCard.addEventListener("click", (event) => {
            this.toggleBigSizeImage();
            event.stopPropagation();
        });


        //icon delete + handler
        const btnDeleteCard = document.createElement("button");
        btnDeleteCard.classList.add("place-card__delete-icon");
        btnDeleteCard.addEventListener("click", (event) => {
            this.remove();
            event.stopPropagation();
        });

        // icon like + handler
        this.btnLike = document.createElement("button");
        this.btnLike.classList.add("place-card__like-icon");
        this.btnLike.addEventListener("click", (event) => {
            this.like();
            event.stopPropagation();
        });


        const descCard = document.createElement("div");
        descCard.classList.add("place-card__description");

        const h3Card = document.createElement("h3");
        h3Card.classList.add("place-card__name");
        h3Card.textContent = this.data.name;

        //merging DOM
        this.cardEl.appendChild(imgCard);
        this.cardEl.appendChild(descCard);
        imgCard.appendChild(btnDeleteCard);
        descCard.appendChild(h3Card);
        descCard.appendChild(this.btnLike);
        return this.cardEl;
    }

    // Method like
    like() {
        this.btnLike.classList.toggle("place-card__like-icon_liked");
    }

    // Method remove
    remove() {
        this.cardEl.parentNode.removeChild(this.cardEl);
    }

    // Method toggleBigSizeImage
    toggleBigSizeImage() {
        const tpl = `<div class="popup__content-image">
                        <img src="./images/close.svg" alt="Close" class="popup__close">
                        <img src="${this.data.link}"  alt="View Image" class="popup__image">
                    </div>`;
       new Popup({innerHTML: tpl}).open();
    }
}

