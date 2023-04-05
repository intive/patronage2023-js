const size = {
  tablet: "768px",
  desktop: "1025px",
  tv: "1441px",
};

export const device = {
  tablet: `@media (min-width: ${size.tablet})`,
  desktop: `@media (min-width: ${size.desktop})`,
  tv: `@media (min-width: ${size.tv})`,
};
