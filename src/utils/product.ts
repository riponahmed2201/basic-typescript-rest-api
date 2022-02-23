 const productPermission = [
    {
        "subscriptionType": "basic",
        "fields": [
            "name",
            "description"
        ]
    },

    {
        "subscriptionType": "standard",
        "fields": [
            "name",
            "supplierPrice",
            "mrpPrice",
            "discountedPrice"
        ]
    },

    {
        "subscriptionType": "premium",
        "fields": [
            "name",
            "shortDescription",
            "description",
            "supplierPrice",
            "mrpPrice",
            "discountedPrice",
            "stockTotal",
            "categoryName",
            "code"
        ]
    }
]

export default productPermission;
