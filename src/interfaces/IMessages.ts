export interface IMessagesData {
    from: string,
    time: string,
    message: string,
    files: string[],
    images: string[],
}

export interface IMessages {
    date: string,
    data: IMessagesData[],
}
