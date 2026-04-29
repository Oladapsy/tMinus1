import Onboarding1 from "@/assets/icons/onboarding/onboarding1.svg";
import Onboarding2 from "@/assets/icons/onboarding/onboarding2.svg";
import Onboarding3 from "@/assets/icons/onboarding/onboarding3.svg";

interface Slide {
  id: number;
  title: string;
  description: string;
  icon: React.FC<import("react-native-svg").SvgProps>;
}

export const onboardingSlides: Slide[] = [
  {
    id: 1,
    title: "Trade anytime anywhere",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    icon: Onboarding1,
  },
  {
    id: 2,
    title: "Save and invest at the same time",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    icon: Onboarding2,
  },
  {
    id: 3,
    title: "Transact fast and easy",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    icon: Onboarding3,
  },
];
