class InputField {
    constructor(options) {
        console.info('InputField constructor');
        this.options = options;
        this.input = document.createElement('input');
        this.input.validation = this.options.validation;
        this.options.classList.forEach(cls => {
            this.input.classList.add(cls);
        });
        this.input.setAttribute('placeholder', this.options.placeholder);
        this.input.setAttribute('name', this.options.name);
        this.input.value = options.value || "";
        this.error = document.createElement("div");
        this.options.classListError.forEach(cls => {
            this.error.classList.add(cls);
        });
        this.error.setAttribute("aria-live", "polite");
    }
}

