import { Cell, Checklist } from 'gxb-ui';
import 'gxb-ui/lib/css/cell.css';
import 'gxb-ui/lib/css/checklist.css';

export default {
    install (Vue, options) {
        Vue.component(Cell.name, Cell);
        Vue.component(Checklist.name, Checklist);
    }
};
