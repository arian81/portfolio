import Image from "next/image";
import Link from "next/link";
import type { Image as SanityImage } from "sanity";
import { urlForImage } from "../../sanity/lib/image";

const ProjectGridItem = ({
  thumbnail,
  title,
  description,
  projectUrl,
}: {
  thumbnail: SanityImage;
  title: string;
  description: string;
  projectUrl: string;
}) => {
  return (
    <Link href={projectUrl}>
      <div className="relative">
        <div className="group absolute inset-0 z-10 flex items-center justify-center rounded-lg hover:bg-black hover:bg-opacity-50 hover:backdrop-blur-sm dark:hover:bg-white dark:hover:bg-opacity-60">
          <div className="hidden p-5 text-center group-hover:block">
            <h3 className="mb-2 font-bold text-white dark:text-black">
              {title}
            </h3>
            <p className="text-white dark:text-black">{description}</p>
          </div>
        </div>
        <Image
          src={urlForImage(thumbnail) || ""}
          className="rounded-lg"
          alt={title}
          width={400}
          height={300}
        />
      </div>
    </Link>
  );
};

export default ProjectGridItem;
