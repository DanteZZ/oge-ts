import { rootElement } from "../configs/document.conf";
import { OGE } from "../modules/oge/oge";
import { eventEmitter } from "../modules/eventEmmiter/eventEmmiter";

const App = new OGE();
App.setElement(rootElement);
const AppEM = new eventEmitter(App);