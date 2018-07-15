import { Qualifier } from "./qualifier";
import { Modifier } from "./modifier";

export class Offer {
    id: number;
    code: string;
    name: string;
    description: string;
    type: string;
    startDate: Date;
    endDate: Date;
    qualifiers: Qualifier[];
    modifiers: Modifier[];
}