import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

export const footerType = defineType({
  name: "footer",
  title: "Footer",
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
    }),
    defineField({
      name: "logoAlt",
      title: "Logo Alt Text",
      type: "string",
      description: "Alternative text for the logo (e.g., 'Logo Devemite')",
      initialValue: "Logo",
    }),
    defineField({
      name: "privacyPolicyLink",
      title: "Privacy Policy Link",
      type: "object",
      fields: [
        { name: "label", type: "string" },
        { name: "href", type: "string" },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            { name: "platform", type: "string", title: "Platform Name" },
            { name: "url", type: "string", title: "URL" },
            { 
              name: "iconImage", 
              type: "image", 
              title: "Icon Image",
              options: {
                hotspot: true,
              }
            },
          ],
        },
      ],
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description: "Copyright text with {year} placeholder for dynamic year (e.g., '© {year} Szymon Nawrocki - Devemite')",
      initialValue: "© {year} Szymon Nawrocki - Devemite",
    }),
  ],
  preview: {
    select: {
      media: "logoImage",
      language: "language",
    },
    prepare({ media, language }) {
      return {
        title: "Footer Settings",
        subtitle: language ? `Language: ${language}` : "No language set",
        media: media,
      };
    },
  },
});
