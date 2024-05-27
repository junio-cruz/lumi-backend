export type Customer = {
  customer_id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
};

export const customerResolver = (customer: Customer): Customer => {
  return {
    customer_id: customer.customer_id,
    name: customer.name,
    email: customer.email,
    password: '',
    created_at: customer.created_at,
  };
};
