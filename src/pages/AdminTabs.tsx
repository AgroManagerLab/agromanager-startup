import React from 'react';
import { HomeIcon, UsersIcon, PlusIcon, SettingsIcon } from '../components';
import type { TabItem } from '../components';
import { AdminHomePage } from './AdminHome';
import { AdminListagemProdutoresPage } from './AdminListagemProdutores';
import { AdminCadastrosHubPage } from './AdminCadastrosHub';
import { createProfileTabs, PERFIL_SCREEN } from './createProfileTabs';

const TAB_ITEMS: TabItem[] = [
  { key: 'Inicio', label: 'Início', renderIcon: (c) => <HomeIcon size={24} color={c} /> },
  { key: 'Produtores', label: 'Produtores', renderIcon: (c) => <UsersIcon size={24} color={c} /> },
  { key: 'Cadastros', label: 'Cadastros', renderIcon: (c) => <PlusIcon size={24} color={c} /> },
  { key: 'Perfil', label: 'Perfil', renderIcon: (c) => <SettingsIcon size={24} color={c} /> },
];

export const AdminTabs = createProfileTabs(TAB_ITEMS, [
  ['Inicio', AdminHomePage],
  ['Produtores', AdminListagemProdutoresPage],
  ['Cadastros', AdminCadastrosHubPage],
  PERFIL_SCREEN,
]);
