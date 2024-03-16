/* eslint-disable prettier/prettier */
import {
  tripStatusesBorderColor,
  tripStatusesColor,
} from "@/global/transportation/tripStatusColors";
export default function requestMarker(status, disableAnimation?: boolean) {
  return `
  <svg id="mePin" width="252" height="280"  viewBox="0 0 252 280" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="${status == "Waiting" && !disableAnimation ? "bounceInDown" : ""
    }" d="M60.7369 161.639C37.3642 129.687 40.7724 85.467 68.7652 57.4741C100.117 26.1227 150.948 26.1227 182.299 57.4742C210.292 85.467 213.7 129.687 190.328 161.639L129.165 245.253C127.367 247.71 123.698 247.71 121.901 245.253L60.7369 161.639Z" fill="${tripStatusesColor(
      status
    )}" stroke="${tripStatusesBorderColor(status)}"/>
<path  class="${status == "Waiting" && !disableAnimation ? "ring_outer" : ""
    }" fill-rule="evenodd" clip-rule="evenodd" d="M101.478 230.432C68.6443 233.824 45 243.342 45 254.553C45 268.607 82.1604 280 128 280C173.84 280 211 268.607 211 254.553C211 242.822 185.111 232.945 149.896 230L144.293 237.611C159.97 238.598 173.801 240.975 184.345 244.207C191.429 246.379 196.579 248.803 199.782 251.125C202.532 253.118 202.937 254.324 202.993 254.553C202.937 254.781 202.532 255.988 199.782 257.981C196.579 260.303 191.429 262.726 184.345 264.898C170.275 269.212 150.353 272 128 272C105.647 272 85.7247 269.212 71.6552 264.898C64.5711 262.726 59.4209 260.303 56.2178 257.981C53.4683 255.988 53.0626 254.781 53.007 254.553C53.0626 254.324 53.4683 253.118 56.2178 251.125C59.4209 248.803 64.5711 246.379 71.6552 244.207C81.1337 241.301 93.2686 239.087 107.013 237.952L101.478 230.432ZM113.902 247.309C90.949 248.103 73.8194 251.22 73.8194 254.944C73.8194 259.268 96.9156 262.774 125.406 262.774C153.897 262.774 176.993 259.268 176.993 254.944C176.993 251.233 159.981 248.124 137.148 247.318L129.085 258.271C127.12 260.939 123.935 260.939 121.971 258.271L113.902 247.309Z" fill="${tripStatusesBorderColor(
      status
    )}"/>
<circle class="${status == "Waiting" && !disableAnimation ? "bounceInDown" : ""
    }" cx="126" cy="116" r="49.5" fill="white" stroke="${tripStatusesBorderColor(
      status
    )}"/>
</svg>

  `;
}
