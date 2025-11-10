export const colorList = [
  "text-yellow-500",
  "text-green-600",
  "text-blue-600",
  "text-yellow-600",
  "text-purple-600",
  "text-pink-600",
  "text-indigo-600",
  "text-orange-600",
  "text-teal-600",
  "text-emerald-600",
];

export const getCategoryColor = (category: string): string => {
  if (!category) return "text-gray-600";
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colorList.length;
  return colorList[index];
};
