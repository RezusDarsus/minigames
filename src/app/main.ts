import { renderHomePage } from '../pages/home/home-page';
import '../styles/global.scss';
import '../styles/home.scss';

const rootElement: HTMLElement = document.createElement('div');
rootElement.id = 'app';
document.body.append(rootElement);

renderHomePage(rootElement);
