import axios, { AxiosResponse } from 'axios'
import { Reply as ReplyType } from '../types/Reply.ts'
import * as ApiResponses from '../types/ReplyApiResponses.ts'

/**
 * Add a reply to a comment.
 * @param commentId The comment ID.
 * @param text The reply text.
 * @returns The reply.
 */
export async function addReply(
  commentId: string,
  text: string
): Promise<ReplyType | null> {
  try {
    const response: AxiosResponse<ApiResponses.AddReplyResponse> =
      await axios.post('/api/addReply', { commentId, text })
    const data: ApiResponses.AddReplyResponse = response.data
    return data.body.reply
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * Add a like to a reply.
 * @param replyId The reply ID.
 */
export async function addReplyLike(replyId: string): Promise<boolean> {
  try {
    await axios.post('/api/addReplyLike', { replyId })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

/**
 * Update a reply.
 * @param replyId The reply ID.
 * @param text The reply text.
 * @returns The reply.
 */
export async function updateReply(
  replyId: string,
  text: string
): Promise<ReplyType | null> {
  try {
    const response: AxiosResponse<ApiResponses.UpdateReplyResponse> =
      await axios.post('/api/updateReply', { replyId, text })
    const data: ApiResponses.UpdateReplyResponse = response.data
    return data.body.reply
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * Delete a reply.
 * @param replyId The reply ID.
 * @returns Whether the reply was deleted.
 */
export async function deleteReply(replyId: string): Promise<boolean> {
  try {
    await axios.post('/api/deleteReply', { replyId })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
