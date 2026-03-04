export const getAvatarUrl = (name: string): string => {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    name
  )}`;
};

export const randomPrice = () => (Math.floor(Math.random() * 200) + 50) * 1000; // 50000 ~ 249000
export const randomDate = () =>
  new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString();
export const randomThumbnail = (id: number) =>
  `https://picsum.photos/seed/course${id}/200/120`;

export const decodeToken = (authHeader: string | null) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  const token = authHeader.replace('Bearer ', '');

  const match = token.match(/^valid-access-token-(\d+)$/);
  if (!match) return null;

  return { userId: Number(match[1]) };
};
