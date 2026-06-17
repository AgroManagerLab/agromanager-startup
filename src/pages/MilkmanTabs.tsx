import React from 'react';
import { HomeIcon, UsersIcon, HistoryIcon, UserIcon } from '../components/icons/Icon';
import type { TabItem } from '../components/TabBar';
import { MilkmanHomePage } from './MilkmanHome';
import { MilkmanListPage } from './MilkmanList';
import { MilkmanHistoryPage } from './MilkmanHistory';
import { createProfileTabs, PERFIL_SCREEN } from './createProfileTabs';

const TAB_ITEMS: TabItem[] = [
  { key: 'Hoje', label: 'Hoje', renderIcon: (c) => <HomeIcon size={24} color={c} /> },
  { key: 'Produtores', label: 'Produtores', renderIcon: (c) => <UsersIcon size={24} color={c} /> },
  { key: 'Historico', label: 'Histórico', renderIcon: (c) => <HistoryIcon size={24} color={c} /> },
  { key: 'Perfil', label: 'Perfil', renderIcon: (c) => <UserIcon size={24} color={c} /> },
];

export const MilkmanTabs = createProfileTabs(TAB_ITEMS, [
  ['Hoje', MilkmanHomePage],
  ['Produtores', MilkmanListPage],
  ['Historico', MilkmanHistoryPage],
  PERFIL_SCREEN,
]);
