import { CustomerType } from './customer-type';

export interface CustomerModel {
    id: string;
    type: CustomerType;
    name: string;
}
