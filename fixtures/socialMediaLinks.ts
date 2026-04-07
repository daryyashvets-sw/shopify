export interface SocialMediaLink {
  name: string;
  urlPattern: string;
}

export const socialMediaLinks: SocialMediaLink[] = [
  { name: "Facebook", urlPattern: "facebook.com" },
  { name: "Twitter", urlPattern: "twitter.com" },
  { name: "Instagram", urlPattern: "instagram.com" },
  { name: "Pinterest", urlPattern: "pinterest.com" },
  { name: "RSS", urlPattern: "/blogs/news.atom" },
];
