import { PaymentDto } from "src/orders/dto/payment.dto";

export const PaymentDtoStub = (): PaymentDto => {
  return {
    currency: 'EUR',
    amount: 9.99,
  };
};