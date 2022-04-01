import { mongoose } from "mongoose";

const { Schema } = mongoose;

const snippetSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: [3, "That's too short"],
  },
  lang: {
    type: String,
    required: true,
    minLength: [3, "That's too short"],
  },
  code: {
    type: String,
    required: true,
    minLength: [3, "That's too short"],
  },
  description: {
    type: String,
    required: true,
    minLength: [3, "That's too short"],
  },
  favorite: {
    type: Boolean,
    required: true
  }
});

export const models = [
  {
    name: "Snippet",
    schema: snippetSchema,
    collection: "snippets",
  },
];
