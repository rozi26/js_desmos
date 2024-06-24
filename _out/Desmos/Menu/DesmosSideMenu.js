import { Action } from "../../General/Action.js";
import { ElementBox } from "./ElementBox.js";
export class DesmosSideMenu {
    constructor(div, displayer, refranceMeneger, calssifyers) {
        this.Div = div;
        this.Classifyers = calssifyers;
        this.Displayer = displayer;
        this.refranceMeneger = refranceMeneger;
        this.ELEMENTS = [];
        this.elementChangeAction = new Action();
        this.elementChangeAction.addFunc((elem) => this.onElementChange(elem));
        this.addElement();
        this.Classifyers.forEach(classifyer => classifyer.setRefrance(this.refranceMeneger));
    }
    addElement() {
        const elem = new ElementBox(this.elementChangeAction);
        this.ELEMENTS.push(elem);
        this.Div.appendChild(elem.getDiv());
    }
    onElementChange(element) {
        if (element.id.equalTo(this.ELEMENTS[this.ELEMENTS.length - 1].id))
            this.addElement();
        let text = element.text;
        for (let i = 0; i < this.Classifyers.length; i++) {
            const classifyer = this.Classifyers[i];
            const equalIdex = text.indexOf("=");
            let name;
            if (equalIdex < 1)
                name = "autoname" + ~~(Math.random() * 10000000);
            else {
                name = text.substring(0, equalIdex);
                text = text.substring(equalIdex + 1);
            }
            if (!classifyer.isValid(text))
                continue;
            element.changeElem(classifyer);
            this.Displayer.removeElement(element.id);
            this.Displayer.addElement(element.getElem());
            break;
        }
    }
}
//# sourceMappingURL=DesmosSideMenu.js.map