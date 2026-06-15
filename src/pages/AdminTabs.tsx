import React from 'react';
import { HomeIcon, UsersIcon, PlusIcon, SettingsIcon } from '../components/icons/Icon';
import type { TabItem } from '../components/TabBar';
import { AdminHomePage } from './AdminHome';
import { AdminProducerListPage } from './AdminProducerList';
import { AdminRegistrationsHubPage } from './AdminRegistrationsHub';
import { createProfileTabs, PERFIL_SCREEN } from './createProfileTabs';

const TAB_ITEMS: TabItem[] = [
  { key: 'Inicio', label: 'Início', renderIcon: (c) => <HomeIcon size={24} color={c} /> },
  { key: 'Produtores', label: 'Produtores', renderIcon: (c) => <UsersIcon size={24} color={c} /> },
  { key: 'Cadastros', label: 'Cadastros', renderIcon: (c) => <PlusIcon size={24} color={c} /> },
  { key: 'Perfil', label: 'Perfil', renderIcon: (c) => <SettingsIcon size={24} color={c} /> },
];

export const AdminTabs = createProfileTabs(TAB_ITEMS, [
  ['Inicio', AdminHomePage],
  ['Produtores', AdminProducerListPage],
  ['Cadastros', AdminRegistrationsHubPage],
  PERFIL_SCREEN,
]);
