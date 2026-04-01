export type ResourceLink = {
  label: string;
  description?: string;
  url: string;
  badge?: string;
};

export type Section = {
  id: string;
  title: string;
  description?: string;
  links: ResourceLink[];
};

export const sections: Section[] = [
  {
    id: "shared-resources",
    title: "Shared Resources",
    description: "Central lab resources shared across the team.",
    links: [
      {
        label: "Bhaduri Lab Shared Google Drive",
        description: "Main shared drive for lab documents and resources.",
        url: "#placeholder",
      },
    ],
  },
  {
    id: "protocols",
    title: "Protocols",
    links: [
      {
        label: "Sequencing Submission Forms",
        description: "Forms for submitting samples to the sequencing core.",
        url: "#placeholder",
      },
    ],
  },
  {
    id: "onboarding",
    title: "Onboarding",
    description: "Resources for new lab members.",
    links: [
      {
        label: "Requirements List",
        description: "Checklist of everything needed to get started in the lab.",
        url: "#placeholder",
      },
    ],
  },
  {
    id: "coding",
    title: "Coding",
    description: "Computational resources and tutorials for lab analyses.",
    links: [
      {
        label: "Hoffman Resources",
        description: "Getting a Hoffman2 account and best practices for file transfer.",
        url: "#placeholder",
      },
      {
        label: "Bhaduri Lab scRNA-seq Tutorial",
        description: "Step-by-step guide to single-cell RNA sequencing analysis.",
        url: "#placeholder",
      },
      {
        label: "Elisa Fazzari — CellTagging GitHub",
        description: "CellTagging pipeline and analysis code.",
        url: "#placeholder",
      },
      {
        label: "Patricia Nano — Meta-atlas GitHub",
        description: "Meta-atlas project repository.",
        url: "#placeholder",
      },
    ],
  },
  {
    id: "file-storage",
    title: "File Storage",
    description: "Where lab data lives. Handle with care.",
    links: [
      {
        label: "Bhaduri Lab FASTQs",
        description: "Primary storage for all lab FASTQ files. Do not delete without approval.",
        url: "#placeholder",
        badge: "IMPORTANT",
      },
      {
        label: "Bhaduri Lab scRNA-seq",
        description: "Houses processed data including Seurat objects.",
        url: "#placeholder",
      },
    ],
  },
  {
    id: "links",
    title: "Links",
    links: [
      {
        label: "Lab Website",
        description: "Official Bhaduri Lab website.",
        url: "#placeholder",
      },
    ],
  },
  {
    id: "lab-photos",
    title: "Lab Photos",
    links: [
      {
        label: "Photo Gallery",
        description: "Lab photos and memories.",
        url: "#placeholder",
      },
    ],
  },
];
