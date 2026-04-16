import { defineField, defineType } from "sanity";
import { ControlsIcon } from "@sanity/icons";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: ControlsIcon,
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "homePage",
      type: "reference",
      to: [{ type: "page" }],
    }),
    defineField({
      name: "themeToggleLabel",
      title: "Theme Toggle Label",
      type: "string",
      description: "Aria label for theme toggle button (e.g., 'Toggle theme')",
      initialValue: "Toggle theme",
    }),
    defineField({
      name: "lightThemeLabel",
      title: "Light Theme Label",
      type: "string",
      description: "Label for light theme option (e.g., 'Light')",
      initialValue: "Light",
    }),
    defineField({
      name: "darkThemeLabel",
      title: "Dark Theme Label",
      type: "string",
      description: "Label for dark theme option (e.g., 'Dark')",
      initialValue: "Dark",
    }),
    defineField({
      name: "systemThemeLabel",
      title: "System Theme Label",
      type: "string",
      description: "Label for system theme option (e.g., 'System')",
      initialValue: "System",
    }),
    defineField({
      name: "breadcrumbHomeLabel",
      title: "Breadcrumb Home Label",
      type: "string",
      description: "Label for home in breadcrumbs (e.g., 'Home')",
      initialValue: "Home",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Default <title> tag for the site (used as layout-level fallback)",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "string",
      description: "Default meta description for the site (used as layout-level fallback)",
    }),
    defineField({
      name: "person",
      title: "Person (JSON-LD)",
      type: "object",
      description: "Structured data about you for Google's Person rich result",
      fields: [
        defineField({ name: "name", title: "Full Name", type: "string" }),
        defineField({ name: "jobTitle", title: "Job Title", type: "string" }),
        defineField({
          name: "sameAs",
          title: "Social / Profile URLs",
          description: "e.g. https://github.com/you, https://linkedin.com/in/you",
          type: "array",
          of: [{ type: "url" }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      language: "language",
    },
    prepare({ language }) {
      return {
        title: "Site Settings",
        subtitle: language ? `Language: ${language}` : "No language set",
      };
    },
  },
});