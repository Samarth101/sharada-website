import { CONTACT, SERVICES } from "../../data/siteContent";

export const firmData = {
  name: "Sharada",
  tag: "Prod. & Media Mgmt.",
  email: CONTACT.email,
  office: "Mauli Residency, Sargam Society, Warje, Jakat Naka, Karvenagar, Pune",
  locations: ["Nanded", "Pune", "Hyderabad", "Mumbai"],
  services: SERVICES.map((service) => service.title),
};

export const quickPrompts = [
  "What services do you offer?",
  "Help me with a film launch",
  "I need a website",
  "What is your office location?",
];

export const firmTopics = {
  services: "artist management, film promotion, music promotion, digital marketing, websites, apps, AI automation, content production, and brand building",
  contact: "email, phone, or the Connect button",
  location: "Nanded, Pune, and Hyderabad",
  pricing: "scope, timeline, and deliverables",
} as const;
