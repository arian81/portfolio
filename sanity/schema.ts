import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./schemas/blockContent";
import category from "./schemas/category";
import post from "./schemas/post";
import project from "./schemas/project";
import technology from "./schemas/technology";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, category, project, blockContent, technology],
};
