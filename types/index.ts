//الأعدادات اللازمة

export type ProjectType = "تقني" | "زراعي" | "تجاري" | "صناعي";

export interface Project {
  name: string;
  type: ProjectType;
  description: string;
  budget: number;
}

export interface ChatMessage {
  role: "user" | "bot";
  content: string;
}