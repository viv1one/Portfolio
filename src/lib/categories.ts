export const categories = ["AI", "Web Development", "IoT", "Education", "Blockchain"] as const;

export type Category = typeof categories[number];