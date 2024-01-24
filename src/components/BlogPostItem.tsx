import { z } from "zod";
import { urlForImage } from "../../sanity/lib/image";

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
    // <a href={url}>
    //   <div className="flex h-36 w-1/2 flex-col gap-3 rounded-[0rem_5rem_5rem_0rem] bg-[#FFF1DF] p-5 shadow-[rgba(0,0,0,0.2)_0.5rem_0.5rem]">
    //     <h1 className=" text-2xl font-bold">{title}</h1>
    //     <h2 className="line-clamp-2 pl-3">{summary}</h2>
    //   </div>
    // </a>
    <a
      href={"/blog/" + url}
      className="group flex h-36 w-1/2 flex-col gap-3 rounded-[0rem_5rem_5rem_0rem] bg-[#FFF1DF] p-5 shadow-[rgba(0,0,0,0.2)_0.5rem_0.5rem] transition-all hover:w-2/3 hover:pl-24"
    >
      {mainImage && (
        <img
          src={urlForImage(mainImage)}
          className="pointer-events-none fixed left-0 top-0 z-[-1] h-screen w-screen object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
        />
      )}

      <h1 className="text-2xl font-bold text-[#592407]">{title}</h1>
      <h2 className="line-clamp-2 pr-16">{summary}</h2>
    </a>
  );
};

export default BlogPostItem;
