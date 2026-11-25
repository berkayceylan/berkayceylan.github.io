export type Publication = {
  id: string;
  kind: "Journal article" | "Book chapter";
  year: number;
  title: string;
  originalTitle?: string;
  authors: string[];
  venue: string;
  detail?: string;
  doi?: string;
  href?: string;
  notes: string[];
  summary?: string;
  /** Plain-text APA reference, for the copyable citation. */
  apa: string;
};

export const publications: Publication[] = [
  {
    id: "ijtes-2024",
    kind: "Journal article",
    year: 2024,
    title:
      "Development of an artificial intelligence-based mobile application platform: Evaluation of prospective science teachers’ project on creating virtual plant collections in terms of plant blindness and knowledge",
    authors: ["Ceylan, B.", "Altıparmak Karakuş, M."],
    venue: "International Journal of Technology in Education and Science (IJTES)",
    detail: "8(4), 668–688",
    doi: "10.46328/ijtes.595",
    href: "https://doi.org/10.46328/ijtes.595",
    notes: [
      "First and corresponding author",
      "Indexed in Scopus, ERIC and EBSCO",
      "Presented in English at ICEMST 2024, the International Conference on Education in Mathematics, Science and Technology",
    ],
    summary:
      "Describes AImPLANT and a five-week outdoor field study with 24 prospective science teachers. The mean knowledge-test score rose from 16.71 to 21.54 (p < .0001), and spontaneous mentions of plants rose from 28.33% to 56.66% (p < .001).",
    apa: "Ceylan, B., & Altıparmak Karakuş, M. (2024). Development of an artificial intelligence-based mobile application platform: Evaluation of prospective science teachers’ project on creating virtual plant collections in terms of plant blindness and knowledge. International Journal of Technology in Education and Science (IJTES), 8(4), 668–688. https://doi.org/10.46328/ijtes.595",
  },
  {
    id: "globeedit-2023",
    kind: "Book chapter",
    year: 2023,
    title: "Artificial intelligence in science education",
    originalTitle: "Fen bilimleri eğitiminde yapay zekâ",
    authors: ["Ceylan, B.", "Altıparmak Karakuş, M."],
    venue: "GlobeEdit",
    notes: [
      "In Turkish",
      "Presented at CEAD 2023, the Contemporary Educational Research Congress; the full text was later published as a book chapter",
    ],
    apa: "Ceylan, B., & Altıparmak Karakuş, M. (2023). Artificial intelligence in science education [Fen bilimleri eğitiminde yapay zekâ]. GlobeEdit.",
  },
];
