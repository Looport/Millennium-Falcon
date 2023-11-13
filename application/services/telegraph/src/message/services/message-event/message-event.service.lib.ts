export const createMessageCreatedSubject = (roomId: number) =>
  `room.[${roomId}].message`
