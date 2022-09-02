
class NotificationFilter extends SuperString {
    #string = "";
    constructor(string = "") {
        super({
            exist: [
                "Suscriptos",
                "Lectores",
                "Frecuentes",
                "Inactivos",
                "Todos",
            ],
        });
        if (string) this.set(string);
    }
    set(val) {
        if (this.validation(val)) {
            this.#string = val;
            return true;
        }
        throw new Error(`No se pudo setear el valor [${val}]`);
    }
    toString() {
        return this.#string;
    }
}
function $NotificationFilter(string = String("")) {
	return $Eval(NotificationFilter , string)
}