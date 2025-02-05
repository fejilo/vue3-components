import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LayoutView from '@/views/examples/LayoutView';
import FormView from '@/views/examples/FormView';
import TableView from '@/views/examples/TableView';
import DropdownView from '@/views/examples/DropdownView';
import ModalView from '@/views/examples/ModalView';
import FileListView from '@/views/examples/FileListView';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/layout',
    name: 'layout',
    component: LayoutView,
  },
  {
    path: '/form',
    name: 'form',
    component: FormView,
  },
  {
    path: '/table',
    name: 'table',
    component: TableView,
  },
  {
    path: '/dropdown',
    name: 'dropdown',
    component: DropdownView,
  },
  {
    path: '/modal',
    name: 'modal',
    component: ModalView,
  },
  {
    path: '/file-list',
    name: 'file',
    component: FileListView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
