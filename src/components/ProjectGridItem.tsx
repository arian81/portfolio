import Link from "next/link";
import { urlForImage } from "../../sanity/lib/image";

const ProjectGridItem = ({
  thumbnail,
  title,
  description,
  projectUrl,
}: {
  thumbnail: any;
  title: string;
  description: string;
  projectUrl: string;
}) => {
  return (
    <Link href={projectUrl}>
      <div className="relative">
        <div className="group absolute inset-0 z-10 flex items-center justify-center rounded-lg hover:bg-black hover:bg-opacity-50 hover:backdrop-blur-sm dark:hover:bg-white dark:hover:bg-opacity-60">
          <div className="hidden p-5 text-center group-hover:block">
            <p className="text-white dark:text-black">{description}</p>
          </div>
        </div>
        <img src={urlForImage(thumbnail)} className="rounded-lg" alt="" />
      </div>
    </Link>
  );
};

export default ProjectGridItem;
