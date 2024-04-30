import { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/macro";
import { SystemIconsKeys } from "shared/constants/Icons";

export const DEMO_LINKS: {
  id: string;
  systemIcon: SystemIconsKeys;
  label: MessageDescriptor;
  description: string;
  link: string;
}[] = [
  {
    id: "github",
    systemIcon: "Github",
    label: msg`Star us on Github`,
    description: `Tell us DashPress is a useful project by dropping us a star`,
    link: "https://github.com/dashpresshq/dashpress",
  },
  {
    id: "twitter",
    systemIcon: "Twitter",
    label: msg`Follow us on Twitter`,
    description: `Tweet at @dashpressHQ if you know others will benefit using DashPress`,
    link: "https://twitter.com/dashpressHQ",
  },
  {
    id: "discord",
    systemIcon: "Discord",
    label: msg`Join our Discord community`,
    description: `Ask your questions here`,
    link: "https://discord.gg/aV6DxwXhzN",
  },
  {
    id: "website",
    systemIcon: "Link",
    label: msg`Visit our website`,
    description: `For more links on documentation, roadmap, blog etc`,
    link: "https://dashpress.io",
  },
];
