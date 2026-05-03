export interface Baby {
  id: string;
  name: string;
  motherId: string; // 👈 obligatorio
  ageValue: string;
  ageUnit: "dia(s)" | "semana(s)" | "mes(es)" | "año(s)";
  weightValue: string;
  weightUnit: "kg" | "lb";
}