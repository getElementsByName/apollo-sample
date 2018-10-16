import * as Koa from "koa";
import { renderHTML } from "@apollo-sample/web";
import * as Router from "koa-router"

async function renderWeb(ctx: Koa.Context, next: Function) {
    console.log("koa context url:", ctx.url)
    ctx.body = await renderHTML({requestUrl: ctx.url});
}

const renderRouter = new Router()
renderRouter.get("*", renderWeb)

export { renderRouter }