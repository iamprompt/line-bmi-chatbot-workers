type Profile = {
  displayName: string
  userId: string
  language: string
  pictureUrl?: string
  statusMessage?: string
}

export const getProfileByLineUserId = async (
  lineUserId: string,
  lineChannelAccessToken: string,
) => {
  const response = await fetch(
    `https://api.line.me/v2/bot/profile/${lineUserId}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${lineChannelAccessToken}` },
    },
  )

  if (!response.ok) {
    throw new Error('Invalid Line User ID')
  }

  return response.json<Profile>()
}
