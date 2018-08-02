import { Offer } from './offer';

export const OFFERS: Offer[] = [
    {
      id: 1,
      code: "1SUMMERSALES 2017",
      name: "Summer Sales 2017",
      description: "Summer Sales for year 2017",
      type: "Accrual",
      startDate:  new Date(),
      endDate: new Date(),
      qualifiers: [
        {
          id: 1,
          type: "Customer",
          valueId: 1,
          name: "Hilman Associates"
        }
      ],
      modifiers: [
        {
          id: 1,
          itemId: 12,
          itemDescription: "Seed Starter AC122",
          limit: 120,
          currency: "USD",
          price: 33.12,
          discountType: "%",
          discountValue: 10
        }
      ]
    },
    {
      id: 2,
      code: "2SUMMERSALES 2017",
      name: "Summer Sales 2017",
      description: "Summer Sales for year 2017",
      type: "Accrual",
      startDate: new Date(),
      endDate: new Date(),
      qualifiers: [
        {
          id: 2,
          type: "Customer Group",
          valueId: 3,
          name: "Utha Farmers Co-op"
        }
      ],
      modifiers: [
        {
          id: 2,
          itemId: 14,
          itemDescription: "Drip Irrigation Emiter 8l/min",
          limit: 50,
          currency: "USD",
          price: 7.56,
          discountType: "NEW",
          discountValue: 5
        }
      ]
    }
];