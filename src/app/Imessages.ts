export interface Imessages {
    data: {
      session: {
        mails: Array<{
          toAddr: string
          text: string
          rawSize: number
          headerSubject: string
          fromAddr: string
          downloadUrl: string
        }>
        addresses: Array<{
          address: string
        }>
      }
    }
  }
  