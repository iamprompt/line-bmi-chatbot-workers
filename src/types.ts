export interface DialogflowWebhookRequestBody {
  responseId: string
  queryResult: QueryResult
  originalDetectIntentRequest: OriginalDetectIntentRequest
  session: string
}

export type OriginalDetectIntentRequest =
  | OriginalDetectIntentRequestDfConsole
  | OriginalDetectIntentRequestLine

export type OriginalDetectIntentRequestDfConsole = {
  source: 'DIALOGFLOW_CONSOLE'
  payload: {}
}

export type OriginalDetectIntentRequestLine = {
  source: 'line'
  payload: {
    data: {
      source: {
        type: string
        userId: string
      }
      timestamp: string
      type: string
      replyToken: string
      message: {
        id: string
        type: string
        text: string
      }
    }
  }
}

export type Parameters = {
  [key: string]: string | number | boolean | undefined
}

export interface QueryResult {
  queryText: string
  action: string
  parameters: Parameters
  allRequiredParamsPresent: boolean
  fulfillmentText: string
  fulfillmentMessages: FulfillmentMessage[]
  outputContexts: OutputContext[]
  intent: Intent
  intentDetectionConfidence: number
  languageCode: string
}

export interface FulfillmentMessage {
  text: Text
}

export interface Text {
  text: string[]
}

export interface Intent {
  name: string
  displayName: string
}

export interface OutputContext {
  name: string
  lifespanCount?: number
  parameters: Parameters
}
