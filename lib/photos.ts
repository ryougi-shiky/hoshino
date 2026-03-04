export interface Photo {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  tags: string[];
  /** Width in pixels of the original image (used for layout hints) */
  width: number;
  /** Height in pixels of the original image (used for layout hints) */
  height: number;
  /** Path under /public */
  src: string;
  /** Optional: path to a smaller placeholder */
  placeholder?: string;
  featured?: boolean;
}

const photos: Photo[] = [
  {
    id: "milky-way-mountains",
    title: "Milky Way over the Mountains",
    description:
      "A long-exposure capture of the Milky Way arc stretching over snow-capped peaks. The cold thin air at altitude makes the stars remarkably vivid.",
    location: "Rocky Mountains, Colorado, USA",
    date: "2024-08-15",
    tags: ["milky-way", "mountains", "astrophotography", "landscape"],
    width: 4000,
    height: 2667,
    src: "/images/milky-way-mountains.svg",
    featured: true,
  },
  {
    id: "aurora-borealis",
    title: "Dancing Aurora",
    description:
      "Green and violet ribbons of the Northern Lights shimmering above a frozen lake in Iceland. Shot at 2 AM during a geomagnetic storm.",
    location: "Þingvellir National Park, Iceland",
    date: "2024-02-10",
    tags: ["aurora", "northern-lights", "iceland", "astrophotography"],
    width: 3000,
    height: 4500,
    src: "/images/aurora-borealis.svg",
    featured: true,
  },
  {
    id: "star-trails-desert",
    title: "Star Trails over the Desert",
    description:
      "A composite of 300 frames to create circular star trails converging on Polaris. The warm desert glow contrasts beautifully with the cool star arcs.",
    location: "Sahara Desert, Morocco",
    date: "2023-11-22",
    tags: ["star-trails", "desert", "long-exposure", "astrophotography"],
    width: 5000,
    height: 3333,
    src: "/images/star-trails-desert.svg",
    featured: true,
  },
  {
    id: "moonrise-ocean",
    title: "Full Moon Rising",
    description:
      "The harvest moon climbing above the Pacific horizon, casting a golden path across the waves.",
    location: "Big Sur, California, USA",
    date: "2024-09-29",
    tags: ["moon", "ocean", "seascape", "landscape"],
    width: 3500,
    height: 5250,
    src: "/images/moonrise-ocean.svg",
  },
  {
    id: "nebula-wide",
    title: "Orion Nebula Wide Field",
    description:
      "The Orion constellation framing M42 (the Orion Nebula), captured with a wide-angle lens from a dark-sky reserve.",
    location: "NamibRand Nature Reserve, Namibia",
    date: "2024-05-03",
    tags: ["nebula", "orion", "deep-sky", "astrophotography"],
    width: 4500,
    height: 3000,
    src: "/images/nebula-wide.svg",
    featured: true,
  },
  {
    id: "perseid-meteor",
    title: "Perseid Meteor Shower",
    description:
      "A single brilliant Perseid fireball streaking across the Summer Triangle. A two-hour vigil rewarded with this fleeting moment.",
    location: "Bryce Canyon National Park, Utah, USA",
    date: "2024-08-12",
    tags: ["meteor", "perseid", "shooting-star", "astrophotography"],
    width: 3000,
    height: 2000,
    src: "/images/perseid-meteor.svg",
  },
  {
    id: "comet-night",
    title: "Comet at Dusk",
    description:
      "A rare comet visible to the naked eye glowing near the horizon just after sunset. Only visible for two weeks.",
    location: "Atacama Desert, Chile",
    date: "2023-07-04",
    tags: ["comet", "twilight", "astrophotography"],
    width: 4000,
    height: 5000,
    src: "/images/comet-night.svg",
  },
  {
    id: "zodiacal-light",
    title: "Zodiacal Light Pyramid",
    description:
      "The ghostly pyramid of zodiacal light rising from the western horizon after sunset — sunlight scattered by interplanetary dust.",
    location: "Atacama Desert, Chile",
    date: "2023-06-15",
    tags: ["zodiacal-light", "desert", "astrophotography"],
    width: 3000,
    height: 4000,
    src: "/images/zodiacal-light.svg",
  },
];

export default photos;

export function getAllPhotos(): Photo[] {
  return photos;
}

export function getFeaturedPhotos(): Photo[] {
  return photos.filter((p) => p.featured);
}

export function getPhotoById(id: string): Photo | undefined {
  return photos.find((p) => p.id === id);
}
