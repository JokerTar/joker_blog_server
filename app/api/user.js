const Router = require('koa-router')
const router = new Router({
    prefix: '/user'
})

const {User} = require('@module/user')
const {Auth} = require('@mid/auth')

router.post('/register', async (ctx, next) => {
    const {email, password, nikename} = ctx.request.body

    await User.create({
        email, password, nikename
    })

    ctx.body = {
        code: 200,
        ok: true
    }
})

router.post('/info', new Auth().validateToken(), async (ctx, next) => {
    const {uid} = ctx.auth
    const r = await User.findOne({
        where: {
            id: uid
        },
        attributes: {
            exclude: ['password', 'created_time', 'updated_time', 'deleted_time']
        }
    })

    ctx.body = {
        data: r,
        ok: true,
        code: 200
    }
})

module.exports = router