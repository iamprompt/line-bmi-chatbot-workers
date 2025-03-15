import { z } from 'zod'

import {
  calculateBMI,
  classifyBMI,
  getBMIClassDescription,
  getBMIResultFlexMessage,
} from './bmi'
import { DialogflowWebhookRequestBody, QueryResult } from './types'

export const dialogflowHandler: ExportedHandlerFetchHandler<
  Env,
  unknown
> = async (request, env, ctx) => {
  if (request.method !== 'POST') {
    return Response.json({ message: 'Method not allowed' }, { status: 405 })
  }

  const headerIntent = request.headers.get('x-dialogflow-intent')
  console.log(`Header Intent: ${headerIntent}`)
  if (!headerIntent) {
    return Response.json(
      { message: 'Missing Intent Attribute (x-dialogflow-intent)' },
      { status: 400 },
    )
  }

  const json = await request.json<DialogflowWebhookRequestBody>()
  const { queryResult } = json
  if (!isIntentMatch(headerIntent, queryResult)) {
    return Response.json({ message: 'Intent does not match' }, { status: 400 })
  }

  return handleBMIDialogflow(request, env, ctx, json)
}

const isIntentMatch = (expectedIntentId: string, queryResult: QueryResult) => {
  const intentId = queryResult.intent.name.split('/').pop()
  return intentId === expectedIntentId
}

enum ReplyType {
  TEXT = 'text',
  FLEX = 'flex',
}

const handleBMIDialogflow = async (
  request: Request,
  env: Env,
  ctx: unknown,
  json: DialogflowWebhookRequestBody,
) => {
  const { queryResult } = json
  const { parameters } = queryResult
  const heightCm = parseFloat(parameters.height?.toString() || '')
  const weightKg = parseFloat(parameters.weight?.toString() || '')

  if (isNaN(heightCm) || isNaN(weightKg)) {
    return Response.json(
      { message: 'Invalid Parameters (weight / height)' },
      { status: 400 },
    )
  }

  const bmiValue = calculateBMI(heightCm, weightKg)
  const bmiClass = classifyBMI(bmiValue)
  const bmiDescription = getBMIClassDescription(bmiClass)

  try {
    const { accessToken, replyType } = z
      .object({
        accessToken: z.string().nullable(),
        replyType: z.nativeEnum(ReplyType).default(ReplyType.TEXT),
      })
      .parse({
        accessToken: request.headers.get('x-line-channel-access-token'),
        replyType: request.headers.get('x-line-reply-type'),
      })

    if (replyType === ReplyType.FLEX) {
      return Response.json(
        {
          fulfillmentMessages: [
            { payload: { line: getBMIResultFlexMessage(bmiValue) } },
          ],
        },
        { status: 200 },
      )
    }

    return Response.json(
      { fulfillmentMessages: [{ text: { text: [bmiDescription] } }] },
      { status: 200 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: 'Invalid Request', details: error.issues },
        { status: 400 },
      )
    }

    return Response.json({ message: 'Invalid Request' }, { status: 400 })
  }
}
