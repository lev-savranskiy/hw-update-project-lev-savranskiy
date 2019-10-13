class Form {
    constructor(options) {
        this.el = options.el;
        this.submitEl = options.submitEl;
        this.inputs = options.inputs;
        this.cb = options.cb;
        console.info('Form constructor')
    }

    // render для отрисовки inputs
    render () {
        this.inputs.forEach((i) => {
            this.el.appendChild(i.input);
            this.el.appendChild(i.error);
            i.input.addEventListener("input",  (event) => {
                this.validateInput(event, i);
            });
        });
        this.submitEl.addEventListener("click",  () => {
            this.valid && this.cb();
        });
        return this;
    }

    validateInput(event, input) {
        const target = event && event.target;
        if (target) {
            const fn = target.validation && target.validation[0] && this[target.validation[0]];
            if (fn) {
                input.error.innerText = fn(target.value, target.validation[1], target.validation[2]);
            } else {
                input.error.innerText = 'validation error: ' + target.validation.toString();
            }
            this.validate();
        }
    }

    validate(){
        let errors = "";
        this.inputs.forEach((input) => {
            errors += input.error.innerHTML;
        });
        this.valid = errors.length === 0;
        this.submitEl.classList.remove("popup__button_enable");
        if (this.valid){
            this.submitEl.classList.add("popup__button_enable");
        }
    }

    validateLenghtStr (str, min, max) {
        if(str.length === 0) {
            return "Это обязательное поле";
        }
        if(str.length >= min && str.length <= max) {
            return "";
        }
        return `Должно быть от ${min} до ${max} символов`;
    }

    validateURL(str) {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str) ? "" : "Здесь должна быть ссылка";
    }

}

