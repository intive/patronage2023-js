const size = {
  tablet: '768px',
  desktop: '1024px',
  large: '1200px'
};

export const device = {
  tablet: `@media (min-width: ${size.tablet})`,
  desktop: `@media (min-width: ${size.desktop})`,
  large: `@media (min-width: ${size.large})`,
};