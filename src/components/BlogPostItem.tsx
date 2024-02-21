import { z } from "zod";
import { urlForImage } from "../../sanity/lib/image";
import Link from "next/link";

const BlogPostItemSchema = z.object({
  title: z.string(),
  url: z.string(),
  mainImage: z.any().nullable(),
  summary: z.string(),
});

type BlogPostItemProp = z.infer<typeof BlogPostItemSchema>;

const BlogPostItem: React.FC<BlogPostItemProp> = ({
  title,
  url,
  mainImage,
  summary,
}) => {
  return (
    <Link
      href={"/blog/" + url}
      className="flex flex-col gap-3 bg-[#FFF1DF] p-5 dark:bg-[rgba(255,241,215,0.8)] md:h-36 md:w-3/4 md:rounded-[0rem_5rem_5rem_0rem] md:shadow-[rgba(0,0,0,0.2)_0.5rem_0.5rem] md:transition-all md:hover:w-2/3 md:hover:pl-24  lg:w-1/2"
    >
      {/* {mainImage && (
        <img
          src={urlForImage(mainImage)}
          className="pointer-events-none fixed left-0 top-0 z-[-3] h-screen w-screen object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
        />
      )} */}

      <h1 className="font-bold text-[#592407] dark:text-black md:text-xl">
        {title}
      </h1>
      <h2 className="text-ellipsis text-sm md:pr-16">{summary}</h2>
    </Link>
  );
};

export default BlogPostItem;
