
export interface GoldenImage {
  id: string;
  name: string;
  description: string;
  baseOS: string;
  osVersion: string;
  languagePack: string;
  languageVersion: string;
  size: string;
  lastUpdated: string;
  eolDate: string;
  maintainer: string;
  supportChannel: {
    type: string;
    contact: string;
  };
  tags: string[];
  dockerHubUrl: string;
  securityScanned: boolean;
  verified: boolean;
  usageInstructions: string;
  changelog: {
    version: string;
    date: string;
    changes: string[];
  }[];
}

export interface ExpandableImageState {
  [key: string]: boolean;
}
