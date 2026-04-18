export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  badge?: string;
}

export const collections: Collection[] = [
  {
    id: "eid",
    name: "Eid Collection",
    description:
      "Celebrate with elegance. Festive outfits for Eid ul Fitr & Eid ul Adha.",
    image: "/assets/generated/collection-eid.dim_600x700.jpg",
    productCount: 145,
    badge: "New Arrivals",
  },
  {
    id: "wedding",
    name: "Wedding & Formal",
    description:
      "From mehendi to walima — find your perfect bridal or formal ensemble.",
    image: "/assets/generated/collection-wedding.dim_600x700.jpg",
    productCount: 230,
    badge: "Bestsellers",
  },
  {
    id: "daily",
    name: "Daily Wear",
    description: "Comfortable, stylish outfits for every day of the week.",
    image: "/assets/generated/collection-daily.dim_600x700.jpg",
    productCount: 318,
  },
  {
    id: "lawn",
    name: "Lawn / Summer",
    description:
      "Lightweight lawn prints to keep you cool and stylish all summer.",
    image: "/assets/generated/collection-lawn.dim_600x700.jpg",
    productCount: 267,
    badge: "Summer 2026",
  },
  {
    id: "winter",
    name: "Winter Wool",
    description: "Cozy wool and pashmina collections for the winter season.",
    image: "/assets/generated/collection-winter.dim_600x700.jpg",
    productCount: 89,
  },
  {
    id: "fusion",
    name: "Fusion Wear",
    description:
      "Where tradition meets modernity — Indo-Western styles for the bold.",
    image: "/assets/generated/collection-fusion.dim_600x700.jpg",
    productCount: 112,
    badge: "Trending",
  },
  {
    id: "plus-size",
    name: "Plus Size",
    description:
      "Beautiful fashion in sizes XL to 3XL — because style has no size limit.",
    image: "/assets/generated/collection-daily.dim_600x700.jpg",
    productCount: 95,
    badge: "Inclusive Sizing",
  },
];
