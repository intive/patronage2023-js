export type LayoutProps = {
  children: React.ReactNode;
};

export default function UsersLayout({ children }: LayoutProps) {
  return (
    <section>
      <nav>home / users /</nav>
      <div>{children}</div>
    </section>
  );
}
