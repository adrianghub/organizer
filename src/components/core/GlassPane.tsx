interface GlassPaneProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassPane = ({ children, className }: GlassPaneProps) => (
  <div
    className={`sm:glass sm:rounded-2xl sm:border-solid sm:border-2 sm:border-blue-200 ${
      className ? className : ""
    }`}
  >
    {children}
  </div>
);
