import sofia58 from "@/assets/testimonials/sofia-58.jpg";
import karin48 from "@/assets/testimonials/karin-48.jpg";
import sigun83 from "@/assets/testimonials/sigun-83.jpg";
import nima43 from "@/assets/testimonials/nima-43.jpg";
import lilian40 from "@/assets/testimonials/lilian-40.jpg";
import sonja45 from "@/assets/testimonials/sonja-45.jpg";
import anna42 from "@/assets/testimonials/anna-42.jpg";
import sofia37 from "@/assets/testimonials/sofia-37.jpg";
import maria51 from "@/assets/testimonials/maria-51.jpg";
import anna52 from "@/assets/testimonials/anna-52.jpg";

export type Testimonial = {
  id: string;
  name: string;
  age: number;
  role: string;
  quote: string;
  image: string;
};

// Riktiga röster från kvinnor i Kvinnlig Lustkraft® (designade kort, från Gaia).
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "sofia-58",
    name: "Sofia",
    age: 58,
    role: "Färgerna i livet kom tillbaka",
    quote:
      "Jag trodde att det bara var så här livet blev efter en viss ålder. Nu känns det som att färgerna i livet har kommit tillbaka.",
    image: sofia58,
  },
  {
    id: "karin-48",
    name: "Karin",
    age: 48,
    role: "Aktieanalytiker & mamma till två tonårsbarn",
    quote:
      "Jag har fått en kraft och ett lugn jag aldrig trodde var möjligt. Nu möter jag livet med tillit, inte med oro.",
    image: karin48,
  },
  {
    id: "sigun-83",
    name: "Sigun",
    age: 83,
    role: "Pensionär, mormor & livsnjutare",
    quote:
      "Jag har aldrig känt min kropp så mycket som nu. Jag njuter av att vara den jag är.",
    image: sigun83,
  },
  {
    id: "nima-43",
    name: "Nima",
    age: 43,
    role: "Mamma & egenföretagare",
    quote:
      "Jag ler mer. Mina ögon glittrar igen. Och jag känner mig hemma i mig själv.",
    image: nima43,
  },
  {
    id: "lilian-40",
    name: "Lilian",
    age: 40,
    role: "Stark mamma, mitt i stora utmaningar",
    quote:
      "Trots yttre utmaningar känner jag mig lugn, trygg och vis. Jag brusar inte upp längre. Jag kan sova, ta hand om mig och faktiskt njuta av livet igen.",
    image: lilian40,
  },
  {
    id: "sonja-45",
    name: "Sonja",
    age: 45,
    role: "Egenföretagare",
    quote: "Det känns som att jag fått tillbaka mig själv.",
    image: sonja45,
  },
  {
    id: "anna-42",
    name: "Anna",
    age: 42,
    role: "Lärare & mamma",
    quote:
      "Efter att ha använt hypnosen varje dag börjar jag känna min kropp på riktigt igen. Inte bara i huvudet längre. Jag känner mig lättare, gladare och mer levande.",
    image: anna42,
  },
  {
    id: "sofia-37",
    name: "Sofia",
    age: 37,
    role: "Projektledare",
    quote:
      "Jag har blivit mycket lugnare hemma. Mjukare mot barnen och mer närvarande i relationen. Lusten är tillbaka — inte bara i kroppen … utan också i livet.",
    image: sofia37,
  },
  {
    id: "maria-51",
    name: "Maria",
    age: 51,
    role: "Ingenjör",
    quote:
      "Det här arbetet har förändrat så mycket för mig och min man. Jag känner mig levande igen. Och min man sa: ”Det är som att jag fått tillbaka min fru.”",
    image: maria51,
  },
  {
    id: "anna-52",
    name: "Anna",
    age: 52,
    role: "Chef & tvåbarnsmamma",
    quote:
      "För första gången på många år vaknar jag och känner att jag faktiskt tycker om mitt liv igen.",
    image: anna52,
  },
];
