export const mockGames = [
  {
    id: 1,
    name: "The Witcher 3: Wild Hunt",
    background_image: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    metacritic: 92,
    parent_platforms: [
      { platform: { id: 1, name: "PC", slug: "pc" } },
      { platform: { id: 2, name: "PlayStation", slug: "playstation" } },
      { platform: { id: 3, name: "Xbox", slug: "xbox" } },
    ],
    rating_top: 5,
  },
  {
    id: 2,
    name: "Grand Theft Auto V",
    background_image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
    metacritic: 97,
    parent_platforms: [
      { platform: { id: 1, name: "PC", slug: "pc" } },
      { platform: { id: 2, name: "PlayStation", slug: "playstation" } },
      { platform: { id: 3, name: "Xbox", slug: "xbox" } },
    ],
    rating_top: 5,
  },
];

export const mockGenres = [
  { id: 4, name: "Action", slug: "action", image_background: "https://example.com/action.jpg" },
  { id: 51, name: "Indie", slug: "indie", image_background: "https://example.com/indie.jpg" },
  { id: 3, name: "Adventure", slug: "adventure", image_background: "https://example.com/adventure.jpg" },
  { id: 5, name: "RPG", slug: "role-playing-games-rpg", image_background: "https://example.com/rpg.jpg" },
];

export const mockPlatforms = [
  { id: 1, name: "PC", slug: "pc" },
  { id: 2, name: "PlayStation 5", slug: "playstation5" },
  { id: 3, name: "Xbox One", slug: "xbox-one" },
  { id: 4, name: "Nintendo Switch", slug: "nintendo-switch" },
];
