import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "hidden",
      title: "Hidden",
      type: "boolean",
      description: "Hide this post from the main blog listing",
      initialValue: false,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
      validation: (Rule) => Rule.required().max(150),
    }),
    // defineField({
    //   name: "body",
    //   title: "Body",
    //   type: "blockContent",
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: "body",
      title: "Body",
      type: "markdown",
      description: "A Github flavored markdown field with image uploading",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage",
      summary: "summary",
    },
    prepare(selection) {
      const { summary } = selection;
      return { ...selection, subtitle: summary };
    },
  },
  initialValue: {
    publishedAt: new Date().toISOString(),
  },
});
