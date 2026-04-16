import { defineType, defineField } from "sanity";
import { TextIcon } from "@sanity/icons";

export const richTextType = defineType({
  name: "richText",
  title: "Rich Text Content",
  type: "object",
  icon: TextIcon,
  fields: [
    defineField({
      name: "body",
      type: "blockContent",
      title: "Body Content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alignment",
      type: "string",
      title: "Alignment",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
        ],
        layout: "radio",
      },
      initialValue: "left",
    }),
  ],
  preview: {
    select: {
      body: "body",
    },
    prepare({ body }: { body?: Array<{ _type: string; children?: Array<{ _type: string; text?: string }> }> }) {
      const block = (body || []).find((b) => b._type === "block");
      return {
        title: "Rich Text Content",
        subtitle: block
          ? block.children
              ?.filter((child) => child._type === "span")
              .map((span) => span.text)
              .join("")
          : "No content",
      };
    },
  },
});
