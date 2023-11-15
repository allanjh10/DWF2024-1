import { Customer } from "../../customer/_models/customer";
import { Item } from "./item";
export class Invoice{
    invoice_id: number = 0;
    customer: Customer = new Customer();
    items: Item[] = [];
    rfc: string = "";
    subtotal: number = 0;
    taxes: number = 0; //impuestos
    total: number = 0;
}


