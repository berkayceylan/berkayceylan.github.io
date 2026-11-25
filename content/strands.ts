/** The three strands of work. Each has a colour, and one body in the hero orbit. */
export const strands = ["software", "research", "education"] as const;
export type Strand = (typeof strands)[number];
