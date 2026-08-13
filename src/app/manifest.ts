import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PRIZM® — Creative Studio",
    short_name: "PRIZM",
    description:
      "PRIZM is a high-end creative studio crafting high-converting web experiences, cinematic 3D motion, performance ad creatives, and creator engines.",
    start_url: "/",
    display: "standalone",
    background_color: "#070708",
    theme_color: "#070708",
    icons: [
      {
        src: "/prizmfavicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/prizmfavicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
