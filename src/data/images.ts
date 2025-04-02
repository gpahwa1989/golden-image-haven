
import { GoldenImage } from "../types/image";

export const goldenImages: GoldenImage[] = [
  {
    id: "rhel9-python-3.10",
    name: "RHEL 9 Python 3.10",
    description: "Official golden image for Python 3.10 development on RHEL 9",
    baseOS: "Red Hat Enterprise Linux",
    osVersion: "9.2",
    languagePack: "Python",
    languageVersion: "3.10.12",
    size: "456 MB",
    lastUpdated: "2023-12-15",
    eolDate: "2025-06-30",
    maintainer: "Enterprise Platform Team",
    supportChannel: {
      type: "Slack",
      contact: "#golden-image-support"
    },
    tags: ["python", "rhel9", "production", "secure"],
    dockerHubUrl: "registry.enterprise.com/golden-images/rhel9-python:3.10",
    securityScanned: true,
    verified: true,
    usageInstructions: "docker pull registry.enterprise.com/golden-images/rhel9-python:3.10",
    changelog: [
      {
        version: "1.3.0",
        date: "2023-12-15",
        changes: ["Updated Python to 3.10.12", "Added numpy and pandas libraries", "Security patches"]
      },
      {
        version: "1.2.0",
        date: "2023-09-10",
        changes: ["Updated base RHEL to 9.2", "Security patches"]
      }
    ]
  },
  {
    id: "rhel9-golang-1.20",
    name: "RHEL 9 Go 1.20",
    description: "Official golden image for Go 1.20 development on RHEL 9",
    baseOS: "Red Hat Enterprise Linux",
    osVersion: "9.2",
    languagePack: "Go",
    languageVersion: "1.20.6",
    size: "387 MB",
    lastUpdated: "2023-11-28",
    eolDate: "2024-12-31",
    maintainer: "Enterprise Platform Team",
    supportChannel: {
      type: "Slack",
      contact: "#golden-image-support"
    },
    tags: ["golang", "rhel9", "production"],
    dockerHubUrl: "registry.enterprise.com/golden-images/rhel9-golang:1.20",
    securityScanned: true,
    verified: true,
    usageInstructions: "docker pull registry.enterprise.com/golden-images/rhel9-golang:1.20",
    changelog: [
      {
        version: "1.2.1",
        date: "2023-11-28",
        changes: ["Updated Go to 1.20.6", "Security patches"]
      },
      {
        version: "1.2.0",
        date: "2023-09-10",
        changes: ["Updated base RHEL to 9.2", "Security patches"]
      }
    ]
  },
  {
    id: "rhel9-java-17",
    name: "RHEL 9 Java 17",
    description: "Official golden image for Java 17 (LTS) development on RHEL 9",
    baseOS: "Red Hat Enterprise Linux",
    osVersion: "9.2",
    languagePack: "Java",
    languageVersion: "17.0.8",
    size: "523 MB",
    lastUpdated: "2023-12-05",
    eolDate: "2027-09-30",
    maintainer: "Enterprise Platform Team",
    supportChannel: {
      type: "Email",
      contact: "golden-images@enterprise.com"
    },
    tags: ["java", "jdk17", "rhel9", "production", "lts"],
    dockerHubUrl: "registry.enterprise.com/golden-images/rhel9-java:17",
    securityScanned: true,
    verified: true,
    usageInstructions: "docker pull registry.enterprise.com/golden-images/rhel9-java:17",
    changelog: [
      {
        version: "1.3.2",
        date: "2023-12-05",
        changes: ["Updated Java to 17.0.8", "Added Maven 3.9.4", "Security patches"]
      },
      {
        version: "1.2.0",
        date: "2023-09-10",
        changes: ["Updated base RHEL to 9.2", "Security patches"]
      }
    ]
  },
  {
    id: "rhel9-nodejs-18",
    name: "RHEL 9 Node.js 18",
    description: "Official golden image for Node.js 18 (LTS) development on RHEL 9",
    baseOS: "Red Hat Enterprise Linux",
    osVersion: "9.2",
    languagePack: "Node.js",
    languageVersion: "18.17.1",
    size: "412 MB",
    lastUpdated: "2023-11-20",
    eolDate: "2025-04-30",
    maintainer: "Enterprise Platform Team",
    supportChannel: {
      type: "Slack",
      contact: "#golden-image-support"
    },
    tags: ["nodejs", "javascript", "rhel9", "production"],
    dockerHubUrl: "registry.enterprise.com/golden-images/rhel9-nodejs:18",
    securityScanned: true,
    verified: true,
    usageInstructions: "docker pull registry.enterprise.com/golden-images/rhel9-nodejs:18",
    changelog: [
      {
        version: "1.2.3",
        date: "2023-11-20",
        changes: ["Updated Node.js to 18.17.1", "Security patches"]
      },
      {
        version: "1.2.0",
        date: "2023-09-10",
        changes: ["Updated base RHEL to 9.2", "Security patches"]
      }
    ]
  },
  {
    id: "rhel9-dotnet-7",
    name: "RHEL 9 .NET 7",
    description: "Official golden image for .NET 7 development on RHEL 9",
    baseOS: "Red Hat Enterprise Linux",
    osVersion: "9.2",
    languagePack: ".NET",
    languageVersion: "7.0.12",
    size: "498 MB",
    lastUpdated: "2023-10-30",
    eolDate: "2024-05-14",
    maintainer: "Enterprise Platform Team",
    supportChannel: {
      type: "Teams",
      contact: "Golden Images Team"
    },
    tags: ["dotnet", "csharp", "rhel9", "production"],
    dockerHubUrl: "registry.enterprise.com/golden-images/rhel9-dotnet:7",
    securityScanned: true,
    verified: true,
    usageInstructions: "docker pull registry.enterprise.com/golden-images/rhel9-dotnet:7",
    changelog: [
      {
        version: "1.2.2",
        date: "2023-10-30",
        changes: ["Updated .NET to 7.0.12", "Security patches"]
      },
      {
        version: "1.2.0",
        date: "2023-09-10",
        changes: ["Updated base RHEL to 9.2", "Security patches"]
      }
    ]
  },
  {
    id: "rhel9-ruby-3.2",
    name: "RHEL 9 Ruby 3.2",
    description: "Official golden image for Ruby 3.2 development on RHEL 9",
    baseOS: "Red Hat Enterprise Linux",
    osVersion: "9.2",
    languagePack: "Ruby",
    languageVersion: "3.2.2",
    size: "395 MB",
    lastUpdated: "2023-10-18",
    eolDate: "2026-03-31",
    maintainer: "Enterprise Platform Team",
    supportChannel: {
      type: "Slack",
      contact: "#golden-image-support"
    },
    tags: ["ruby", "rails", "rhel9", "production"],
    dockerHubUrl: "registry.enterprise.com/golden-images/rhel9-ruby:3.2",
    securityScanned: true,
    verified: true,
    usageInstructions: "docker pull registry.enterprise.com/golden-images/rhel9-ruby:3.2",
    changelog: [
      {
        version: "1.1.1",
        date: "2023-10-18",
        changes: ["Updated Ruby to 3.2.2", "Added Rails 7.0.6", "Security patches"]
      },
      {
        version: "1.1.0",
        date: "2023-09-10",
        changes: ["Updated base RHEL to 9.2", "Security patches"]
      }
    ]
  }
];
