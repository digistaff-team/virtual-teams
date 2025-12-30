export interface AgentRole {
  title: string;
  description: string;
}

export interface AgentTeam {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  iconName: string; // Mapping string to Lucide icon
  systemInstruction: string; // Specific instruction for the Gemini demo
  composition: AgentRole[];
  workflow: string[];
}

export interface CartItem extends AgentTeam {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
