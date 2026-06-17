import React from 'react';
import { HomeIcon, HistoryIcon, UserIcon } from '../components/icons/Icon';
import type { TabItem } from '../components/TabBar';
import { ProducerHomePage } from './ProducerHome';
import { ProducerHistoryPage } from './ProducerHistory';
import { createProfileTabs, PERFIL_SCREEN } from './createProfileTabs';

const TAB_ITEMS: TabItem[] = [
  { key: 'Inicio', label: 'Início', renderIcon: (c) => <HomeIcon size={24} color={c} /> },
  { key: 'Historico', label: 'Histórico', renderIcon: (c) => <HistoryIcon size={24} color={c} /> },
  { key: 'Perfil', label: 'Perfil', renderIcon: (c) => <UserIcon size={24} color={c} /> },
];

export const ProducerTabs = createProfileTabs(TAB_ITEMS, [
  ['Inicio', ProducerHomePage],
  ['Historico', ProducerHistoryPage],
  PERFIL_SCREEN,
]);
