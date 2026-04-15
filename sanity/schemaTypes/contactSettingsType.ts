import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const contactSettingsType = defineType({
  name: "contactSettings",
  title: "Contact Form Settings",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "nameLabel",
      title: "Name Label",
      type: "string",
      initialValue: "Name",
    }),
    defineField({
      name: "namePlaceholder",
      title: "Name Placeholder",
      type: "string",
      initialValue: "Your name",
    }),
    defineField({
      name: "emailLabel",
      title: "Email Label",
      type: "string",
      initialValue: "Email",
    }),
    defineField({
      name: "emailPlaceholder",
      title: "Email Placeholder",
      type: "string",
      initialValue: "Your email",
    }),
    defineField({
      name: "messageLabel",
      title: "Message Label",
      type: "string",
      initialValue: "Message",
    }),
    defineField({
      name: "messagePlaceholder",
      title: "Message Placeholder",
      type: "string",
      initialValue: "Tell us more...",
    }),
    defineField({
      name: "submitButtonLabel",
      title: "Submit Button Label",
      type: "string",
      initialValue: "Send Message",
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "string",
      initialValue: "Thank you! Your message has been sent.",
    }),
    defineField({
      name: "errorMessage",
      title: "Error Message",
      type: "string",
      initialValue: "Something went wrong. Please try again.",
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
      language: "language",
    },
    prepare({ language }) {
      return {
        title: "Contact Form Settings",
        subtitle: language ? `Language: ${language}` : "No language set",
      };
    },
  },
});
