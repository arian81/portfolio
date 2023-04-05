import DevpostIcon from "~/logos/DevpostIcon";
import DiscordIcon from "~/logos/DiscordIcon";
import EmailIcon from "~/logos/EmailIcon";
import GithubIcon from "~/logos/GithubIcon";
import LinkedinIcon from "~/logos/LinkedinIcon";
import TwitterIcon from "~/logos/TwitterIcon";

const socialsData = [
  {
    link: "https://twitter.com/TheArian81",
    label: "Twitter",
    icon: <TwitterIcon className="stroke-[#592406] dark:stroke-[#ccc]" />,
  },
  {
    link: "https://github.com/arian81/",
    label: "Github",
    icon: <GithubIcon className="stroke-[#592406] dark:stroke-[#ccc]" />,
  },
  {
    link: "mailto:hello@arian.gg",
    label: "Email",
    icon: <EmailIcon className="stroke-[#592406] dark:stroke-[#ccc]" />,
  },
  {
    link: "https://devpost.com/arian81",
    label: "Devpost",
    icon: <DevpostIcon className="stroke-[#592406] dark:stroke-[#ccc]" />,
  },
  {
    link: "https://www.linkedin.com/in/arian81/",
    label: "Linkedin",
    icon: (
      <LinkedinIcon className="fill-[#592406] stroke-[#592406] dark:fill-[#ccc] dark:stroke-[#ccc]" />
    ),
  },
  {
    link: "https://discordapp.com/users/412279988541456387",
    label: "Discord",
    icon: (
      <DiscordIcon className="fill-[#592406] stroke-[#592406] dark:fill-[#ccc] dark:stroke-[#ccc]" />
    ),
  },
];

export default function Socials() {
  return (
    <div className="flex w-48 flex-wrap justify-center gap-5 md:h-20 md:w-5/12 md:flex-nowrap md:gap-8">
      {socialsData.map((social, index) => (
        <div
          key={index}
          className={`tooltip tooltip-${
            index % 2 === 0 ? "left" : "right"
          } tooltip-accent basis-1/3 dark:tooltip-secondary md:tooltip md:tooltip-accent`}
          data-tip={social.label}
        >
          <a href={social.link} aria-label={social.label}>
            {social.icon}
          </a>
        </div>
      ))}
    </div>
  );
}
