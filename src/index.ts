import { dialogflowHandler } from './dialogflow'

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url)

    switch (url.pathname) {
      case '/dialogflow':
        return dialogflowHandler(request, env, ctx)
    }

    return Response.json({ message: 'Method not allowed' }, { status: 405 })
  },
} satisfies ExportedHandler<Env>
