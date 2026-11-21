export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  readTime: string;
  category: 'Foundation' | 'Beginner' | 'Advanced' | 'Directory' | 'Case Studies' | 'Future Horizon';
  content: string; // Markdown / HTML formatted text
  keyTakeaways: string[];
  actionSteps: {
    beginner: string[];
    advanced: string[];
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface CalculatorState {
  monthlyTraffic: number;
  conversionRate: number; // percentage
  avgPrice: number; // dollars
  monthlyCosts: number; // dollars
  automationLevel: number; // percentage
}

export interface ConsultantForm {
  skillLevel: string;
  capital: string;
  hoursPerWeek: string;
  niche: string;
  goal: string;
}
