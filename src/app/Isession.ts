export interface Isession {
    data: {
        introduceSession: {
            id: string
            expiresAt: string
            addresses: Array<{
                address: string
            }>
        }
    }
}