interface GlassPaneProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassPane = ({ children, className }: GlassPaneProps) => (
  <div
    className={`glass rounded-2xl border-solid border-2 border-blue-200 ${
      className ? className : ""
    }`}
  >
    {children}
  </div>
);
