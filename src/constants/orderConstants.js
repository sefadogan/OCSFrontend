export const ordersReduxStateConstants = {
  ordersTableLoadOptions: {
    pageNumber: 1,
    pageSize: 5,
    isLoading: true,
  },
  ordersTableFilterValues: {
    shipmentTrackingNo: "",
    orderTrackingNo: "",
    createdDate: {
      min: null,
      max: null,
    },
    status: "",
    releasedForDistribution: "",
  },
};

export const orderStatuses = {
  CREATED: 0,
  CANCELLED: 1,
  DELIVERED: 2,
  WAITING: 3,
  NOT_DELIVERED: 4,
};

//i18n...
export const orderStatusOptions = [
  {
    value: orderStatuses.CREATED,
    text: "Oluşturuldu",
  },
  {
    value: orderStatuses.CANCELLED,
    text: "İptal Edildi",
  },
  {
    value: orderStatuses.DELIVERED,
    text: "Teslim Edildi",
  },
  {
    value: orderStatuses.WAITING,
    text: "Bekliyor",
  },
  {
    value: orderStatuses.NOT_DELIVERED,
    text: "Teslim Edilemedi",
  },
];
export const orderReleasedForDistributionOptions = [
  { value: true, text: "Evet" },
  { value: false, text: "Hayır" },
];
