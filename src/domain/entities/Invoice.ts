export type Invoice = {
  invoice_id: string;
  customer_id: string;
  reference_month: string;
  electric_energy: number;
  scee_energy: number;
  compensated_energy: number;
  public_contribution_ilum: number;
  created_at: Date;
  updated_at?: Date;
};

export const invoiceResolver = (invoice: Invoice): Invoice => {
  return {
    invoice_id: invoice.invoice_id,
    customer_id: invoice.customer_id,
    reference_month: invoice.reference_month,
    electric_energy: invoice.electric_energy,
    scee_energy: invoice.scee_energy,
    compensated_energy: invoice.compensated_energy,
    public_contribution_ilum: invoice.public_contribution_ilum,
    created_at: invoice.created_at,
    updated_at: invoice.updated_at,
  };
};
