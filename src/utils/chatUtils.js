export const getChatId = (user1, user2) => {
  const getId = (user) => {
    if (!user) throw new Error('Usuário não definido')

    const id = user.uid || user.id || user.userId || user._id

    if (!id) {
      console.error('Usuário sem ID:', user)
      throw new Error('Usuário não possui ID válido')
    }

    return id
  }

  const id1 = getId(user1)
  const id2 = getId(user2)

  const type1 = user1.type || 'unknown'
  const type2 = user2.type || 'unknown'

  const formattedId1 = `${type1}_${id1}`
  const formattedId2 = `${type2}_${id2}`

  return [formattedId1, formattedId2].sort().join('_')
}
