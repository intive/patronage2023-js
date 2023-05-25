const size = {
  tablet: "768px",
  desktop: "1024px",
  tv: "1440px",
};

export const device = {
  tablet: `@media (min-width: ${size.tablet})`,
  desktop: `@media (min-width: ${size.desktop})`,
  tv: `@media (min-width: ${size.tv})`,
};

// BUDGET'S DETAILS PAGE - TOP

// Budżet o bardzo długiej nazwie
// Długi opis zupełnie bez sensu niewiadomo czemu tak

const budgetDetailsBreakpoints = {
  big: "1400px",
  medium: "1024px" // same as above !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

export const budgetDetailsDevices = {
  big: `@media (min-width: ${budgetDetailsBreakpoints.big})`,
  medium: `@media (min-width: ${budgetDetailsBreakpoints.medium})`,
};
