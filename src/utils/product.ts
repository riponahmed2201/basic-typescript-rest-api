import _ from "lodash";

export const permissionList = [
  {
    subscriptionType: "basic",
    collectionName: "products",
    fields: {
      name: 1,
      description: 1,
    },
  },

  {
    subscriptionType: "standard",
    collectionName: "products",
    fields: {
      name: 1,
      supplierPrice: 1,
      mrpPrice: 1,
      discountedPrice: 1,
    },
  },

  {
    subscriptionType: "premium",
    collectionName: "products",
    fields: {
      name: 1,
      shortDescription: 1,
      description: 1,
      supplierPrice: 1,
      mrpPrice: 1,
      discountedPrice: 1,
      stockTotal: 1,
      categoryName: 1,
      code: 1,
    },
  },
];

const productPermission = async (
  collectionName: String,
  subscriptionType: string
) => {
  let data = {};
  _.find(permissionList, (info) => {
    if (info.subscriptionType === subscriptionType) {
      data = info.fields;
    }
  });

  return data;
};

export default productPermission;
