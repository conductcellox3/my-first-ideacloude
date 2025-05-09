export type StickyNote = {
    id: number;
    x: number;
    y: number;
    text: string;
    color: string;
};

export type FrameworkType =
  | "none"
  | "kj"
  | "mandara"
  | "mece"
  | "swot"
  | "issueTracking"
  | "fishbone"
  | "sipoc"
  | "kanban"
  | "eisenhower";