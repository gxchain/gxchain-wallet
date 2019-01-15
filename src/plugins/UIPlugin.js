import {Cell, Checklist, TabContainer, TabContainerItem, Switch} from 'gxb-ui';
import 'gxb-ui/lib/css/cell.css';
import 'gxb-ui/lib/css/checklist.css';
import 'gxb-ui/lib/css/tab-container.css';
import 'gxb-ui/lib/css/tab-item.css';
import 'gxb-ui/lib/css/switch.css';
import 'gxb-ui/lib/css/toast.css';

export default {
    install (Vue, options) {
        Vue.component(Cell.name, Cell);
        Vue.component(Checklist.name, Checklist);
        Vue.component(TabContainer.name, TabContainer);
        Vue.component(TabContainerItem.name, TabContainerItem);
        Vue.component(Switch.name, Switch);
    }
};
