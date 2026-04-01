export type ResourceLink = {
  label: string;
  description?: string;
  url: string;
  badge?: string;
  note?: string;
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
    description: "Central lab resources shared across the team. The shared Google Drive contains: Protocols, UCLA Core Sequencing Submission, BICAN UM1, Bio-rad S3e Sorter, Chemical Safety, Quotes, Fellowship Templates, Travel & Reimbursements, Lab Meeting Slides, Data, Common Databases.",
    links: [
      {
        label: "Bhaduri Lab Shared Google Drive",
        description: "Main shared drive for all lab documents, protocols, and resources.",
        url: "https://drive.google.com/drive/u/1/folders/1a_6AwkZNbMYaZzfFsjblWp1ahWnkIqg4",
      },
    ],
  },
  {
    id: "protocols",
    title: "Protocols",
    links: [
      {
        label: "UCLA Core Sequencing Submission",
        description: "Forms and instructions for submitting samples to the UCLA sequencing core.",
        url: "https://drive.google.com/drive/u/1/folders/1a_6AwkZNbMYaZzfFsjblWp1ahWnkIqg4",
      },
    ],
  },
  {
    id: "onboarding",
    title: "Onboarding",
    description: "Resources for new lab members.",
    links: [
      {
        label: "Lab Member Info Sheet",
        description: "Fill this out when you join the lab.",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfUhGS6oZjPrrWiKghUe9HOaQcyaPwxuQprMEQI43r_zv807g/viewform?usp=header",
      },
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
        label: "Hoffman2 — Data Transfer Guide",
        description: "Highly recommended: use Globus to transfer files between your machine, Hoffman, and Box. Use your non-MedNet (ucla.edu) Box account for transfers — MedNet Box cannot be used for file transfer. You can link both Box accounts in Globus and share files with your MedNet Box. To share files outside MedNet, complete the required training first.",
        url: "https://www.hoffman2.idre.ucla.edu/Using-H2/Data-transfer.html",
      },
      {
        label: "Box — Sharing Outside MedNet (Training Required)",
        description: "Guide for sharing Box files outside the MedNet network. Training must be completed before sharing externally.",
        url: "https://it.uclahealth.org/support/guides/guide-for-box",
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
        url: "https://uclahs.app.box.com/folder/217378227400",
        badge: "IMPORTANT",
      },
      {
        label: "Bhaduri Lab scRNA-seq",
        description: "Houses processed data including Seurat objects.",
        url: "https://uclahs.app.box.com/folder/219831899856?s=vg95rvi6vewkvpw1ffocoknu2cqgwhtg",
      },
    ],
  },
  {
    id: "team-gbm",
    title: "Team GBM",
    description: "Resources specific to the GBM (glioblastoma) team.",
    links: [
      {
        label: "HIPAA Training",
        description: "Required training for handling patient data and tumor samples.",
        url: "#placeholder",
      },
      {
        label: "Bhaduri Lab Tumor Database",
        description: "Database of lab tumor samples. Access requires HIPAA training completion.",
        url: "https://uclahs.app.box.com/file/1877486142830",
        badge: "HIPAA",
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
