import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "priority",
      title: "Priority",
      type: "number",
      description: "Priority of this project (higher numbers appear first)",
      validation: (Rule) => Rule.required().min(0).precision(0),
      initialValue: async (_, context) => {
        // Query for existing projects and get the count
        const client = context.getClient({ apiVersion: "2023-05-03" });
        const existingDocs = await client.fetch(`count(*[_type == "project"])`);
        // New projects get added to the end of the list by default
        return existingDocs;
      },
    }),
    defineField({
      name: "project_url",
      title: "Project Url",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "reference", to: { type: "technology" } }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Priority",
      name: "priorityOrder",
      by: [{ field: "priority", direction: "asc" }],
    },
    {
      title: "Title",
      name: "title",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
