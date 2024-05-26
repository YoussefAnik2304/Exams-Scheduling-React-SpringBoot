export type Subscription = {
    subscriptionId: number,
    subscriptionStatus: boolean,
    subscriptionDate: string,
    unsubscriptionDate: string,
    eventId: number,
    userId: string,
    subscriptionEvent: SubscriptionEvent,
    subscriptionUser: SubscriptionUser,
    subscriptionPayment: SubscriptionPayment,

}

export type SubscriptionUser = {
    email: string,
    username: string,
    firstName: string,
    lastName: string
}

export type SubscriptionEvent = {
    eventId: number,
    eventName: string,
    startDate: string,
    endDate: string,
    eventLocation: string,
    eventDescription: string,
    seatsCapacity: number,
    paying: boolean,
    subscriptionPrice: number,
    thumbnail: string,
    published: boolean,
    subscriptionsCount?: number | null,
}

export type SubscriptionPayment = {
    paymentId: number,
    paymentAmount: number,
    paymentStatus: string,
    paymentDate: string
}

export type CreateSubscription = {
    cardHolder: string,
    cardNumber: string,
    cvc: string,
    expirationDate: string
}
