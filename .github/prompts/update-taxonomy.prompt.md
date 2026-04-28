Your task is to understand the existing taxonomy file and especially the possible properties of a taxonomy term. Read and understand the comments of each property, to use them correctly (read the complete `type TaxonomyData` including all its properties and their comments).

Especially understand the default if no `synonyms` are provided. Only specify `synonyms` if the default is insufficient.

Then add or modify the existing taxonomy terms as stated in the prompt. Make sure to update all related terms (related, parent, child, etc.) accordingly (read the `type InternalTagName` to get a compact overview of all existing terms).

Don't mind about the alphabetical order, the linter will do this automatically.

If not attached, find the taxonomy data file in the project.
