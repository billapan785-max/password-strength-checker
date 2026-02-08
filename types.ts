
export interface PasswordStrength {
  score: number; // 0 to 4
  label: string;
  color: string;
  feedback: string[];
  crackTime: string;
}

export interface GeneratorConfig {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}
