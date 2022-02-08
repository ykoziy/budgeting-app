import './style/style.scss';
import Controller from './controller/controller';
import Model from './model/model';
import View from './view/view';

console.log('hello world');
const app = new Controller(new Model(), new View());
