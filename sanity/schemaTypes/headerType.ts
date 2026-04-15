import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

export const headerType = defineType({
  name: "header",
  title: "Header",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "logoImage",
      title: "Logo Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logoAlt",
      title: "Logo Alt Text",
      type: "string",
      description: "Alternative text for the logo (e.g., 'Logo Devemite')",
      initialValue: "Logo",
    }),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "array",
      of: [
        {
          type: "object",
          name: "navItem",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "menuLabel",
      title: "Mobile Menu Label",
      type: "string",
      description: "Label for mobile menu button (e.g., 'Menu')",
      initialValue: "Menu",
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      media: "logoImage",
      language: "language",
    },
    prepare({ media, language }) {
      return {
        title: "Header Settings",
        subtitle: language ? `Language: ${language}` : "No language set",
        media: media,
      };
    },
  },
});
