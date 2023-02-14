interface GlassPaneProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassPane = ({ children, className }: GlassPaneProps) => (
  <div className={`sm:glass ${className ? className : ""}`}>{children}</div>
);
