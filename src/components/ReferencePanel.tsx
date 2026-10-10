import type { ReactNode } from "react";

type ReferencePanelProps = {
  src: string;
  alt: string;
  className?: string;
  children?: ReactNode;
  id?: string;
};

export function ReferencePanel({ src, alt, className, children, id }: ReferencePanelProps) {
  return (
    <section id={id} className={`ref-panel ${className ?? ""}`}>
      <img src={src} alt={alt} className="ref-panel-img" draggable={false} />
      {children ? <div className="ref-panel-overlay">{children}</div> : null}
    </section>
  );
}
