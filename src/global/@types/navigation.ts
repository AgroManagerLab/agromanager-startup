// Tipos de navegação compartilhados (RootNavigator).
// Ver src/global/routes/RootNavigator.tsx

export type UserProfile = 'producer' | 'admin' | 'milkman';

export type RootStackParamList = {
  Login: undefined;
  Producer: undefined;
  Admin: undefined;
  Milkman: undefined;
};
