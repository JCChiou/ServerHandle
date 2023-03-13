import { WebClient } from "@slack/web-api";

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

export const slackNofi = async (ctx, next) => {
  console.log('有進來middleware')
  if (ctx.status == 500) {
    await web.chat.postMessage({
      text:
        `Status code: *${ctx.status}*,\n` +
        "```" +
        `param: ${JSON.stringify(ctx.request.body)} \n` +
        `method: ${JSON.stringify(ctx.method)} \n` +
        `url: ${JSON.stringify(ctx.url)} \n` +
        `header: ${JSON.stringify(ctx.header)} \n` +
        "```",
      channel: process.env.SLACK_CHANNEL,
    });
  }
};
