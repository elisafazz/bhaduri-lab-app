import {
  FolderOpen,
  UserPlus,
  UserMinus,
  Code,
  Database,
  Microscope,
  Globe,
  Camera,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  links: ResourceLink[];
};

export const sections: Section[] = [
  {
    id: "shared-resources",
    title: "Shared Resources",
    description: "Central lab resources shared across the team. Contains: Protocols, BICAN UM1, Bio-rad S3e Sorter, Chemical Safety, Quotes, Fellowship Templates, Travel & Reimbursements, Lab Meeting Slides, Data, Common Databases.",
    icon: FolderOpen,
    iconColor: "text-blue-700",
    iconBg: "bg-blue-50 ring-blue-700/20",
    links: [
      {
        label: "Bhaduri Lab Shared Google Drive",
        description: "Main shared drive for all lab documents, protocols, and resources.",
        url: "https://drive.google.com/drive/u/1/folders/1a_6AwkZNbMYaZzfFsjblWp1ahWnkIqg4",
      },
      {
        label: "Common Databases",
        description: "Shared inventories: primers, plasmids, LN2 stocks, and other common lab databases.",
        url: "https://drive.google.com/drive/u/4/folders/1W01U0Rsjqcum-B6AWYxq-00uVYhWqkWy",
      },
    ],
  },
  {
    id: "onboarding",
    title: "Onboarding",
    description: "Resources for new lab members.",
    icon: UserPlus,
    iconColor: "text-green-700",
    iconBg: "bg-green-50 ring-green-700/20",
    links: [
      {
        label: "Lab Member Info Sheet",
        description: "Fill this out when you join the lab.",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfUhGS6oZjPrrWiKghUe9HOaQcyaPwxuQprMEQI43r_zv807g/viewform?usp=header",
      },
      {
        label: "Mouse Work Training (DLAM ARC Protocol)",
        description: "Required UCLA training for working with lab mice. Complete before any animal work.",
        url: "https://dlam.dgsom.ucla.edu/education-and-training/training-requirements-for-arc-protocol",
      },
      {
        label: "Requirements List",
        description: "Checklist of everything needed to get started in the lab.",
        url: "#placeholder",
      },
    ],
  },
  {
    id: "offboarding",
    title: "Offboarding",
    description: "Resources for members leaving the lab.",
    icon: UserMinus,
    iconColor: "text-orange-700",
    iconBg: "bg-orange-50 ring-orange-700/20",
    links: [
      {
        label: "Offboarding Checklist",
        description: "Steps to complete before leaving the lab.",
        url: "#placeholder",
      },
    ],
  },
  {
    id: "coding",
    title: "Coding",
    description: "Computational resources and tutorials for lab analyses.",
    icon: Code,
    iconColor: "text-violet-700",
    iconBg: "bg-violet-50 ring-violet-700/20",
    links: [
      {
        label: "Hoffman2 - Data Transfer Guide",
        description: "Highly recommended: use Globus to transfer files between your machine, Hoffman, and Box. Use your non-MedNet (ucla.edu) Box account for transfers - MedNet Box cannot be used for file transfer. You can link both Box accounts in Globus and share files with your MedNet Box. To share files outside MedNet, complete the required training first.",
        url: "https://www.hoffman2.idre.ucla.edu/Using-H2/Data-transfer.html",
      },
      {
        label: "Box - Sharing Outside MedNet (Training Required)",
        description: "Guide for sharing Box files outside the MedNet network. Training must be completed before sharing externally.",
        url: "https://it.uclahealth.org/support/guides/guide-for-box",
      },
      {
        label: "Bhaduri Lab scRNA-seq Tutorial",
        description: "Step-by-step guide to single-cell RNA sequencing analysis.",
        url: "#placeholder",
      },
      {
        label: "Elisa Fazzari - CellTagging GitHub",
        description: "CellTagging pipeline and analysis code.",
        url: "https://github.com/Bhaduri-Lab/Fazzari_CellTag_Analysis",
      },
      {
        label: "Patricia Nano - Meta-atlas GitHub",
        description: "Meta-atlas project repository.",
        url: "https://github.com/Bhaduri-Lab/dev-ctx-meta-atlas",
      },
    ],
  },
  {
    id: "file-storage",
    title: "File Storage",
    description: "Where lab data lives. Handle with care.",
    icon: Database,
    iconColor: "text-sky-700",
    iconBg: "bg-sky-50 ring-sky-700/20",
    links: [
      {
        label: "Bhaduri Lab FASTQs",
        description: "ALL sequencing FASTQs should be backed up here.",
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
    icon: Microscope,
    iconColor: "text-red-700",
    iconBg: "bg-red-50 ring-red-700/20",
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
    icon: Globe,
    iconColor: "text-slate-700",
    iconBg: "bg-slate-50 ring-slate-700/20",
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
    icon: Camera,
    iconColor: "text-pink-700",
    iconBg: "bg-pink-50 ring-pink-700/20",
    links: [
      {
        label: "Photo Gallery",
        description: "Lab photos and memories.",
        url: "#placeholder",
      },
    ],
  },
];
