import { mongoose } from "mongoose";

const { Schema } = mongoose;

const snippetSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: [3, "That's too short"],
  },
});

export const models = [
  {
    name: "Snippet",
    schema: snippetSchema,
    collection: "snippets",
  },
];
