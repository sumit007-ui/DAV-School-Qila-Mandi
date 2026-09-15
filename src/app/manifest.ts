import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dr. MRS Bhalla DAV School Qilla Mandi, Batala",
    short_name: "DAV School",
    description:
      "Official portal of Dr. MRS Bhalla DAV School, Qilla Mandi, Batala (Punjab). Affiliated to PSEB Mohali.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F1DE",
    theme_color: "#800000",
    icons: [
      {
        src: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
