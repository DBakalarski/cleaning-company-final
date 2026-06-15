import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Register the React integration once for the whole app. Anim components import
// gsap/useGSAP from here so registration can never be forgotten or duplicated.
gsap.registerPlugin(useGSAP);

export { gsap, useGSAP };
