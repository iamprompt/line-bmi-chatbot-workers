export const dialogflowHandler: ExportedHandlerFetchHandler<
  Env,
  unknown
> = async (request, env, ctx) => {
  return Response.json({ message: 'Hello, Dialogflow!' })
}
