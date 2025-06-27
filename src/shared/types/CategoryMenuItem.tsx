export interface CategoryMenuItem {
  id: number;
  icon: React.ReactNode;
  path: string;
  parentPath: string;
  iconPath: string;
  label: string;
  isFavorite: boolean;
  gameType: string;
  isAvailable: number;
}

export interface GameProviderItem {
  gameProviderId: number;
  name: string;
  description: string;
  coverImage: string;
}