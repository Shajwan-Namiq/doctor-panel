import LightImage from "/src/static/images/map/lightStreet.png";
import DarkStreetImage from "/src/static/images/map/darkStreet.png";
import SatelllteImage from "/src/static/images/map/satellte.png";
import NavigationImage from "/src/static/images/map/navigation.png";

export const mapType = [
  {
    name: "kubak",
    url: "https://tiles.{s}.kubak.co/styles/bright/{z}/{x}/{y}.png",
    image: LightImage,
  },
  {
    name: "darkStreet",
    url: "https://api.mapbox.com/styles/v1/bnar98/cl9lc1c48000a14sbnu782hfq/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYm5hcjk4IiwiYSI6ImNsMXg4b2dqejAwYnMzam1rbTMwcm92MWMifQ.iMLMmdcJpStBNXCOHSWE2A",
    image: DarkStreetImage,
  },
  {
    name: "Satellte",
    url: "https://api.mapbox.com/styles/v1/bnar98/cldlcvouf003101mluoevi8fr/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYm5hcjk4IiwiYSI6ImNsMXg4b2dqejAwYnMzam1rbTMwcm92MWMifQ.iMLMmdcJpStBNXCOHSWE2A",
    image: SatelllteImage,
  },
  {
    name: "Navigation",
    url: "https://api.mapbox.com/styles/v1/bnar98/cldlcxlfx003s01rn0duohub4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYm5hcjk4IiwiYSI6ImNsMXg4b2dqejAwYnMzam1rbTMwcm92MWMifQ.iMLMmdcJpStBNXCOHSWE2A",
    image: NavigationImage,
  },
];
