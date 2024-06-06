import { defineField, defineType } from "sanity";

export default defineType({
  name: "technology",
  title: "Technology",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      options: {
        accept: ".svg",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Url",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
