export type product = {
    id: string,
    docID?: string,
    sellerID?: string,
    price: number,
    name: string,
    description: string,
    image_address: string,
    category?: string,
    tag?: string[],
    reviews?: reviews[],
    createdAt?: any
}
export type reviews = {
    user_id: string,
    rating: number,
    comment: string
}
export type User = {
    uid: string;
    username: string;
    isMerchant: boolean;
    pfpUrl: string;
}